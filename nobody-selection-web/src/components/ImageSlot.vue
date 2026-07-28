<template>
  <div class="image-slot" :class="[shape, size]">
    <img
      v-if="loaded"
      :src="src"
      :alt="alt"
      class="slot-img"
      @error="onError"
    />
    <div v-else class="slot-placeholder">
      <span class="placeholder-icon">{{ placeholderIcon }}</span>
      <span v-if="placeholderText" class="placeholder-text">{{ placeholderText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    shape?: 'circle' | 'rounded' | 'square'
    size?: 'sm' | 'md' | 'lg' | 'xl'
    placeholderIcon?: string
    placeholderText?: string
  }>(),
  {
    alt: '',
    shape: 'rounded',
    size: 'md',
    placeholderIcon: '📷',
    placeholderText: '',
  },
)

const loaded = ref(false)

function tryLoad(url: string) {
  loaded.value = false
  if (!url) return
  const img = new Image()
  img.onload = () => { loaded.value = true }
  img.onerror = () => { loaded.value = false }
  img.src = url
}

function onError() {
  loaded.value = false
}

watch(() => props.src, (url) => tryLoad(url), { immediate: true })
</script>

<style scoped>
.image-slot {
  overflow: hidden;
  background: linear-gradient(135deg, #e8f0f8 0%, #d0dff0 100%);
  border: 1px solid rgba(30, 74, 138, 0.12);
  flex-shrink: 0;
}

.image-slot.circle { border-radius: 50%; }
.image-slot.rounded { border-radius: 12px; }
.image-slot.square { border-radius: 4px; }

.image-slot.sm { width: 64px; height: 64px; }
.image-slot.md { width: 120px; height: 120px; }
.image-slot.lg { width: 200px; height: 260px; }
.image-slot.xl { width: 280px; height: 360px; }

.image-slot.circle.md,
.image-slot.circle.sm { aspect-ratio: 1; }

.slot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slot-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #5a7a9a;
}

.placeholder-icon { font-size: 28px; opacity: 0.6; }
.placeholder-text { font-size: 11px; letter-spacing: 0.5px; opacity: 0.7; }
</style>

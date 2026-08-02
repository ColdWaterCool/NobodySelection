<template>
  <div class="as-glass admin-stub">
    <span class="icon">{{ icon }}</span>
    <h3>{{ title }}</h3>
    <p class="en" v-if="titleEn">{{ titleEn }}</p>
    <p class="msg">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    titleEn?: string
    message?: string
    icon?: string
  }>(),
  {
    titleEn: '',
    message: '该功能即将上线，敬请期待。',
    icon: '🚧',
  },
)
</script>

<style scoped>
.admin-stub {
  padding: 48px 32px;
  text-align: center;
  border-radius: var(--as-radius);
}

.icon { font-size: 40px; display: block; margin-bottom: 16px; }

.admin-stub h3 {
  font-size: 18px;
  color: var(--as-navy);
  margin-bottom: 4px;
}

.en { font-size: 12px; color: var(--as-muted-light); margin-bottom: 12px; }
.msg { font-size: 14px; color: var(--as-muted); line-height: 1.7; }
</style>

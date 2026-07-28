<template>
  <header class="app-header">
    <div class="as-wrap header-inner">
      <router-link to="/" class="brand">
        <ImageSlot
          src="/images/logo.png"
          alt="NobodySelection"
          shape="rounded"
          size="sm"
          placeholder-icon="◇"
          placeholder-text="Logo"
        />
        <span class="brand-title">
          <span class="zh">{{ titleZh || 'NobodySelection' }}</span>
          <span class="en">{{ titleEn || 'Open Credential Framework' }}</span>
        </span>
      </router-link>
      <nav class="nav">
        <router-link v-if="backTo" :to="backTo" class="nav-link">{{ backLabel }}</router-link>
        <slot name="nav" />
        <router-link v-if="showAuth" to="/auth" class="nav-cta">登录 Sign In</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import ImageSlot from './ImageSlot.vue'

withDefaults(
  defineProps<{
    titleZh?: string
    titleEn?: string
    showTitle?: boolean
    backTo?: string
    backLabel?: string
    showAuth?: boolean
  }>(),
  {
    titleZh: 'NobodySelection',
    titleEn: 'Open Credential Framework',
    showTitle: true,
    backLabel: '← 首页 Home',
    showAuth: true,
  },
)
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 12px 0;
  background: rgba(244, 247, 251, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--as-border);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand :deep(.image-slot.sm) {
  width: 36px;
  height: 36px;
}

.brand-title {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.brand-title .zh {
  font-size: 14px;
  font-weight: 600;
  color: var(--as-navy);
}

.brand-title .en {
  font-size: 10px;
  color: var(--as-muted-light);
  letter-spacing: 1px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  font-size: 13px;
  color: var(--as-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover { color: var(--as-navy); }

.nav-cta {
  font-size: 12px;
  color: var(--as-navy);
  border: 1px solid var(--as-border);
  padding: 7px 16px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s;
}

.nav-cta:hover {
  background: var(--as-navy);
  color: var(--as-white);
}
</style>

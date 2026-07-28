<template>
  <div class="portal as-page">
    <aside class="sidebar">
      <router-link to="/" class="sidebar-brand">
        <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
      </router-link>
      <div class="user-block">
        <span class="user-avatar">{{ avatar }}</span>
        <span class="user-name">{{ userName }}</span>
        <span class="user-role">{{ roleLabel }}</span>
      </div>
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          active-class="active"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
          <span class="nav-en">{{ item.labelEn }}</span>
        </router-link>
      </nav>
      <div class="sidebar-foot">
        <router-link to="/" class="nav-item muted">🏠 首页 Home</router-link>
        <button class="nav-item logout" @click="logout">退出 Sign Out</button>
      </div>
    </aside>
    <main class="portal-main">
      <header class="portal-top">
        <h1>{{ pageTitle }}</h1>
        <span v-if="pageTitleEn" class="title-en">{{ pageTitleEn }}</span>
      </header>
      <div class="portal-body">
        <div class="portal-inner">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo, clearAuth } from '@/utils/auth'

export interface NavItem {
  to: string
  label: string
  labelEn: string
  icon: string
}

const props = defineProps<{
  pageTitle: string
  pageTitleEn?: string
  roleLabel: string
  roleLabelEn?: string
  avatar: string
  navItems: NavItem[]
}>()

const router = useRouter()
const userName = computed(() => getUserInfo()?.nickname || '用户')

function logout() {
  clearAuth()
  router.push('/auth')
}
</script>

<style scoped>
.portal { display: flex; min-height: 100vh; }

.sidebar {
  width: 240px;
  background: linear-gradient(180deg, #316899 0%, var(--as-sidebar-bg) 100%);
  color: var(--as-sidebar-text);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 50;
  box-shadow: 2px 0 16px rgba(12, 26, 46, 0.08);
}

.sidebar-brand {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid var(--as-sidebar-border);
  display: block;
}

.sidebar-logo { height: 36px; }

.user-block {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid var(--as-sidebar-border);
}

.user-avatar { font-size: 40px; display: block; margin-bottom: 8px; }
.user-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}
.user-role {
  display: block;
  font-size: 11px;
  color: var(--as-sidebar-text-muted);
  margin-top: 4px;
  letter-spacing: 0.5px;
}

.sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }

.nav-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  padding: 11px 20px;
  color: var(--as-sidebar-text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background: var(--as-sidebar-hover);
  color: #fff;
}

.nav-item.active {
  background: var(--as-sidebar-active);
  color: #fff;
}

.nav-icon { font-size: 16px; width: 22px; }
.nav-label { color: inherit; }
.nav-en {
  font-size: 10px;
  color: var(--as-sidebar-text-sub);
  width: 100%;
  padding-left: 32px;
}
.nav-item:hover .nav-en,
.nav-item.active .nav-en {
  color: var(--as-sidebar-text-muted);
}

.sidebar-foot {
  padding: 12px 0;
  border-top: 1px solid var(--as-sidebar-border);
}

.muted {
  color: var(--as-sidebar-text-muted) !important;
}
.logout { color: #ffb4b4 !important; }
.logout:hover { background: rgba(255, 120, 120, 0.15) !important; }

.portal-main {
  flex: 1;
  margin-left: 240px;
  min-height: 100vh;
}

.portal-top {
  background: var(--as-glass);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--as-border);
  padding: 20px 32px;
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.portal-top h1 {
  font-size: 22px;
  font-weight: 600;
  color: var(--as-navy);
}

.title-en {
  font-size: 13px;
  color: var(--as-muted-light);
}

.portal-body {
  padding: 28px 32px;
  display: flex;
  justify-content: center;
}
.portal-inner {
  width: 100%;
  max-width: 900px;
}

@media (max-width: 768px) {
  .sidebar { display: none; }
  .portal-main { margin-left: 0; }
}
</style>

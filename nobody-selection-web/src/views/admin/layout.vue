<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <router-link to="/" class="sidebar-header">
        <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
        <div class="logo-sub">ADMIN PANEL</div>
      </router-link>
      <div class="admin-info">
        <div class="admin-avatar">&#x1F451;</div>
        <div class="admin-name">管理员</div>
        <div class="admin-role">超级管理员</div>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item" exact-active-class="active">
          <span class="nav-icon">&#x1F4CA;</span>
          <span>数据看板</span>
        </router-link>
        <router-link to="/admin/users" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F465;</span>
          <span>用户管理</span>
        </router-link>
        <router-link to="/admin/teachers" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F9D1;&#x200D;&#x1F3EB;</span>
          <span>教师审核</span>
        </router-link>
        <router-link to="/admin/orders" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F4E6;</span>
          <span>订单管理</span>
        </router-link>
        <router-link to="/admin/finance" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F4B0;</span>
          <span>财务报表</span>
        </router-link>
        <router-link to="/admin/activities" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F3AD;</span>
          <span>活动审批</span>
        </router-link>
        <router-link to="/admin/partnerships" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F91D;</span>
          <span>合作申请</span>
        </router-link>
        <router-link to="/admin/cms" class="nav-item" active-class="active">
          <span class="nav-icon">&#x1F4F0;</span>
          <span>内容管理</span>
        </router-link>
        <router-link to="/admin/settings" class="nav-item" active-class="active">
          <span class="nav-icon">&#x2699;&#xFE0F;</span>
          <span>系统设置</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <router-link to="/" class="nav-item back-home">
          <span class="nav-icon">&#x1F3E0;</span>
          <span>返回首页</span>
        </router-link>
        <button class="nav-item logout-btn" @click="handleLogout">
          <span class="nav-icon">&#x1F6AA;</span>
          <span>退出登录</span>
        </button>
      </div>
    </aside>
    <main class="admin-main">
      <header class="admin-header">
        <div class="header-left">
          <h1 class="page-title">{{ currentTitle }}</h1>
        </div>
        <div class="header-right">
          <div class="notification-bell">
            <span class="bell-icon">&#x1F514;</span>
            <span class="badge">3</span>
          </div>
          <div class="admin-profile">
            <span class="profile-avatar">&#x1F451;</span>
            <span class="profile-name">管理员</span>
          </div>
        </div>
      </header>
      <div class="admin-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { clearAuth } from '@/utils/auth'

const router = useRouter()
const route = useRoute()

const currentTitle = computed(() => {
  for (let i = route.matched.length - 1; i >= 0; i--) {
    const title = route.matched[i].meta?.title
    if (title) return String(title)
  }
  return '后台管理'
})

function handleLogout() {
  clearAuth()
  router.push('/auth')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--as-ice);
  font-family: var(--as-font);
}

.admin-sidebar {
  width: 240px;
  background: linear-gradient(180deg, #316899 0%, var(--as-sidebar-bg) 100%);
  color: var(--as-sidebar-text);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 100;
  box-shadow: 2px 0 16px rgba(12, 26, 46, 0.08);
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid var(--as-sidebar-border);
  display: block;
  text-decoration: none;
}

.sidebar-logo { height: 36px; }

.logo-sub {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--as-sidebar-text-muted);
  margin-top: 8px;
}

.admin-info {
  padding: 24px;
  text-align: center;
  border-bottom: 1px solid var(--as-sidebar-border);
}

.admin-avatar {
  font-size: 48px;
  margin-bottom: 8px;
}

.admin-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.admin-role {
  font-size: 12px;
  color: var(--as-sidebar-text-muted);
  margin-top: 4px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: var(--as-sidebar-text);
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
}

.nav-item:hover {
  background: var(--as-sidebar-hover);
  color: #fff;
}

.nav-item.active {
  background: var(--as-sidebar-active);
  color: #fff;
}

.nav-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}

.sidebar-footer {
  padding: 16px 0;
  border-top: 1px solid var(--as-sidebar-border);
}

.back-home {
  color: var(--as-sidebar-text-muted);
}

.logout-btn {
  color: #ffb4b4;
}

.logout-btn:hover {
  background: rgba(255, 120, 120, 0.15);
}

.admin-main {
  flex: 1;
  margin-left: 240px;
}

.admin-header {
  background: var(--as-glass);
  backdrop-filter: blur(12px);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--as-border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.page-title {
  font-size: 20px;
  color: var(--as-navy);
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-bell {
  position: relative;
  cursor: pointer;
  padding: 8px;
}

.bell-icon {
  font-size: 20px;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff4d4f;
  color: #fff;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid var(--as-border);
}

.profile-avatar { font-size: 24px; }

.profile-name {
  font-size: 14px;
  color: var(--as-navy);
  font-weight: 500;
}

.admin-content {
  padding: 32px;
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
}
.admin-content > :deep(*) {
  width: 100%;
  max-width: 1100px;
}

@media (max-width: 768px) {
  .admin-sidebar {
    display: none;
  }
  .admin-main {
    margin-left: 0;
  }
}
</style>
<template>
  <div class="as-page error-page">
    <AppHeader back-to="/" :show-auth="false" />
    <div class="error-wrap">
      <div class="error-card as-glass">
        <span class="code">404</span>
        <h1>页面未找到</h1>
        <p>Page Not Found — The page you're looking for doesn't exist.</p>
        <router-link to="/" class="as-btn-primary">返回首页 Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.error-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.error-card {
  text-align: center;
  padding: 56px 48px;
  border-radius: var(--as-radius-lg);
  max-width: 420px;
}

.code {
  font-size: 64px;
  font-weight: 700;
  color: var(--as-blue-soft);
  line-height: 1;
  display: block;
  margin-bottom: 16px;
}

.error-card h1 {
  font-size: 22px;
  color: var(--as-navy);
  margin-bottom: 8px;
}

.error-card p {
  font-size: 14px;
  color: var(--as-muted);
  margin-bottom: 28px;
}
</style>

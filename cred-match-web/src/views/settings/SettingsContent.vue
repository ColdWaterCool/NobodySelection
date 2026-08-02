<template>
  <div class="settings-content">
    <div class="user-card as-glass">
      <span class="avatar">{{ avatarEmoji }}</span>
      <div>
        <h3>{{ userInfo?.nickname || '未登录' }}</h3>
        <p>{{ userInfo?.phone || '' }}</p>
        <span class="role-badge">{{ roleLabel }}</span>
        <p v-if="userInfo?.learnerType === 'minor'" class="role-hint">
          青少学员 · 已绑定家长 {{ userInfo?.parentName }}
        </p>
        <p v-if="userInfo?.learnerType === 'adult'" class="role-hint">
          成年学员 · 自主购课
          <template v-if="userInfo?.alsoParent"> · 已开启家长视图</template>
        </p>
        <p v-if="userInfo?.boundChildren?.length" class="role-hint">
          绑定学员：{{ userInfo.boundChildren.map((c: { name: string }) => c.name).join('、') }}
        </p>
        <div v-if="userInfo?.alsoParent" class="portal-links">
          <router-link to="/student">学生中心</router-link>
          <router-link to="/parent">家长中心</router-link>
        </div>
      </div>
    </div>

    <div class="section as-glass">
      <h2>账号信息 Account</h2>
      <div class="setting-item">
        <span class="label">用户ID</span>
        <span class="value">{{ userInfo?.id || '-' }}</span>
      </div>
      <div class="setting-item">
        <span class="label">手机号</span>
        <span class="value">{{ userInfo?.phone || '-' }}</span>
      </div>
      <div class="setting-item">
        <span class="label">角色</span>
        <span class="value">{{ roleLabel }}</span>
      </div>
      <div v-if="userInfo?.learnerType" class="setting-item">
        <span class="label">学员类型</span>
        <span class="value">{{ userInfo.learnerType === 'minor' ? '青少学员' : '成年学员' }}</span>
      </div>
    </div>

    <div class="section as-glass">
      <h2>操作 Actions</h2>
      <button class="logout-btn" :disabled="loggingOut" @click="$emit('logout')">
        {{ loggingOut ? '退出中...' : '退出登录 Sign Out' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  userInfo: {
    id?: number
    phone?: string
    nickname?: string
    role?: string
    learnerType?: string
    parentName?: string
    alsoParent?: boolean
    boundChildren?: { name: string }[]
  } | null
  roleLabel: string
  loggingOut: boolean
}>()

defineEmits<{ logout: [] }>()

const avatarEmoji = computed(() => {
  const map: Record<string, string> = {
    student: '🎓',
    parent: '👨‍👩‍👧',
    teacher: '👨‍🏫',
    admin: '⚙️',
  }
  return map[props.userInfo?.role || ''] || '👤'
})
</script>

<style scoped>
.settings-content {
  width: 100%;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  margin-bottom: 16px;
}

.avatar { font-size: 48px; }

.user-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--as-navy);
}

.user-card p {
  font-size: 13px;
  color: var(--as-muted);
  margin: 4px 0 8px;
}

.role-badge {
  display: inline-block;
  padding: 3px 10px;
  background: rgba(61, 106, 154, 0.15);
  color: var(--as-blue-soft);
  border-radius: 100px;
  font-size: 11px;
}

.role-hint {
  font-size: 12px !important;
  color: var(--as-muted-light) !important;
  margin-top: 6px !important;
}

.portal-links {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.portal-links a {
  font-size: 12px;
  font-weight: 600;
  color: var(--as-blue-soft);
  text-decoration: none;
}

.section {
  padding: 24px;
  margin-bottom: 16px;
}

.section h2 {
  font-size: 15px;
  font-weight: 600;
  color: var(--as-navy);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--as-border);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(12, 26, 46, 0.04);
}

.setting-item:last-child { border-bottom: none; }
.label { font-size: 13px; color: var(--as-muted); }
.value { font-size: 13px; color: var(--as-navy); }

.logout-btn {
  width: 100%;
  padding: 12px;
  background: var(--as-navy);
  color: var(--as-white);
  border: none;
  border-radius: 100px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-btn:hover:not(:disabled) { background: var(--as-blue); }
.logout-btn:disabled { opacity: 0.6; cursor: not-allowed; }
</style>

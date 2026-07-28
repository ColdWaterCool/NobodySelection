<template>
  <PortalLayout
    v-if="portalRole"
    page-title="个人设置"
    page-title-en="Settings"
    :role-label="roleMeta.label"
    :avatar="roleMeta.avatar"
    :nav-items="navItems"
  >
    <SettingsContent :user-info="userInfo" :role-label="roleLabel" :logging-out="loggingOut" @logout="handleLogout" />
  </PortalLayout>

  <div v-else class="as-page">
    <AppHeader back-to="/" :show-auth="false" />
    <div class="as-wrap" style="padding:32px 28px">
      <SettingsContent :user-info="userInfo" :role-label="roleLabel" :logging-out="loggingOut" @logout="handleLogout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import AppHeader from '@/components/AppHeader.vue'
import PortalLayout from '@/components/PortalLayout.vue'
import SettingsContent from './SettingsContent.vue'
import { getPortalNav, getPortalRoleMeta, type PortalRole } from '@/data/portal-nav'
import { getUserInfo, clearAuth } from '@/utils/auth'

const router = useRouter()
const loggingOut = ref(false)
const userInfo = ref<ReturnType<typeof getUserInfo>>(null)

const roleLabels: Record<string, string> = {
  student: '学生',
  parent: '家长',
  teacher: '教师',
  admin: '管理员',
}

const portalRole = computed(() => {
  const role = userInfo.value?.role
  if (role === 'student' || role === 'parent' || role === 'teacher') return role as PortalRole
  return null
})

const navItems = computed(() => {
  if (!portalRole.value) return []
  return getPortalNav(portalRole.value, userInfo.value?.learnerType)
})
const roleMeta = computed(() =>
  portalRole.value ? getPortalRoleMeta(portalRole.value) : { label: '', avatar: '👤' },
)
const roleLabel = computed(() => roleLabels[userInfo.value?.role || ''] || '未知')

onMounted(() => {
  userInfo.value = getUserInfo()
})

async function handleLogout() {
  if (loggingOut.value) return
  loggingOut.value = true
  try {
    clearAuth()
    showToast('已退出登录')
    await router.push('/auth')
  } catch (error) {
    console.error('退出登录失败:', error)
    showToast('退出失败')
  } finally {
    loggingOut.value = false
  }
}
</script>

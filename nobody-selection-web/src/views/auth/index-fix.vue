<template>
  <div class="as-page auth-page">
    <AppHeader :show-auth="false" back-to="/" />

    <div class="auth-wrap">
      <div class="auth-card as-glass">
        <div class="auth-head">
          <img src="/images/logo.png" alt="NobodySelection" class="auth-logo" />
          <h2>登录 / 注册</h2>
          <p class="auth-sub">Sign In</p>
        </div>

        <p class="dev-hint">选择角色进入对应工作台</p>
        <p v-if="lastLoginMode" class="login-mode-hint">{{ lastLoginMode }}</p>
        <div class="dev-buttons">
          <button
            v-for="item in roleButtons"
            :key="item.role"
            class="dev-btn as-glass"
            :disabled="devLoginLoading"
            @click="quickLogin(item.role)"
          >
            <span class="dev-icon">{{ item.icon }}</span>
            <span class="dev-label">{{ devLoginLoading ? '登录中...' : item.label }}</span>
            <span class="dev-en">{{ item.labelEn }}</span>
          </button>
        </div>
        <p class="role-note">
          青少学员由家长购课 · 成年学员登录时可选择是否同时作为家长
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import AppHeader from '@/components/AppHeader.vue'
import { devLogin } from '@/api/auth'
import { saveAuthInfo } from '@/utils/auth'
import { DEMO_USERS, ROLE_HOME, loginAsDemo, enableAlsoParent } from '@/utils/demo-auth'

const router = useRouter()
const devLoginLoading = ref(false)
const lastLoginMode = ref('')

const phoneMap: Record<string, string> = {
  student: '13800000001',
  student_adult: '13800000011',
  parent: '13800000002',
  teacher: '13800000003',
  admin: '13800000004',
}

const roleButtons = [
  { role: 'student', label: '青少学员', labelEn: 'Minor Student', icon: '🧒' },
  { role: 'student_adult', label: '成年学员', labelEn: 'Adult Student', icon: '🎓' },
  { role: 'parent', label: '家长端', labelEn: 'Parent', icon: '👨‍👩‍👧' },
  { role: 'teacher', label: '教师端', labelEn: 'Teacher', icon: '👨‍🏫' },
  { role: 'admin', label: '管理员', labelEn: 'Admin', icon: '⚙️' },
]

async function tryRealLogin(roleKey: string): Promise<boolean> {
  // 联调：尝试真实 API；失败返回 false，由 quickLogin 走 Demo，演示流程不受影响
  try {
    const phone = phoneMap[roleKey]
    const storageRole = roleKey === 'student_adult' ? 'student' : roleKey
    const res = (await devLogin(phone, storageRole)) as {
      id: number
      role: string
      nickname: string
      tokens: { accessToken: string; refreshToken: string }
      user: { avatar?: string; status?: string }
    }
    saveAuthInfo({
      token: res.tokens.accessToken,
      refreshToken: res.tokens.refreshToken,
      role: storageRole,
      userInfo: {
        ...DEMO_USERS[roleKey],
        id: res.id,
        phone,
        nickname: DEMO_USERS[roleKey]?.nickname || res.nickname,
        avatar: res.user?.avatar || DEMO_USERS[roleKey]?.avatar || '',
        role: storageRole,
        status: res.user?.status || 'active',
        authSource: 'api',
      },
    })
    return true
  } catch {
    return false
  }
}

async function askAlsoParent() {
  try {
    await showConfirmDialog({
      title: '您是否也是学生家长？',
      message: '若您有孩子在本平台学习，可开启家长视图，管理孩子课时与学情。',
      confirmButtonText: '是的，进入家长中心',
      cancelButtonText: '仅作为学员',
      className: 'as-parent-dialog',
    })
    enableAlsoParent()
    showToast('已开启家长视图')
    await router.push('/parent')
  } catch {
    showToast('欢迎，李成人同学')
  }
}

async function quickLogin(roleKey: string) {
  if (devLoginLoading.value) return
  devLoginLoading.value = true
  lastLoginMode.value = ''

  try {
    const usedApi = await tryRealLogin(roleKey)
    let nickname: string

    if (usedApi) {
      // 后端在线：JWT 登录成功；页面展示名仍用 DEMO_USERS，避免库内乱码昵称
      lastLoginMode.value = '已连接后端数据库（真实登录）'
      nickname = DEMO_USERS[roleKey]?.nickname || '用户'
      showToast('欢迎，' + nickname + ' · 已连接数据库')
    } else {
      // 后端离线或超时：完整 Demo 路径，与联调前行为一致
      const user = loginAsDemo(roleKey)
      lastLoginMode.value = '演示模式（后端未连接，使用本地 Demo 数据）'
      nickname = user.nickname
      showToast('欢迎，' + nickname + ' · 演示模式')
    }

    const target = ROLE_HOME[roleKey] || '/'
    await router.push(target)

    if (roleKey === 'student_adult') {
      await askAlsoParent()
    }
  } catch (error: unknown) {
    console.error('登录失败:', error)
    showToast('登录失败，请重试')
  } finally {
    devLoginLoading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.auth-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.auth-card {
  width: 100%;
  max-width: 520px;
  padding: 36px 32px;
}

.auth-head {
  text-align: center;
  margin-bottom: 28px;
}

.auth-logo {
  height: 64px;
  margin-bottom: 16px;
}

.auth-head h2 {
  font-size: 22px;
  color: var(--as-navy);
  margin-bottom: 4px;
}

.auth-sub {
  font-size: 13px;
  color: var(--as-muted);
}

.demo-badge {
  display: inline-block;
  margin-top: 10px;
  padding: 4px 12px;
  background: rgba(61, 106, 154, 0.15);
  color: var(--as-blue-soft);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
}

.dev-hint {
  text-align: center;
  font-size: 13px;
  color: var(--as-muted);
  margin-bottom: 8px;
}

.login-mode-hint {
  text-align: center;
  font-size: 11px;
  color: var(--as-blue-soft);
  margin-bottom: 12px;
  line-height: 1.4;
}

.dev-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.dev-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  border: 1px solid var(--as-border);
  border-radius: var(--as-radius);
  cursor: pointer;
  transition: transform 0.15s;
}

.dev-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.dev-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dev-icon { font-size: 28px; margin-bottom: 6px; }
.dev-label { font-size: 14px; font-weight: 600; color: var(--as-navy); }
.dev-en { font-size: 10px; color: var(--as-muted-light); margin-top: 2px; }

.role-note {
  text-align: center;
  font-size: 12px;
  color: var(--as-muted);
  margin-top: 16px;
  line-height: 1.5;
}

.demo-note {
  text-align: center;
  font-size: 11px;
  color: var(--as-muted-light);
  margin-top: 10px;
}

@media (max-width: 480px) {
  .dev-buttons { grid-template-columns: 1fr; }
}
</style>

<style>
/* Vant 弹窗居中优化 */
.as-parent-dialog.van-dialog {
  width: 90%;
  max-width: 400px;
}
</style>

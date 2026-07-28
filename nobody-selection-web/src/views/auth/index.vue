<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">NobodySelection</div>
        <h2>登录 / 注册</h2>
      </div>
      
      <!-- 正常登录表单 -->
      <div class="auth-form">
        <div class="form-group">
          <label>手机号</label>
          <input v-model="phone" type="tel" placeholder="请输入手机号" maxlength="11" />
        </div>
        <div class="form-group">
          <label>验证码</label>
          <div class="code-input">
            <input v-model="code" type="text" placeholder="请输入验证码" maxlength="6" />
            <button @click="sendCode" :disabled="countdown > 0" class="btn-code">
              {{ countdown > 0 ? countdown + 's' : '发送验证码' }}
            </button>
          </div>
        </div>
        <button @click="handleLogin" class="btn-submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录/注册' }}
        </button>
      </div>
      
      <!-- 开发者快速登录入口 -->
      <div class="dev-login-section">
        <div class="divider">
          <span>开发者快速入口</span>
        </div>
        <p class="dev-hint">选择角色直接体验系统（无需验证码）</p>
        <div class="dev-buttons">
          </button>
          <button @click="quickLogin('parent')" class="dev-btn parent">
            <span class="dev-icon">&#x1F468;&#x200D;&#x1F469;&#x200D;&#x1F467;</span>
            <span>家长端</span>
          </button>
          <button @click="quickLogin('teacher')" class="dev-btn teacher">
            <span class="dev-icon">&#x1F468;&#x200D;&#x1F3EB;</span>
            <span>教师端</span>
          </button>
          <button @click="quickLogin('admin')" class="dev-btn admin">
            <span class="dev-icon">&#x2699;&#xFE0F;</span>
import { showToast } from 'vant'
import { saveAuthInfo } from '@/utils/auth'

const router = useRouter()

const phone = ref('')
const code = ref('')
const loading = ref(false)
const countdown = ref(0)
const devLoginLoading = reactive<Record<string, boolean>>({
  student: false,
  parent: false,
  teacher: false,
  admin: false
})

let timer: number | null = null

// 模拟用户数据（避免重复创建）
const mockUsers: Record<string, any> = {
  student: { id: 1001, nickname: '张同学', phone: '13800000001', token: 'mock-token-student-1001' },
  parent: { id: 2001, nickname: '张家长', phone: '13800000002', token: 'mock-token-parent-2001' },
  teacher: { id: 3001, nickname: 'Aaron Smith', phone: '13800000003', token: 'mock-token-teacher-3001' },
  admin: { id: 4001, nickname: '系统管理员', phone: '13800000004', token: 'mock-token-admin-4001' }
}

const roleRoutes: Record<string, string> = {
  student: '/student',
  parent: '/parent',
  teacher: '/teacher',
  admin: '/admin'
}

const roleIcons: Record<string, string> = {
  student: '🎓',
  parent: '👨‍👩‍👧',
  teacher: '👨‍🏫',
  admin: '⚙️'
}

const roleNames: Record<string, string> = {
  student: '学生端',
  parent: '家长端',
  teacher: '教师端',
  admin: '管理员'
}

function sendCode() {
  if (!phone.value || phone.value.length !== 11) {
    showToast('请输入正确的手机号')
    return
  }
  showToast('验证码功能需要启动后端服务')
}

function handleLogin() {
  if (!phone.value || !code.value) {
    showToast('请填写完整信息')
    return
  }
  showToast('登录功能需要启动后端服务，请使用开发者快速入口')
}

async function quickLogin(role: string) {






  if (devLoginLoading[role]) return
  
  devLoginLoading[role] = true
  
  try {






    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    


    const mockUser = mockUsers[role]
    






    // 使用工具函数保存认证信息
    saveAuthInfo({
      token: mockUser.token,
      refreshToken: 'mock-refresh-' + mockUser.id,
      role: role,
      userInfo: {
        id: mockUser.id,
        phone: mockUser.phone,
        nickname: mockUser.nickname,
        avatar: '',
        role: role,
        status: 1
      }
    })
    





    showToast('已登录为：' + mockUser.nickname)
    















    // 跳转到对应角色首页






    const targetRoute = roleRoutes[role] || '/'
    await router.push(targetRoute)
    




  } catch (error: any) {
    console.error('开发登录失败:', error)

    showToast(error.message || '登录失败')
  } finally {





    devLoginLoading[role] = false
  }
}




















onMounted(() => {
  // 清除可能残留的无效token
  const token = localStorage.getItem('token')
  if (token && token.length < 10) {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userInfo')
  }
})
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f1729, #1a2540);
  padding: 20px;
}

.auth-container {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: #c9a84c;
  margin-bottom: 8px;
}

.auth-header h2 {
  font-size: 20px;
  color: #0f1729;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.code-input {
  display: flex;
  gap: 12px;
}

.code-input input {
  flex: 1;
}

.btn-code {
  padding: 12px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-code:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-submit {
  width: 100%;
  padding: 14px;
  background: #c9a84c;
  color: #0f1729;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
}

.btn-submit:disabled {
  opacity: 0.7;
}

/* 开发者快速登录区域 */
.dev-login-section {
  margin-top: 32px;
}

.divider {
  text-align: center;
  position: relative;
  margin-bottom: 16px;
}

.divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #eee;
}

.divider span {
  position: relative;
  background: #fff;
  padding: 0 16px;
  font-size: 13px;
  color: #999;
}

.dev-hint {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
}

.dev-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.dev-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  font-weight: 500;
}

.dev-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dev-btn.student {
  border-color: #4CAF50;
  color: #4CAF50;
}

.dev-btn.student:hover {
  background: #4CAF50;
  color: #fff;
}

.dev-btn.parent {
  border-color: #2196F3;
  color: #2196F3;
}

.dev-btn.parent:hover {
  background: #2196F3;
  color: #fff;
}

.dev-btn.teacher {
  border-color: #FF9800;
  color: #FF9800;
}

.dev-btn.teacher:hover {
  background: #FF9800;
  color: #fff;
}

.dev-btn.admin {
  border-color: #9C27B0;
  color: #9C27B0;
}

.dev-btn.admin:hover {
  background: #9C27B0;
  color: #fff;
}

.dev-icon {
  font-size: 24px;
}

@media (max-width: 768px) {
  .auth-container {
    padding: 24px;
  }
  
  .dev-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
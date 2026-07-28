<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">NobodySelection</div>
        <h2>登录 / 注册</h2>
      </div>
      
      <!-- 开发者快速登录入口 -->
      <div class="dev-login-section">
        <div class="divider">
          <span>开发者快速入口</span>
        </div>
        <p class="dev-hint">选择角色直接体验系统（无需验证码）</p>
        <div class="dev-buttons">
          <button 
            @click="quickLogin('student')" 
            class="dev-btn student"
            :disabled="devLoginLoading.student"
          >
            <span class="dev-icon">&#x1F393;</span>
            <span>{{ devLoginLoading.student ? '登录中...' : '学生端' }}</span>
          </button>
          <button 
            @click="quickLogin('parent')" 
            class="dev-btn parent"
            :disabled="devLoginLoading.parent"
          >
            <span class="dev-icon">&#x1F468;&#x200D;&#x1F469;&#x200D;&#x1F467;</span>
            <span>{{ devLoginLoading.parent ? '登录中...' : '家长端' }}</span>
          </button>
          <button 
            @click="quickLogin('teacher')" 
            class="dev-btn teacher"
            :disabled="devLoginLoading.teacher"
          >
            <span class="dev-icon">&#x1F468;&#x200D;&#x1F3EB;</span>
            <span>{{ devLoginLoading.teacher ? '登录中...' : '教师端' }}</span>
          </button>
          <button 
            @click="quickLogin('admin')" 
            class="dev-btn admin"
            :disabled="devLoginLoading.admin"
          >
            <span class="dev-icon">&#x2699;&#xFE0F;</span>
            <span>{{ devLoginLoading.admin ? '登录中...' : '管理员' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import axios from 'axios'

const router = useRouter()
const devLoginLoading = ref<Record<string, boolean>>({
  student: false,
  parent: false,
  teacher: false,
  admin: false
})

async function quickLogin(role: string) {
  // 设置加载状态
  devLoginLoading.value[role] = true
  
  try {
    const phoneMap: Record<string, string> = {
      student: '13800000001',
      parent: '13800000002',
      teacher: '13800000003',
      admin: '13800000004'
    }
    
    const response = await axios.post('/api/auth/dev-login', {
      phone: phoneMap[role],
      role: role
    })
    
    const { tokens, id, role: userRole, nickname } = response.data
    
    // 保存token和用户信息
    localStorage.setItem('token', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    localStorage.setItem('userRole', userRole)
    localStorage.setItem('userInfo', JSON.stringify({
      id,
      phone: phoneMap[role],
      nickname,
      avatar: '',
      role: userRole,
      status: 1
    }))
    
    showToast('已登录为：' + nickname)
    
    // 跳转到对应角色首页
    const routes: Record<string, string> = {
      student: '/student',
      parent: '/parent',
      teacher: '/teacher',
      admin: '/admin'
    }
    
    setTimeout(() => {
      router.push(routes[role] || '/')
    }, 500)
    
  } catch (error: any) {
    console.error('开发登录失败:', error)
    showToast(error.response?.data?.message || '开发登录失败，请确保后端服务已启动')
  } finally {
    devLoginLoading.value[role] = false
  }
}
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
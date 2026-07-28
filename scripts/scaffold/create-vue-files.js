const fs = require('fs');
const path = require('path');

// Home page
const homeContent = `<template>
  <div class="home">
    <header class="header">
      <div class="container">
        <div class="logo">NobodySelection</div>
        <nav class="nav">
          <router-link to="/teachers">教师列表</router-link>
          <router-link to="/auth" class="btn-login">登录/注册</router-link>
        </nav>
      </div>
    </header>
    <section class="hero">
      <h1>Find Your Perfect Teacher</h1>
      <p>高端外教优选平台</p>
      <router-link to="/teachers" class="btn-primary">开始探索</router-link>
    </section>
    <section class="gold-teachers">
      <h2>金牌教师</h2>
      <div class="teacher-grid">
        <div v-for="t in goldTeachers" :key="t.id" class="teacher-card">
          <div class="avatar-placeholder"></div>
          <h3>{{ t.name }}</h3>
          <p>{{ t.nationality }}</p>
        </div>
      </div>
    </section>
    <footer class="footer">
      <p>&copy; 2025 NobodySelection. All rights reserved.</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
interface Teacher {
  id: number
  name: string
  nationality: string
}
const goldTeachers = ref<Teacher[]>([
  { id: 1, name: "Aaron Smith", nationality: "美国" },
  { id: 2, name: "Sarah Johnson", nationality: "英国" },
  { id: 3, name: "Michael Brown", nationality: "加拿大" },
  { id: 4, name: "Emma Wilson", nationality: "澳大利亚" }
])
</script>
<style scoped>
.home { min-height: 100vh; }
.header { background: #0f1729; padding: 16px; position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.logo { font-family: "Playfair Display", serif; font-size: 24px; color: #c9a84c; }
.nav { display: flex; gap: 20px; }
.nav a { color: #fff; text-decoration: none; }
.btn-login { background: #c9a84c; color: #0f1729 !important; padding: 8px 20px; border-radius: 4px; }
.hero { background: linear-gradient(135deg, #0f1729, #1a2540); color: #fff; text-align: center; padding: 150px 20px; }
.hero h1 { font-family: "Playfair Display", serif; font-size: 48px; margin-bottom: 16px; }
.hero p { font-size: 18px; color: #aaa; margin-bottom: 32px; }
.btn-primary { display: inline-block; background: #c9a84c; color: #0f1729; padding: 14px 40px; text-decoration: none; border-radius: 4px; font-weight: 600; }
.gold-teachers { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
.gold-teachers h2 { text-align: center; font-family: "Playfair Display", serif; font-size: 32px; margin-bottom: 40px; color: #0f1729; }
.teacher-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.teacher-card { text-align: center; padding: 20px; border: 1px solid #ddd9cf; border-radius: 8px; }
.avatar-placeholder { width: 120px; height: 120px; border-radius: 50%; background: #f0ede5; margin: 0 auto 12px; }
.teacher-card h3 { font-size: 16px; color: #0f1729; margin-bottom: 4px; }
.teacher-card p { color: #6b6b6b; font-size: 13px; }
.footer { background: #0f1729; color: #666; text-align: center; padding: 30px; }
@media (max-width: 768px) { .teacher-grid { grid-template-columns: repeat(2, 1fr); } .hero h1 { font-size: 32px; } }
</style>`;

// Auth page
const authContent = `<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">NobodySelection</div>
        <h2>登录 / 注册</h2>
      </div>
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import { sendSmsCode } from "@/api/auth"
import { showToast } from "vant"

const router = useRouter()
const authStore = useAuthStore()

const phone = ref("")
const code = ref("")
const loading = ref(false)
const countdown = ref(0)

let timer: number | null = null

async function sendCode() {
  if (!phone.value || phone.value.length !== 11) {
    showToast("请输入正确的手机号")
    return
  }
  try {
    await sendSmsCode(phone.value)
    showToast("验证码已发送")
    countdown.value = 60
    timer = window.setInterval(() => {
      countdown.value--
      if (countdown.value <= 0 && timer) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (e) {
    showToast("发送失败，请重试")
  }
}

async function handleLogin() {
  if (!phone.value || !code.value) {
    showToast("请填写完整信息")
    return
  }
  loading.value = true
  try {
    await authStore.loginBySmsAction(phone.value, code.value)
    showToast("登录成功")
    router.push("/")
  } catch (e) {
    showToast("登录失败")
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f1729, #1a2540); padding: 20px; }
.auth-container { background: #fff; border-radius: 12px; padding: 40px; width: 100%; max-width: 400px; }
.auth-header { text-align: center; margin-bottom: 32px; }
.logo { font-family: "Playfair Display", serif; font-size: 28px; color: #c9a84c; margin-bottom: 8px; }
.auth-header h2 { font-size: 20px; color: #0f1729; }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 14px; color: #333; margin-bottom: 8px; }
.form-group input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.code-input { display: flex; gap: 12px; }
.code-input input { flex: 1; }
.btn-code { padding: 12px 16px; background: #f5f5f5; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; white-space: nowrap; }
.btn-code:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-submit { width: 100%; padding: 14px; background: #c9a84c; color: #0f1729; border: none; border-radius: 6px; font-size: 16px; font-weight: 600; cursor: pointer; }
.btn-submit:disabled { opacity: 0.7; }
</style>`;

// Teacher list page
const teacherListContent = `<template>
  <div class="teacher-list-page">
    <header class="page-header">
      <router-link to="/" class="back">返回首页</router-link>
      <h1>教师列表</h1>
    </header>
    <div class="container">
      <div class="filters">
        <select v-model="specialty">
          <option value="">全部领域</option>
          <option value="ielts">雅思</option>
          <option value="toefl">托福</option>
          <option value="oral">口语</option>
          <option value="business">商务英语</option>
        </select>
      </div>
      <div class="teacher-grid">
        <div v-for="teacher in teachers" :key="teacher.id" class="teacher-card" @click="goDetail(teacher.id)">
          <div class="teacher-photo">
            <div class="photo-placeholder"></div>
          </div>
          <div class="teacher-info">
            <h3>{{ teacher.name }}</h3>
            <p class="nationality">{{ teacher.nationality }}</p>
            <p class="specialty">{{ teacher.specialty }}</p>
            <div class="rating">
              <span class="star">★★★★★</span>
              <span class="count">{{ teacher.rating }}</span>
            </div>
            <p class="rate">{{ teacher.rate }}元/课时</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const specialty = ref("")

const teachers = ref([
  { id: 1, name: "Aaron Smith", nationality: "美国", specialty: "雅思/口语", rating: 5.0, rate: 300 },
  { id: 2, name: "Sarah Johnson", nationality: "英国", specialty: "商务英语", rating: 4.9, rate: 350 },
  { id: 3, name: "Michael Brown", nationality: "加拿大", specialty: "少儿英语", rating: 4.8, rate: 250 },
  { id: 4, name: "Emma Wilson", nationality: "澳大利亚", specialty: "托福/学术", rating: 4.9, rate: 400 },
  { id: 5, name: "James Davis", nationality: "美国", specialty: "口语训练", rating: 4.7, rate: 280 },
  { id: 6, name: "Lisa Anderson", nationality: "英国", specialty: "雅思/写作", rating: 4.9, rate: 380 }
])

function goDetail(id: number) {
  router.push("/teachers/" + id)
}
</script>
<style scoped>
.teacher-list-page { min-height: 100vh; background: #faf8f4; }
.page-header { background: #0f1729; color: #fff; padding: 20px; display: flex; align-items: center; gap: 20px; }
.page-header .back { color: #c9a84c; text-decoration: none; }
.page-header h1 { font-size: 20px; }
.container { max-width: 1200px; margin: 0 auto; padding: 24px; }
.filters { margin-bottom: 24px; }
.filters select { padding: 10px 16px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px; }
.teacher-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.teacher-card { background: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #eee; cursor: pointer; transition: all 0.3s; }
.teacher-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
.teacher-photo { height: 200px; background: #f0ede5; }
.photo-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, #e8d5a0, #c9a84c); }
.teacher-info { padding: 16px; }
.teacher-info h3 { font-size: 18px; color: #0f1729; margin-bottom: 4px; }
.nationality { color: #6b6b6b; font-size: 13px; }
.specialty { color: #c9a84c; font-size: 12px; margin: 8px 0; }
.rating { display: flex; align-items: center; gap: 4px; }
.star { color: #c9a84c; font-size: 14px; }
.count { color: #6b6b6b; font-size: 13px; }
.rate { font-size: 16px; font-weight: 600; color: #0f1729; margin-top: 8px; }
@media (max-width: 768px) { .teacher-grid { grid-template-columns: repeat(2, 1fr); } }
</style>`;

// Write files
const files = {
  'nobody-selection-web/src/views/home/index.vue': homeContent,
  'nobody-selection-web/src/views/auth/index.vue': authContent,
  'nobody-selection-web/src/views/teacher/list.vue': teacherListContent
};

Object.entries(files).forEach(([filePath, content]) => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created:', filePath);
});
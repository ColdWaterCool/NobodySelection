const fs = require('fs');

const content = `<template>
  <div class="page-container">
    <nav class="sidebar">
      <div class="sidebar-header">
        <div class="logo">AARON</div>
        <div class="logo-sub">SELECTION</div>
      </div>
      <div class="user-info">
        <div class="avatar">&#127891;</div>
        <div class="user-name">张同学</div>
        <div class="user-role">学生</div>
      </div>
      <div class="nav-menu">
        <router-link to="/student" class="nav-item active">
          <span class="nav-icon">&#128202;</span>
          <span>学习概览</span>
        </router-link>
        <router-link to="/student/homework" class="nav-item">
          <span class="nav-icon">&#128221;</span>
          <span>作业中心</span>
        </router-link>
        <router-link to="/student/records" class="nav-item">
          <span class="nav-icon">&#128218;</span>
          <span>学习记录</span>
        </router-link>
        <router-link to="/purchase" class="nav-item">
          <span class="nav-icon">&#128176;</span>
          <span>购买课时</span>
        </router-link>
        <router-link to="/settings" class="nav-item">
          <span class="nav-icon">&#9881;&#65039;</span>
          <span>个人设置</span>
        </router-link>
      </div>
      <div class="sidebar-footer">
        <router-link to="/" class="nav-item back-home">
          <span class="nav-icon">&#127968;</span>
          <span>返回首页</span>
        </router-link>
      </div>
    </nav>
    <main class="main-content">
      <header class="top-bar">
        <h1>学习概览</h1>
        <div class="header-actions">
          <button class="btn-logout" @click="logout">退出登录</button>
        </div>
      </header>
      <div class="content-body">
        <div class="welcome-banner">
          <div class="welcome-text">
            <h2>欢迎回来，张同学！</h2>
            <p>今天是你学习的第 45 天，继续加油！</p>
          </div>
          <div class="welcome-illustration">&#128218;</div>
        </div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon blue">&#9201;&#65039;</div>
            <div class="stat-info">
              <div class="stat-value">28</div>
              <div class="stat-label">剩余课时</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon green">&#9989;</div>
            <div class="stat-info">
              <div class="stat-value">12</div>
              <div class="stat-label">已完成课程</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon orange">&#128221;</div>
            <div class="stat-info">
              <div class="stat-value">3</div>
              <div class="stat-label">待完成作业</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon purple">&#11088;</div>
            <div class="stat-info">
              <div class="stat-value">4.8</div>
              <div class="stat-label">平均评分</div>
            </div>
          </div>
        </div>
        <div class="content-grid">
          <div class="upcoming-classes">
            <h3>近期课程</h3>
            <div class="class-list">
              <div class="class-item">
                <div class="class-time">
                  <div class="time">09:00</div>
                  <div class="date">今天</div>
                </div>
                <div class="class-info">
                  <div class="teacher-name">Aaron Smith</div>
                  <div class="class-topic">雅思口语 Part1 练习</div>
                </div>
                <div class="class-status upcoming">即将开始</div>
              </div>
              <div class="class-item">
                <div class="class-time">
                  <div class="time">14:30</div>
                  <div class="date">明天</div>
                </div>
                <div class="class-info">
                  <div class="teacher-name">Sarah Johnson</div>
                  <div class="class-topic">商务英语写作</div>
                </div>
                <div class="class-status scheduled">已安排</div>
              </div>
            </div>
          </div>
          <div class="homework-preview">
            <h3>待完成作业</h3>
            <div class="homework-list">
              <div class="homework-item">
                <div class="homework-icon">&#128221;</div>
                <div class="homework-info">
                  <div class="homework-title">口语录音作业</div>
                  <div class="homework-deadline">截止：今天 20:00</div>
                </div>
                <button class="btn-do">去完成</button>
              </div>
              <div class="homework-item">
                <div class="homework-icon">&#128214;</div>
                <div class="homework-info">
                  <div class="homework-title">阅读理解练习</div>
                  <div class="homework-deadline">截止：明天 18:00</div>
                </div>
                <button class="btn-do">去完成</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
  localStorage.clear()
  router.push('/auth')
}
</script>
<style scoped>
.page-container { display: flex; min-height: 100vh; background: #f5f7fa; }
.sidebar { width: 260px; background: #0f1729; color: #fff; display: flex; flex-direction: column; position: fixed; height: 100vh; }
.sidebar-header { padding: 24px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
.logo { font-family: "Playfair Display", serif; font-size: 24px; color: #c9a84c; font-weight: 700; }
.logo-sub { font-size: 10px; letter-spacing: 4px; color: #8b7355; margin-top: 4px; }
.user-info { padding: 24px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
.avatar { font-size: 48px; margin-bottom: 8px; }
.user-name { font-size: 16px; font-weight: 600; }
.user-role { font-size: 12px; color: #c9a84c; margin-top: 4px; }
.nav-menu { flex: 1; padding: 16px 0; }
.nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 24px; color: rgba(255,255,255,0.7); text-decoration: none; transition: all 0.3s; cursor: pointer; }
.nav-item:hover, .nav-item.active { background: rgba(201,168,76,0.2); color: #c9a84c; }
.nav-icon { font-size: 18px; }
.sidebar-footer { padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.1); }
.back-home { color: rgba(255,255,255,0.5); }
.main-content { flex: 1; margin-left: 260px; }
.top-bar { background: #fff; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.top-bar h1 { font-size: 24px; color: #0f1729; }
.btn-logout { padding: 8px 20px; background: #f5f5f5; border: none; border-radius: 6px; cursor: pointer; color: #666; }
.btn-logout:hover { background: #eee; }
.content-body { padding: 32px; }
.welcome-banner { background: linear-gradient(135deg, #0f1729, #1a2540); border-radius: 16px; padding: 32px; color: #fff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.welcome-text h2 { font-size: 28px; margin-bottom: 8px; }
.welcome-text p { color: rgba(255,255,255,0.7); }
.welcome-illustration { font-size: 80px; opacity: 0.8; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 32px; }
.stat-card { background: #fff; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; border: 1px solid #eee; transition: all 0.3s; }
.stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.stat-icon.blue { background: #e3f2fd; }
.stat-icon.green { background: #e8f5e9; }
.stat-icon.orange { background: #fff3e0; }
.stat-icon.purple { background: #f3e5f5; }
.stat-value { font-size: 28px; font-weight: 700; color: #0f1729; }
.stat-label { font-size: 13px; color: #666; margin-top: 4px; }
.content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.upcoming-classes, .homework-preview { background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #eee; }
.upcoming-classes h3, .homework-preview h3 { font-size: 18px; color: #0f1729; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #c9a84c; }
.class-item { display: flex; align-items: center; gap: 20px; padding: 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 12px; }
.class-time { text-align: center; min-width: 70px; }
.class-time .time { font-size: 18px; font-weight: 600; color: #0f1729; }
.class-time .date { font-size: 12px; color: #666; }
.class-info { flex: 1; }
.teacher-name { font-weight: 600; color: #0f1729; margin-bottom: 4px; }
.class-topic { font-size: 13px; color: #666; }
.class-status { padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; }
.class-status.upcoming { background: #fff3e0; color: #f57c00; }
.class-status.scheduled { background: #e3f2fd; color: #1976d2; }
.homework-item { display: flex; align-items: center; gap: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px; margin-bottom: 12px; }
.homework-icon { font-size: 32px; }
.homework-info { flex: 1; }
.homework-title { font-weight: 600; color: #0f1729; margin-bottom: 4px; }
.homework-deadline { font-size: 12px; color: #f57c00; }
.btn-do { padding: 8px 16px; background: #c9a84c; color: #0f1729; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; }
.btn-do:hover { background: #b8973b; }
@media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } .content-grid { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .sidebar { display: none; } .main-content { margin-left: 0; } }
</style>`;

fs.writeFileSync('nobody-selection-web/src/views/student/index.vue', content, 'utf8');
console.log('Student dashboard updated successfully!');
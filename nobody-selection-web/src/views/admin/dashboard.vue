<template>
  <div class="admin-dashboard">
    <div class="stats-row">
      <div class="stat-card" v-for="s in overviewStats" :key="s.label">
        <div class="stat-icon" :style="{ background: s.bg }">{{ s.icon }}</div>
        <div class="stat-body">
          <div class="stat-value">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
          <div class="stat-trend" :class="s.trend > 0 ? 'up' : 'down'">
            {{ s.trend > 0 ? '↑' : '↓' }} {{ Math.abs(s.trend) }}% 较上月
          </div>
        </div>
      </div>
    </div>

    <div class="honor-row">
      <div v-for="h in honors" :key="h.title" class="honor-card">
        <span class="honor-icon">{{ h.icon }}</span>
        <div>
          <h4>{{ h.title }}</h4>
          <p class="honor-name">{{ h.name }}</p>
          <p class="honor-reason">{{ h.reason }}</p>
        </div>
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <h3>近7日订单趋势</h3>
        <div class="bar-chart">
          <div v-for="d in orderTrend" :key="d.day" class="bar-col">
            <div class="bar" :style="{ height: d.height + '%' }"></div>
            <span class="bar-label">{{ d.day }}</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3>待处理事项</h3>
        <div class="todo-list">
          <div v-for="t in todos" :key="t.id" class="todo-item">
            <span class="todo-badge" :class="t.type">{{ t.typeText }}</span>
            <span class="todo-text">{{ t.text }}</span>
            <router-link :to="t.link" class="todo-action">处理 →</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="table-card">
      <h3>B 端合作窗口 Partnerships</h3>
      <div class="partner-grid">
        <div v-for="p in PARTNERSHIPS" :key="p.id" class="partner-card">
          <div class="partner-head">
            <strong>{{ p.nameZh }}</strong>
            <span class="partner-status" :class="p.status">{{ p.statusZh }}</span>
          </div>
          <p class="partner-en">{{ p.nameEn }}</p>
          <p class="partner-desc">{{ p.descZh }}</p>
          <p class="partner-meta">{{ p.contact }} · 自 {{ p.since }}</p>
          <router-link to="/admin/partnerships" class="partner-btn">查看对接</router-link>
        </div>
      </div>
    </div>

    <div class="table-card">
      <h3>最新订单</h3>
      <table>
        <thead>
          <tr><th>订单号</th><th>用户</th><th>课时包</th><th>金额</th><th>状态</th></tr>
        </thead>
        <tbody>
          <tr v-for="o in recentOrders" :key="o.id">
            <td>{{ o.id }}</td>
            <td>{{ o.user }}</td>
            <td>{{ o.package }}</td>
            <td>¥{{ o.amount }}</td>
            <td><span class="order-status" :class="o.status">{{ o.statusText }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PARTNERSHIPS } from '@/data/partnerships'

const honors = [
  { icon: '⭐', title: '本月口碑之星', name: 'Aaron Smith', reason: '学生评分 4.98，复购率 +12%' },
  { icon: '🚀', title: '进步最快教师', name: 'Sarah Johnson', reason: '认证分 30 天内 +8.2' },
]

const overviewStats = [
  { icon: '👥', value: '1,286', label: '注册用户', trend: 12, bg: '#e3f2fd' },
  { icon: '👨‍🏫', value: '48', label: '认证教师', trend: 5, bg: '#fff3e0' },
  { icon: '📦', value: '326', label: '本月订单', trend: 18, bg: '#e8f5e9' },
  { icon: '💰', value: '¥128,600', label: '本月营收', trend: 22, bg: '#f3e5f5' },
]

const orderTrend = [
  { day: '周一', height: 60 },
  { day: '周二', height: 75 },
  { day: '周三', height: 45 },
  { day: '周四', height: 90 },
  { day: '周五', height: 80 },
  { day: '周六', height: 55 },
  { day: '周日', height: 40 },
]

const todos = [
  { id: 1, type: 'urgent', typeText: '紧急', text: '2 条文化活动申请待审批', link: '/admin/activities' },
  { id: 2, type: 'urgent', typeText: '紧急', text: '3 位教师待审核', link: '/admin/teachers' },
  { id: 3, type: 'normal', typeText: '普通', text: '合作申请待跟进', link: '/admin/partnerships' },
  { id: 4, type: 'normal', typeText: '普通', text: '12 笔退款申请待处理', link: '/admin/orders' },
]

const recentOrders = [
  { id: 'ORD-2025060501', user: '张同学', package: '20课时包', amount: 1800, status: 'paid', statusText: '已支付' },
  { id: 'ORD-2025060502', user: '李家长', package: '50课时包', amount: 4000, status: 'pending', statusText: '待支付' },
  { id: 'ORD-2025060503', user: '王同学', package: '5课时包', amount: 500, status: 'paid', statusText: '已支付' },
  { id: 'ORD-2025060504', user: '陈同学', package: '20课时包', amount: 1800, status: 'refund', statusText: '退款中' },
]
</script>

<style scoped>
.admin-dashboard { display: flex; flex-direction: column; gap: 24px; }
.honor-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.honor-card {
  display: flex; gap: 14px; align-items: flex-start; padding: 18px 20px;
  background: var(--as-glass); border-radius: var(--as-radius); border: 1px solid var(--as-glass-border);
}
.honor-icon { font-size: 28px; }
.honor-card h4 { font-size: 14px; color: var(--as-navy); margin-bottom: 6px; }
.honor-name { font-size: 16px; font-weight: 700; color: var(--as-navy); }
.honor-reason { font-size: 12px; color: var(--as-muted); margin-top: 4px; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.stat-card { background: var(--as-glass); backdrop-filter: blur(12px); border-radius: var(--as-radius); padding: 20px; display: flex; gap: 16px; border: 1px solid var(--as-glass-border); box-shadow: var(--as-shadow); }
.stat-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.stat-value { font-size: 26px; font-weight: 700; color: var(--as-navy); }
.stat-label { font-size: 13px; color: var(--as-muted); margin: 4px 0; }
.stat-trend { font-size: 12px; }
.stat-trend.up { color: #2e7d32; }
.stat-trend.down { color: #c62828; }
.charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.chart-card, .table-card { background: var(--as-glass); backdrop-filter: blur(12px); border-radius: var(--as-radius); padding: 24px; border: 1px solid var(--as-glass-border); box-shadow: var(--as-shadow); }
.chart-card h3, .table-card h3 { font-size: 16px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid var(--as-border); color: var(--as-navy); }
.bar-chart { display: flex; align-items: flex-end; gap: 12px; height: 160px; padding-top: 10px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
.bar { width: 100%; background: linear-gradient(180deg, var(--as-blue-soft), var(--as-navy)); border-radius: 4px 4px 0 0; min-height: 8px; }
.bar-label { font-size: 12px; color: var(--as-muted); margin-top: 8px; }
.todo-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: rgba(255, 255, 255, 0.45); border-radius: 8px; margin-bottom: 10px; }
.todo-badge { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.todo-badge.urgent { background: #ffebee; color: #c62828; }
.todo-badge.normal { background: #e3f2fd; color: #1565c0; }
.todo-text { flex: 1; font-size: 14px; }
.todo-action { font-size: 13px; color: var(--as-blue-soft); text-decoration: none; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid var(--as-border); font-size: 14px; }
th { color: var(--as-muted); font-weight: 500; }
.order-status { padding: 4px 10px; border-radius: 12px; font-size: 12px; }
.order-status.paid { background: #e8f5e9; color: #2e7d32; }
.order-status.pending { background: #fff3e0; color: #f57c00; }
.order-status.refund { background: #fce4ec; color: #c62828; }
.partner-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 8px; }
.partner-card {
  padding: 16px; background: rgba(255,255,255,0.45); border-radius: 10px;
  border: 1px solid var(--as-border);
}
.partner-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.partner-head strong { color: var(--as-navy); }
.partner-status { font-size: 11px; padding: 2px 8px; border-radius: 100px; }
.partner-status.active { background: #e8f5e9; color: #2e7d32; }
.partner-status.pending { background: #fff3e0; color: #f57c00; }
.partner-en { font-size: 11px; color: var(--as-muted-light); margin-bottom: 8px; }
.partner-desc, .partner-meta { font-size: 12px; color: var(--as-muted); margin-bottom: 4px; }
.partner-btn {
  display: inline-block; margin-top: 10px; padding: 6px 14px; border: none; border-radius: 100px;
  background: var(--as-navy); color: #fff; font-size: 12px; cursor: pointer; text-decoration: none;
}
@media (max-width: 1024px) { .stats-row, .charts-row, .partner-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 768px) { .stats-row, .charts-row { grid-template-columns: 1fr; } }
</style>

<template>
  <div class="admin-page">
    <div class="stats-row">
      <div v-for="s in stats" :key="s.label" class="stat-card as-glass">
        <span class="icon">{{ s.icon }}</span>
        <div>
          <div class="val">{{ s.value }}</div>
          <div class="lbl">{{ s.label }}</div>
        </div>
      </div>
    </div>
    <div class="charts">
      <div class="chart-card as-glass">
        <h3>收入构成（本月）</h3>
        <div class="pie-legend">
          <div v-for="p in breakdown" :key="p.label" class="pie-item">
            <span class="dot" :style="{ background: p.color }"></span>
            <span>{{ p.label }}</span>
            <strong>¥{{ p.amount }}</strong>
            <span class="pct">{{ p.pct }}%</span>
          </div>
        </div>
      </div>
      <div class="chart-card as-glass">
        <h3>三层分账（基金 15% / 教学 85%）</h3>
        <div class="split-visual">
          <div class="split-a" style="width:15%">学习基金<br>¥19,290</div>
          <div class="split-b" style="width:85%">教学服务<br>¥109,310</div>
        </div>
        <p class="layer3-hint">教学池内平台阶梯抽成约 15%～18% 全口径</p>
      </div>
    </div>
    <div class="table-card as-glass">
      <h3>近期结算</h3>
      <table>
        <thead><tr><th>日期</th><th>类型</th><th>金额</th><th>备注</th></tr></thead>
        <tbody>
          <tr v-for="r in settlements" :key="r.id">
            <td>{{ r.date }}</td>
            <td>{{ r.type }}</td>
            <td>¥{{ r.amount }}</td>
            <td>{{ r.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { icon: '💰', value: '¥128,600', label: '本月总营收' },
  { icon: '📦', value: '326', label: '订单数' },
  { icon: '👨‍🏫', value: '¥86,400', label: '教师结算' },
  { icon: '🏦', value: '¥19,290', label: '学习基金池 (15%)' },
]

const breakdown = [
  { label: '课时销售', amount: 98000, pct: 76, color: '#3d6a9a' },
  { label: '企业培训', amount: 18600, pct: 14, color: '#5c8ab8' },
  { label: '文化活动', amount: 12000, pct: 10, color: '#0c1a2e' },
]

const settlements = [
  { id: 1, date: '2026-06-08', type: '教师结算', amount: '12,500', note: 'Aaron Smith 等 8 人' },
  { id: 2, date: '2026-06-07', type: '学习基金', amount: '2,700', note: '15% 自动分配' },
  { id: 3, date: '2026-06-05', type: '退款', amount: '-1,800', note: 'ORD-2025060504' },
]
</script>

<style scoped>
.admin-page { width: 100%; }
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.stat-card { padding: 18px; display: flex; gap: 14px; align-items: center; }
.stat-card .icon { font-size: 28px; }
.val { font-size: 22px; font-weight: 700; color: var(--as-navy); }
.lbl { font-size: 12px; color: var(--as-muted); }
.charts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.chart-card { padding: 20px; }
.chart-card h3 { font-size: 15px; color: var(--as-navy); margin-bottom: 16px; }
.pie-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 13px; }
.dot { width: 10px; height: 10px; border-radius: 50%; }
.pie-item strong { margin-left: auto; }
.pct { color: var(--as-muted); font-size: 12px; }
.split-visual { display: flex; height: 48px; border-radius: 8px; overflow: hidden; color: #fff; font-size: 12px; text-align: center; }
.split-a { background: #5c8ab8; display: flex; align-items: center; justify-content: center; }
.split-b { background: var(--as-navy); display: flex; align-items: center; justify-content: center; }
.layer3-hint { font-size: 12px; color: var(--as-muted); margin-top: 10px; }
.table-card { padding: 24px; }
.table-card h3 { margin-bottom: 16px; color: var(--as-navy); }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid var(--as-border); font-size: 14px; }
th { color: var(--as-muted); }
@media (max-width: 900px) { .stats-row, .charts { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .stats-row, .charts { grid-template-columns: 1fr; } }
</style>

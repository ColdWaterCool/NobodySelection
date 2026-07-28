<template>
  <PortalLayout
    page-title="学时统计"
    page-title-en="Statistics"
    role-label="家长 Parent"
    avatar="👨‍👩‍👧"
    :nav-items="PARENT_NAV"
  >
    <div class="stats-wrap">
      <div class="pc-panel as-glass">
        <h3>张小雨 · 近 4 周学时</h3>
        <div class="week-bars">
          <div v-for="w in weeks" :key="w.label" class="week-col">
            <div class="week-bar" :style="{ height: w.hours * 12 + 'px' }"></div>
            <span>{{ w.label }}</span>
            <strong>{{ w.hours }}h</strong>
          </div>
        </div>
      </div>
      <div class="pc-grid">
        <div class="pc-panel as-glass">
          <h3>学科分布</h3>
          <div v-for="s in subjects" :key="s.name" class="sub-row">
            <span>{{ s.name }}</span>
            <div class="sub-bar-wrap"><div class="sub-bar" :style="{ width: s.pct + '%' }"></div></div>
            <span>{{ s.pct }}%</span>
          </div>
        </div>
        <div class="pc-panel as-glass">
          <h3>月度总结</h3>
          <p class="summary">本月共完成 <strong>12</strong> 节课，出勤率 <strong>100%</strong>，AI 综合评级 <strong>A-</strong></p>
          <p class="summary-hint">详细学情分析见家长中心 AI 报告</p>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import PortalLayout from '@/components/PortalLayout.vue'
import { PARENT_NAV } from '@/data/portal-nav'

const weeks = [
  { label: 'W1', hours: 3 },
  { label: 'W2', hours: 4 },
  { label: 'W3', hours: 2 },
  { label: 'W4', hours: 4 },
]
const subjects = [
  { name: '口语', pct: 45 },
  { name: '写作', pct: 25 },
  { name: '听力', pct: 20 },
  { name: '阅读', pct: 10 },
]
</script>

<style scoped>
.stats-wrap { max-width: 720px; }
.week-bars { display: flex; gap: 20px; align-items: flex-end; height: 120px; padding-top: 20px; }
.week-col { flex: 1; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
.week-bar { width: 100%; background: linear-gradient(180deg, var(--as-blue-soft), var(--as-navy)); border-radius: 4px 4px 0 0; min-height: 8px; }
.week-col span { font-size: 11px; color: var(--as-muted); margin-top: 8px; }
.week-col strong { font-size: 13px; color: var(--as-navy); }
.sub-row { display: grid; grid-template-columns: 60px 1fr 40px; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 13px; }
.sub-bar-wrap { height: 8px; background: rgba(12,26,46,0.06); border-radius: 4px; }
.sub-bar { height: 100%; background: var(--as-blue-soft); border-radius: 4px; }
.summary { font-size: 14px; color: var(--as-muted); line-height: 1.8; }
.summary strong { color: var(--as-navy); }
.summary-hint { font-size: 12px; color: var(--as-muted-light); margin-top: 10px; }
</style>

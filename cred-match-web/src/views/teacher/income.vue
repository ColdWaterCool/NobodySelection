<template>
  <PortalLayout page-title="收入统计" page-title-en="Income" role-label="教师 Teacher" avatar="👨‍🏫" :nav-items="TEACHER_NAV">
    <div class="income-wrap">
      <div class="pc-stats">
        <div v-for="s in stats" :key="s.label" class="pc-stat as-glass">
          <span class="pc-stat-icon">{{ s.icon }}</span>
          <div>
            <div class="pc-stat-value">{{ s.value }}</div>
            <div class="pc-stat-label">{{ s.label }}</div>
          </div>
        </div>
      </div>
      <div class="pc-panel as-glass">
        <h3>近 6 月收入趋势</h3>
        <div class="income-bars">
          <div v-for="m in months" :key="m.label" class="bar-col">
            <div class="bar" :style="{ height: m.amount / 150 + 'px' }"></div>
            <span>{{ m.label }}</span>
            <strong>¥{{ m.amount }}</strong>
          </div>
        </div>
      </div>
      <div class="pc-panel as-glass">
        <h3>收入明细</h3>
        <div v-for="r in records" :key="r.id" class="pc-row">
          <div style="flex:1">
            <div style="font-weight:600">{{ r.desc }}</div>
            <div style="font-size:12px;color:var(--as-muted)">{{ r.date }}</div>
          </div>
          <span class="amount">+¥{{ r.amount }}</span>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import PortalLayout from '@/components/PortalLayout.vue'
import { TEACHER_NAV } from '@/data/portal-nav'

const stats = [
  { icon: '💰', value: '¥12,500', label: '本月收入' },
  { icon: '📚', value: '86', label: '本月课时' },
  { icon: '🎭', value: '¥1,200', label: '活动奖励' },
  { icon: '📈', value: '+18%', label: '较上月' },
]

const months = [
  { label: '1月', amount: 8200 },
  { label: '2月', amount: 9100 },
  { label: '3月', amount: 10500 },
  { label: '4月', amount: 9800 },
  { label: '5月', amount: 11200 },
  { label: '6月', amount: 12500 },
]

const records = [
  { id: 1, desc: '雅思口语 · 张小雨', date: '2026-06-08', amount: 180 },
  { id: 2, desc: '商务英语 · 李成人', date: '2026-06-07', amount: 240 },
  { id: 3, desc: '文化沉浸活动 · 双倍积分', date: '2026-06-05', amount: 600 },
]
</script>

<style scoped>
.income-bars { display: flex; gap: 16px; align-items: flex-end; height: 140px; padding-top: 16px; }
.bar-col { flex: 1; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
.bar { width: 100%; background: linear-gradient(180deg, var(--as-blue-soft), var(--as-navy)); border-radius: 4px 4px 0 0; min-height: 8px; }
.bar-col span { font-size: 11px; color: var(--as-muted); margin-top: 8px; }
.bar-col strong { font-size: 12px; color: var(--as-navy); }
.amount { font-weight: 700; color: #2e7d32; font-size: 14px; }
</style>

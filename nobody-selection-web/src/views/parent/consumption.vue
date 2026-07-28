<template>
  <PortalLayout
    page-title="课时消费"
    page-title-en="Consumption"
    role-label="家长 Parent"
    avatar="👨‍👩‍👧"
    :nav-items="PARENT_NAV"
  >
    <div class="consumption-wrap">
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
        <h3>消费明细 · 张小雨</h3>
        <div v-for="r in records" :key="r.id" class="pc-row">
          <div style="min-width:90px;font-size:13px;color:var(--as-muted)">{{ r.date }}</div>
          <div style="flex:1">
            <div style="font-weight:600">{{ r.desc }}</div>
            <div style="font-size:12px;color:var(--as-muted)">{{ r.teacher }}</div>
          </div>
          <span :class="r.type">{{ r.amount }}</span>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import PortalLayout from '@/components/PortalLayout.vue'
import { PARENT_NAV } from '@/data/portal-nav'

const stats = [
  { icon: '💳', value: '¥3,600', label: '累计充值' },
  { icon: '⏱️', value: '28', label: '剩余课时' },
  { icon: '📉', value: '12', label: '本月消耗' },
  { icon: '🎁', value: '¥540', label: '学习基金(15%)' },
]

const records = [
  { id: 1, date: '2026-06-08', desc: '雅思口语 45分钟', teacher: 'Aaron Smith', amount: '-1 课时', type: 'deduct' },
  { id: 2, date: '2026-06-05', desc: '充值 20 课时包', teacher: '—', amount: '+20 课时', type: 'add' },
  { id: 3, date: '2026-06-03', desc: '商务英语 60分钟', teacher: 'Sarah Johnson', amount: '-1 课时', type: 'deduct' },
]
</script>

<style scoped>
.consumption-wrap { max-width: 720px; }
.deduct { color: #c62828; font-weight: 600; font-size: 13px; }
.add { color: #2e7d32; font-weight: 600; font-size: 13px; }
</style>

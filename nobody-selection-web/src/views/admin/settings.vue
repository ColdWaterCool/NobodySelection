<template>
  <div class="admin-page">
    <div class="settings-grid">
      <div class="setting-card as-glass">
        <h3>基金分配（第二层）</h3>
        <div class="field-row">
          <div class="field"><label>学习基金 (%)</label><input v-model.number="parentSplit" type="number" /></div>
          <div class="field"><label>教学服务 (%)</label><input v-model.number="schoolSplit" type="number" /></div>
        </div>
        <p class="hint">{{ fundDesc }}</p>
      </div>
      <div class="setting-card as-glass">
        <h3>阶梯抽成（第三层 · 对教学池）</h3>
        <div v-for="t in COMMISSION_TIERS" :key="t.id" class="tier-row">
          <span>{{ t.labelZh }}</span>
          <strong>{{ t.poolMin }}%～{{ t.poolMax }}%</strong>
          <span class="sub">全口径约 {{ t.fullRateMin }}%～{{ t.fullRateMax }}%</span>
        </div>
        <p class="hint">示例教师（{{ demo.tier.labelZh }}）：教学池抽成 {{ demo.poolCommissionPct }}% → 实付 100 元教师约 ¥{{ demo.example.teacher }}</p>
      </div>
      <div class="setting-card as-glass">
        <h3>文化沉浸</h3>
        <div class="field"><label>每 N 节课获得 1 次兑换名额</label><input v-model.number="cultureThreshold" type="number" /></div>
        <div class="field"><label>名额有效期（月）</label><input v-model.number="creditMonths" type="number" /></div>
        <div class="toggle-row">
          <span>教师双倍积分</span>
          <input type="checkbox" v-model="doublePoints" />
        </div>
      </div>
      <div class="setting-card as-glass">
        <h3>认证规则</h3>
        <div class="field"><label>等级更新周期</label><select v-model="renewCycle"><option>每半年</option><option>每年</option></select></div>
        <p class="hint">序列号终身唯一 · 综合分区间 30～95</p>
      </div>
    </div>
    <button class="save-btn" @click="showToast('系统设置已保存')">保存设置</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import { FUND_SPLIT } from '@/data/fund-split'
import { COMMISSION_TIERS, demoCommissionFromScore } from '@/data/commission-demo'
import { calcCompositeScore } from '@/data/teacher-cert'

const parentSplit = ref(FUND_SPLIT.parentPct)
const schoolSplit = ref(FUND_SPLIT.teachingPct)
const cultureThreshold = ref(10)
const creditMonths = ref(6)
const doublePoints = ref(true)
const renewCycle = ref('每半年')

const fundDesc = FUND_SPLIT.descZh
const demo = computed(() => demoCommissionFromScore(calcCompositeScore()))
</script>

<style scoped>
.admin-page { width: 100%; }
.settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
.setting-card { padding: 20px; }
.setting-card h3 { font-size: 15px; color: var(--as-navy); margin-bottom: 14px; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 12px; font-weight: 600; color: var(--as-navy); margin-bottom: 6px; }
.field input, .field select { width: 100%; padding: 10px; border: 1px solid var(--as-border); border-radius: 8px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.hint { font-size: 12px; color: var(--as-muted); line-height: 1.5; }
.tier-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; font-size: 13px; padding: 8px 0; border-bottom: 1px solid var(--as-border); }
.tier-row .sub { font-size: 11px; color: var(--as-muted); }
.toggle-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-top: 8px; }
.save-btn {
  padding: 12px 32px; background: var(--as-navy); color: #fff; border: none; border-radius: 100px; cursor: pointer;
}
@media (max-width: 768px) { .settings-grid { grid-template-columns: 1fr; } }
</style>

<template>
  <PortalLayout
    page-title="教师中心"
    page-title-en="Teacher Dashboard"
    role-label="教师 Teacher"
    avatar="👨‍🏫"
    :nav-items="TEACHER_NAV"
  >
    <!-- 认证身份卡 -->
    <div class="cert-card as-glass">
      <div class="cert-photo">
        <ImageSlot src="/images/teachers/teacher-01.jpg" :alt="teacherName" shape="circle" size="xl" placeholder-icon="👨‍🏫" />
      </div>
      <div class="cert-body">
        <h2>{{ teacherName }}</h2>
        <div class="cert-badge" :style="{ borderColor: certTier.tier.color }">
          {{ certTier.tier.labelZh }} · {{ certTier.tier.labelEn }}
        </div>
        <div class="cert-serial">
          <span class="serial-label">认证序列号 Cert. No.</span>
          <code>{{ certSerial }}</code>
        </div>
        <p class="cert-note">{{ CERT_STATUS.renewNoteZh }}</p>
        <p class="cert-valid">下次等级更新：{{ CERT_STATUS.validUntil }}</p>
        <p class="rating-hint">{{ RATING_SAMPLE_HINT_ZH }}</p>
      </div>
      <div class="cert-score-block">
        <div class="composite">{{ compositeScore }}</div>
        <div class="composite-label">综合评分 Composite</div>
        <div class="tier-pool">教学池抽成约 {{ poolCommission }}%</div>
      </div>
    </div>

    <!-- 评分权重 -->
    <div class="pc-panel as-glass" style="margin-bottom:24px">
      <h3>评分构成 Score Breakdown</h3>
      <div v-for="w in SCORE_WEIGHTS" :key="w.key" class="score-row">
        <span class="score-label">{{ w.labelZh }} <span class="en">{{ w.labelEn }}</span></span>
        <div class="score-bar-wrap">
          <div class="score-bar" :style="{ width: w.score + '%' }"></div>
        </div>
        <span class="score-weight">{{ w.weight }}%</span>
        <span class="score-val">{{ w.score }}</span>
      </div>
    </div>

    <div class="pc-stats">
      <div v-for="s in stats" :key="s.label" class="pc-stat as-glass">
        <span class="pc-stat-icon">{{ s.icon }}</span>
        <div>
          <div class="pc-stat-value">{{ s.value }}</div>
          <div class="pc-stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <div class="pc-panel as-glass" style="margin:24px 0">
      <h3>文化活动激励 Culture Rewards</h3>
      <p class="reward-hint">参与平台排期活动可获得 <strong>双倍积分</strong> 与现金激励（另计，Activity 权重 20%）</p>
      <div class="pc-row">
        <span>🎭</span>
        <div style="flex:1">
          <div style="font-weight:600">伦敦咖啡馆社交局 · 07/12</div>
          <div style="font-size:13px;color:var(--as-muted)">已报名 · 预计积分 ×2</div>
        </div>
        <span class="pc-badge upcoming">待参与</span>
      </div>
      <router-link to="/teacher/activities" class="apply-link">+ 申请新的文化活动</router-link>
    </div>

    <div class="pc-panel as-glass">
      <h3>今日课程 Today's Classes</h3>
      <div v-for="cls in todayClassesList" :key="cls.id" class="pc-row">
        <div style="min-width:70px;text-align:center">
          <div style="font-weight:600;color:var(--as-navy)">{{ cls.startTime }}</div>
          <div style="font-size:11px;color:var(--as-muted)">{{ cls.duration }}分钟</div>
        </div>
        <div style="flex:1">
          <div style="font-weight:600">{{ cls.studentName }}</div>
          <div style="font-size:13px;color:var(--as-muted)">{{ cls.topic }}</div>
        </div>
        <button class="pc-btn-sm" @click="startClass(cls.id)">开始上课</button>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import { TEACHER_NAV } from '@/data/portal-nav'
import { SCORE_WEIGHTS, calcCompositeScore, compositeToTier, generateCertSerial, CERT_STATUS, RATING_SAMPLE_HINT_ZH } from '@/data/teacher-cert'
import { calcDemoPoolCommission } from '@/data/commission-demo'
import { getUserInfo } from '@/utils/auth'

const teacherName = computed(() => getUserInfo()?.nickname || 'Aaron Smith')
const teacherId = computed(() => getUserInfo()?.id || 3001)
const certSerial = computed(() => generateCertSerial(Number(teacherId.value)))
const compositeScore = calcCompositeScore()
const certTier = computed(() => compositeToTier(compositeScore))
const poolCommission = computed(() => calcDemoPoolCommission(certTier.value.tier.id))

const stats = [
  { icon: '📚', value: '156', label: '总学生数' },
  { icon: '⏱️', value: '2340', label: '累计课时' },
  { icon: '🎭', value: '6', label: '文化活动' },
  { icon: '💰', value: '¥12,500', label: '本月收入' },
]

const todayClassesList = [
  { id: 1, startTime: '09:00', duration: 45, studentName: '张同学', topic: '雅思口语 Part1 练习' },
  { id: 2, startTime: '14:30', duration: 60, studentName: '李同学', topic: '商务英语会议模拟' },
]

function startClass(id: number) {
  showToast(`课程 #${id} 已开始`)
}
</script>

<style scoped>
.cert-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 28px;
  margin-bottom: 24px;
}
.cert-card h2 { font-size: 22px; color: var(--as-navy); margin-bottom: 8px; }
.cert-badge {
  display: inline-block; padding: 4px 12px; border-radius: 100px;
  background: rgba(61,106,154,0.15); color: var(--as-blue-soft); font-size: 12px; margin-bottom: 12px;
}
.cert-serial code {
  font-family: monospace; font-size: 15px; font-weight: 700; color: var(--as-navy);
  letter-spacing: 1px;
}
.serial-label { font-size: 11px; color: var(--as-muted); display: block; margin-bottom: 4px; }
.cert-note, .cert-valid { font-size: 12px; color: var(--as-muted); margin-top: 6px; }
.rating-hint { font-size: 11px; color: var(--as-muted); margin-top: 8px; line-height: 1.4; }
.tier-pool { font-size: 11px; color: var(--as-blue-soft); margin-top: 6px; text-align: center; }
.composite { font-size: 42px; font-weight: 800; color: var(--as-navy); text-align: center; }
.composite-label { font-size: 11px; color: var(--as-muted); text-align: center; }
.score-row {
  display: grid;
  grid-template-columns: 140px 1fr 40px 36px;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 13px;
}
.score-label .en { font-size: 10px; color: var(--as-muted-light); display: block; }
.score-bar-wrap { height: 8px; background: rgba(12,26,46,0.06); border-radius: 4px; overflow: hidden; }
.score-bar { height: 100%; background: linear-gradient(90deg, var(--as-blue-soft), var(--as-navy)); border-radius: 4px; }
.score-weight { color: var(--as-muted); font-size: 12px; }
.score-val { font-weight: 700; color: var(--as-navy); }
.reward-hint { font-size: 13px; color: var(--as-muted); margin-bottom: 14px; }
.reward-hint strong { color: #000; }
.apply-link {
  display: inline-block; margin-top: 14px; font-size: 13px; font-weight: 600;
  color: var(--as-blue-soft); text-decoration: none;
}
@media (max-width: 768px) {
  .cert-card { grid-template-columns: 1fr; text-align: center; }
  .score-row { grid-template-columns: 1fr; }
}
</style>

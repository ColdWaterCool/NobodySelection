<template>
  <PortalLayout
    page-title="学习概览"
    page-title-en="Dashboard"
    role-label="学生 Student"
    avatar="🎓"
    :nav-items="navItems"
  >
    <div v-if="alsoParent" class="bind-banner as-glass parent-link">
      <span>您已开启家长视图，可管理孩子课时与学情</span>
      <router-link to="/parent">进入家长中心 →</router-link>
    </div>

    <div v-if="isMinor" class="bind-banner as-glass">
      <span>🔗 已与家长 <strong>{{ parentName }}</strong> 绑定 · 课时由家长账户购买与管理</span>
    </div>

    <div class="tier-banner as-glass">
      <div>
        <span class="tier-badge" :style="{ background: currentTier.color }">{{ currentTier.labelZh }}</span>
        <span class="tier-en">{{ currentTier.labelEn }}</span>
        <h2>欢迎回来，{{ userName }}！</h2>
        <p v-if="nicknameFromDb" class="db-field-hint">昵称来自数据库 users.nickname（联调试点）</p>
        <p>已完成 <strong>{{ completedClasses }}</strong> 节课 · 可用兑换名额 <strong>{{ credits }}</strong> 次</p>
      </div>
      <div class="tier-progress">
        <div class="ring">{{ completedClasses }}</div>
        <span>累计课时</span>
      </div>
    </div>

    <div class="pc-panel as-glass" style="margin-bottom:24px">
      <h3>学习目标 & 奖励 Goals & Rewards</h3>
      <div v-for="g in STUDENT_GOALS" :key="g.id" class="goal-row">
        <div style="flex:1">
          <div style="font-weight:600">{{ g.titleZh }} <span class="en">{{ g.titleEn }}</span></div>
          <div class="goal-bar-wrap">
            <div class="goal-bar" :style="{ width: Math.min(100, (g.current / g.target) * 100) + '%' }"></div>
          </div>
          <div style="font-size:12px;color:var(--as-muted)">{{ g.current }} / {{ g.target }}</div>
        </div>
        <div class="goal-reward">
          <span>🎁</span>
          <span>{{ g.rewardZh }}</span>
        </div>
      </div>
      <p class="split-note">{{ REWARD_SPLIT.labelZh }}</p>
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

    <div class="pc-grid">
      <div class="pc-panel as-glass">
        <h3>近期课程</h3>
        <div v-for="c in classes" :key="c.time" class="pc-row">
          <div style="min-width:60px;text-align:center">
            <div style="font-weight:600">{{ c.time }}</div>
            <div style="font-size:11px;color:var(--as-muted)">{{ c.date }}</div>
          </div>
          <div style="flex:1">
            <div style="font-weight:600">{{ c.teacher }}</div>
            <div style="font-size:13px;color:var(--as-muted)">{{ c.topic }}</div>
          </div>
          <span class="pc-badge" :class="c.status">{{ c.statusText }}</span>
        </div>
      </div>
      <div class="pc-panel as-glass">
        <h3>文化沉浸 · 兑换名额</h3>
        <p class="culture-desc">{{ CULTURE_PROGRAM.studentRuleZh }}</p>
        <div class="culture-progress">
          <div class="cp-bar"><div class="cp-fill" :style="{ width: (completedClasses % 10) * 10 + '%' }"></div></div>
          <span>进度 {{ completedClasses % 10 }} / 10 节</span>
        </div>
        <p class="credit-line">可用名额：<strong>{{ credits }}</strong> · {{ CULTURE_PROGRAM.creditValidityZh }}</p>
        <router-link to="/student/records" class="records-link">查看活动场次与 AS-Badge →</router-link>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getRedemptionCredits } from '@/data/culture-redemption'
import PortalLayout from '@/components/PortalLayout.vue'
import { getStudentNav } from '@/data/portal-nav'
import { STUDENT_GOALS, REWARD_SPLIT, getCurrentTier } from '@/data/student-tier'
import { CULTURE_PROGRAM } from '@/data/culture-program'
import { getUserInfo, isDemoToken } from '@/utils/auth'
import { getCurrentUser } from '@/api/auth'

const userInfo = computed(() => getUserInfo())
const dbNickname = ref<string | null>(null)
const nicknameFromDb = ref(false)

const navItems = computed(() => getStudentNav(userInfo.value?.learnerType))
const isMinor = computed(() => userInfo.value?.learnerType === 'minor')
const alsoParent = computed(() => userInfo.value?.alsoParent)
const parentName = computed(() => userInfo.value?.parentName || '家长')
const userName = computed(() => {
  // 联调试点：仅 nickname 在真实 JWT 时读库；Demo token 仍用 localStorage 昵称
  if (nicknameFromDb.value && dbNickname.value) return dbNickname.value
  return userInfo.value?.nickname || '张同学'
})

/** 联调试点：GET /auth/me 读 users.nickname。isDemoToken() 时直接跳过，不影响 Demo */
async function loadNicknameFromApi() {
  if (isDemoToken()) return
  try {
    const me = (await getCurrentUser()) as { nickname?: string }
    if (me?.nickname) {
      dbNickname.value = me.nickname
      nicknameFromDb.value = true
    }
  } catch {
    nicknameFromDb.value = false
  }
}

const completedClasses = 12
const credits = ref(getRedemptionCredits())
onMounted(() => {
  credits.value = getRedemptionCredits()
  loadNicknameFromApi()
})
const currentTier = computed(() => getCurrentTier(completedClasses))

const stats = [
  { icon: '⏱️', value: '28', label: '剩余课时' },
  { icon: '✅', value: String(completedClasses), label: '已完成课程' },
  { icon: '🎭', value: String(credits.value), label: '兑换名额' },
  { icon: '⭐', value: '4.8', label: '平均评分' },
]

const classes = [
  { time: '09:00', date: '今天', teacher: 'Aaron Smith', topic: '雅思口语 Part1', status: 'upcoming', statusText: '即将开始' },
  { time: '14:30', date: '明天', teacher: 'Sarah Johnson', topic: '商务英语写作', status: 'scheduled', statusText: '已安排' },
]
</script>

<style scoped>
.bind-banner {
  padding: 12px 20px; margin-bottom: 16px; font-size: 13px; color: var(--as-muted);
}
.bind-banner strong { color: var(--as-navy); }
.parent-link {
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;
}
.parent-link a { font-size: 13px; font-weight: 600; color: var(--as-blue-soft); text-decoration: none; }
.tier-banner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 24px 28px; margin-bottom: 24px;
}
.tier-badge {
  display: inline-block; padding: 4px 12px; border-radius: 100px;
  color: #fff; font-size: 12px; font-weight: 600; margin-right: 8px;
}
.tier-en { font-size: 11px; color: var(--as-muted-light); }
.tier-banner h2 { font-size: 20px; color: var(--as-navy); margin: 10px 0 6px; }
.db-field-hint {
  font-size: 11px;
  color: var(--as-blue-soft);
  margin: 0 0 6px;
}
.tier-banner p { font-size: 13px; color: var(--as-muted); }
.tier-banner strong { color: #000; }
.ring {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, var(--as-navy), var(--as-blue-soft));
  color: #fff; font-size: 24px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}
.tier-progress { text-align: center; font-size: 11px; color: var(--as-muted); }
.goal-row {
  display: flex; gap: 16px; align-items: center;
  padding: 14px 0; border-bottom: 1px solid var(--as-border);
}
.goal-row:last-child { border-bottom: none; }
.goal-bar-wrap { height: 6px; background: rgba(12,26,46,0.06); border-radius: 3px; margin: 8px 0 4px; }
.goal-bar { height: 100%; background: var(--as-blue-soft); border-radius: 3px; }
.goal-reward { font-size: 12px; color: var(--as-blue-soft); text-align: right; min-width: 140px; }
.goal-reward span { display: block; }
.en { font-size: 11px; color: var(--as-muted-light); }
.split-note { font-size: 12px; color: var(--as-muted); margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--as-border); }
.culture-progress { display: flex; align-items: center; gap: 12px; }
.cp-bar { flex: 1; height: 10px; background: rgba(12,26,46,0.06); border-radius: 5px; }
.cp-fill { height: 100%; background: var(--as-navy); border-radius: 5px; }
.culture-desc { font-size: 13px; color: var(--as-muted); margin-bottom: 12px; line-height: 1.5; }
.credit-line { font-size: 13px; margin-top: 12px; color: var(--as-muted); }
.credit-line strong { color: var(--as-navy); }
.records-link { display: inline-block; margin-top: 12px; font-size: 13px; font-weight: 600; color: var(--as-blue-soft); text-decoration: none; }
</style>

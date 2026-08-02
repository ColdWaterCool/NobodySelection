<template>
  <PortalLayout
    page-title="学习记录"
    page-title-en="Records"
    role-label="学生 Student"
    avatar="🎓"
    :nav-items="navItems"
  >
    <div class="records-wrap">
      <div v-if="hasBadge" class="badge-card as-glass">
        <span class="badge-label">AS-Badge</span>
        <h2>CredMatch学习凭证</h2>
        <p class="badge-meta">教师 Aaron Smith · 认证 AS-2026-GZ-00001 · 综合表现 88</p>
        <p class="badge-note">CredMatch · 结课学习凭证</p>
      </div>

      <div class="panel as-glass">
        <h3>活动兑换名额</h3>
        <p>可用 <strong>{{ credits }}</strong> 次 · {{ CULTURE_PROGRAM.creditValidityZh }}</p>
      </div>

      <div class="panel as-glass">
        <h3>可报名场次</h3>
        <div v-for="ev in events" :key="ev.id" class="event-row">
          <div>
            <strong>{{ ev.titleZh }}</strong>
            <p>{{ ev.date }} · {{ ev.venueZh }} · 剩余 {{ ev.remaining }}/{{ ev.slots }}</p>
          </div>
          <button :disabled="ev.remaining < 1 || credits < 1" @click="book(ev.id)">报名</button>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import { getStudentNav } from '@/data/portal-nav'
import { CULTURE_PROGRAM, CULTURE_EVENTS } from '@/data/culture-program'
import { getRedemptionCredits, getEventRemainingSlots, signupCultureEvent } from '@/data/culture-redemption'
import { AS_BADGE_MIN_CLASSES } from '@/data/student-tier'
import { getUserInfo } from '@/utils/auth'

const completedClasses = 32
const hasBadge = completedClasses >= AS_BADGE_MIN_CLASSES
const credits = ref(getRedemptionCredits())
const userInfo = computed(() => getUserInfo())
const navItems = computed(() => getStudentNav(userInfo.value?.learnerType))

const events = ref(
  CULTURE_EVENTS.map((e) => ({
    ...e,
    remaining: getEventRemainingSlots(e.id),
  })),
)

function refresh() {
  credits.value = getRedemptionCredits()
  events.value = CULTURE_EVENTS.map((e) => ({
    ...e,
    remaining: getEventRemainingSlots(e.id),
  }))
}

function book(id: number) {
  const r = signupCultureEvent(id)
  showToast(r.message)
  refresh()
}

onMounted(refresh)
</script>

<style scoped>
.records-wrap { display: flex; flex-direction: column; gap: 20px; max-width: 720px; margin: 0 auto; }
.badge-card { padding: 28px; text-align: center; border: 2px solid var(--as-navy); }
.badge-label { font-size: 12px; font-weight: 800; letter-spacing: 2px; color: var(--as-blue-soft); }
.badge-card h2 { font-size: 22px; color: var(--as-navy); margin: 12px 0 8px; }
.badge-meta { font-size: 14px; color: var(--as-muted); }
.badge-note { font-size: 12px; color: var(--as-muted); margin-top: 12px; }
.panel { padding: 22px; }
.panel h3 { font-size: 16px; color: var(--as-navy); margin-bottom: 12px; }
.event-row {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 14px 0; border-bottom: 1px solid var(--as-border);
}
.event-row p { font-size: 12px; color: var(--as-muted); margin-top: 4px; }
.event-row button {
  padding: 8px 18px; border: none; border-radius: 100px; background: var(--as-navy); color: #fff; cursor: pointer; font-size: 12px;
}
.event-row button:disabled { opacity: 0.4; cursor: not-allowed; }
</style>

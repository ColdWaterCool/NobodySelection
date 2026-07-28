<template>
  <PortalLayout
    page-title="文化活动申请"
    page-title-en="Activity Application"
    role-label="教师 Teacher"
    avatar="👨‍🏫"
    :nav-items="TEACHER_NAV"
  >
    <div class="act-wrap">
      <div class="pc-panel as-glass apply-form">
        <h3>提交新活动申请</h3>
        <p class="hint">认证教师可申请主持文化沉浸活动 · 通过后获双倍积分与现金激励</p>
        <div class="form-grid">
          <label>
            <span>活动主题</span>
            <select v-model="form.eventTitleZh">
              <option v-for="e in CULTURE_EVENTS" :key="e.id" :value="e.titleZh">
                {{ e.titleZh }}
              </option>
            </select>
          </label>
          <label>
            <span>拟定日期</span>
            <input v-model="form.proposedDate" type="date" />
          </label>
          <label>
            <span>场地</span>
            <input v-model="form.venueZh" placeholder="合作文化空间" />
          </label>
          <label>
            <span>名额</span>
            <input v-model.number="form.slots" type="number" min="4" max="20" />
          </label>
          <label class="full">
            <span>扮演角色</span>
            <input v-model="form.roleZh" placeholder="如：咖啡馆店长、商务谈判甲方" />
          </label>
        </div>
        <button class="pc-btn-sm" style="margin-top:14px;padding:10px 24px" @click="handleSubmit">
          提交申请
        </button>
      </div>

      <div class="pc-panel as-glass">
        <h3>我的申请记录</h3>
        <div v-for="a in myApps" :key="a.id" class="pc-row">
          <div style="flex:1">
            <div style="font-weight:600">{{ a.eventTitleZh }}</div>
            <div style="font-size:12px;color:var(--as-muted)">
              {{ a.proposedDate }} · {{ a.venueZh }} · 角色：{{ a.roleZh }}
            </div>
          </div>
          <span class="pc-badge" :class="a.status">{{ a.statusZh }}</span>
        </div>
        <p v-if="!myApps.length" class="empty">暂无申请，提交后将同步至管理员审批</p>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import { TEACHER_NAV } from '@/data/portal-nav'
import { CULTURE_EVENTS } from '@/data/culture-program'
import { loadApplications, submitApplication } from '@/data/activity-applications'
import { getUserInfo } from '@/utils/auth'

const teacherName = computed(() => getUserInfo()?.nickname || 'Aaron Smith')
const teacherId = computed(() => getUserInfo()?.id || 3001)
const apps = ref(loadApplications())

const myApps = computed(() => apps.value.filter((a) => a.teacherId === teacherId.value))

const form = ref({
  eventTitleZh: CULTURE_EVENTS[0]?.titleZh || '',
  proposedDate: '2026-08-15',
  venueZh: '天河文化空间',
  slots: 10,
  roleZh: '',
})

onMounted(() => { apps.value = loadApplications() })

function handleSubmit() {
  if (!form.value.roleZh.trim()) {
    showToast('请填写扮演角色')
    return
  }
  const event = CULTURE_EVENTS.find((e) => e.titleZh === form.value.eventTitleZh)
  submitApplication({
    teacherId: Number(teacherId.value),
    teacherName: teacherName.value,
    eventTitleZh: form.value.eventTitleZh,
    eventTitleEn: event?.titleEn || '',
    venueZh: form.value.venueZh,
    proposedDate: form.value.proposedDate,
    slots: form.value.slots,
    roleZh: form.value.roleZh,
  })
  apps.value = loadApplications()
  form.value.roleZh = ''
  showToast('活动申请已提交，等待管理员审批')
}
</script>

<style scoped>
.act-wrap { max-width: 720px; }
.apply-form { margin-bottom: 20px; }
.hint { font-size: 13px; color: var(--as-muted); margin-bottom: 16px; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-grid label { display: flex; flex-direction: column; gap: 6px; }
.form-grid label.full { grid-column: 1 / -1; }
.form-grid span { font-size: 12px; font-weight: 600; color: var(--as-navy); }
.form-grid input, .form-grid select {
  padding: 10px; border: 1px solid var(--as-border); border-radius: 8px; font-size: 14px;
}
.empty { font-size: 13px; color: var(--as-muted); text-align: center; padding: 20px; }
@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
</style>

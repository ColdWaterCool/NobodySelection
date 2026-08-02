<template>
  <div class="admin-activities">
    <div class="toolbar as-glass">
      <span>待审批 <strong>{{ pendingCount }}</strong> 条</span>
      <div class="toolbar-btns">
        <button :disabled="!selected.length" @click="bulkApprove">批量通过 ({{ selected.length }})</button>
        <button class="reject" :disabled="!selected.length" @click="bulkReject">批量驳回</button>
      </div>
    </div>

    <div class="table-card">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" :checked="allPendingSelected" @change="toggleAll" /></th>
            <th>申请编号</th>
            <th>教师</th>
            <th>活动</th>
            <th>日期 / 场地</th>
            <th>角色</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in apps" :key="a.id">
            <td>
              <input
                v-if="a.status === 'pending'"
                type="checkbox"
                :checked="selected.includes(a.id)"
                @change="toggleOne(a.id)"
              />
            </td>
            <td>{{ a.id }}</td>
            <td>{{ a.teacherName }}</td>
            <td>
              <div>{{ a.eventTitleZh }}</div>
              <div class="sub">{{ a.eventTitleEn }}</div>
            </td>
            <td>{{ a.proposedDate }}<br><span class="sub">{{ a.venueZh }} · {{ a.slots }}人</span></td>
            <td>{{ a.roleZh }}</td>
            <td><span class="status-tag" :class="a.status">{{ a.statusZh }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-card" style="margin-top:24px">
      <h3>已发布活动场次（学员兑换报名）</h3>
      <table>
        <thead>
          <tr><th>活动</th><th>日期</th><th>名额</th><th>最低开班</th><th>状态</th></tr>
        </thead>
        <tbody>
          <tr v-for="e in publishedEvents" :key="e.id">
            <td>{{ e.titleZh }}</td>
            <td>{{ e.date }}</td>
            <td>{{ e.slots }}</td>
            <td>{{ CULTURE_PROGRAM.minClassSize }} 人</td>
            <td><span class="status-tag approved">开放报名</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { showToast } from 'vant'
import { loadApplications, bulkUpdateStatus, type ActivityApplication } from '@/data/activity-applications'
import { CULTURE_PROGRAM, CULTURE_EVENTS } from '@/data/culture-program'

const publishedEvents = CULTURE_EVENTS

const apps = ref<ActivityApplication[]>([])
const selected = ref<string[]>([])

const pendingCount = computed(() => apps.value.filter((a) => a.status === 'pending').length)
const pendingIds = computed(() => apps.value.filter((a) => a.status === 'pending').map((a) => a.id))
const allPendingSelected = computed(() =>
  pendingIds.value.length > 0 && pendingIds.value.every((id) => selected.value.includes(id)),
)

onMounted(() => { apps.value = loadApplications() })

function toggleOne(id: string) {
  const i = selected.value.indexOf(id)
  if (i >= 0) selected.value.splice(i, 1)
  else selected.value.push(id)
}

function toggleAll(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  selected.value = checked ? [...pendingIds.value] : []
}

function bulkApprove() {
  apps.value = bulkUpdateStatus(selected.value, 'approved')
  selected.value = []
  showToast('已批量通过')
}

function bulkReject() {
  apps.value = bulkUpdateStatus(selected.value, 'rejected')
  selected.value = []
  showToast('已批量驳回')
}
</script>

<style scoped>
.toolbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; margin-bottom: 20px;
}
.toolbar strong { color: var(--as-navy); font-size: 18px; }
.toolbar-btns { display: flex; gap: 10px; }
.toolbar-btns button {
  padding: 8px 18px; border: none; border-radius: 100px;
  background: var(--as-navy); color: #fff; font-size: 13px; cursor: pointer;
}
.toolbar-btns button.reject { background: #c62828; }
.toolbar-btns button:disabled { opacity: 0.4; cursor: not-allowed; }
.table-card {
  background: var(--as-glass); border-radius: var(--as-radius);
  padding: 24px; border: 1px solid var(--as-glass-border);
}
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid var(--as-border); font-size: 14px; }
th { color: var(--as-muted); font-weight: 500; }
.sub { font-size: 11px; color: var(--as-muted-light); }
.status-tag { padding: 4px 10px; border-radius: 100px; font-size: 12px; }
.status-tag.pending { background: #fff3e0; color: #f57c00; }
.status-tag.approved { background: #e8f5e9; color: #2e7d32; }
.status-tag.rejected { background: #ffebee; color: #c62828; }
</style>

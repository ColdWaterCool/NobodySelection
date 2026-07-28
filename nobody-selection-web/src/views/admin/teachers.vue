<template>
  <div class="admin-page">
    <div class="tabs as-glass">
      <button :class="{ active: tab === 'pending' }" @click="tab = 'pending'">待审核 ({{ pending.length }})</button>
      <button :class="{ active: tab === 'approved' }" @click="tab = 'approved'">已通过</button>
      <button :class="{ active: tab === 'watch' }" @click="tab = 'watch'">观察池 ({{ watchList.length }})</button>
    </div>
    <div class="teacher-list">
      <div v-for="t in displayList" :key="t.id" class="teacher-card as-glass">
        <div class="t-head">
          <span class="avatar">{{ t.avatar }}</span>
          <div>
            <strong>{{ t.name }}</strong>
            <p>{{ t.nationality }} · {{ t.specialty }} · 认证分 {{ t.certScore }}</p>
          </div>
          <span class="status-tag" :class="t.poolStatus || t.status">{{ statusLabel(t) }}</span>
        </div>
        <p class="t-bio">{{ t.bio }}</p>
        <div v-if="t.anomaly" class="anomaly">⚠ {{ t.anomaly }}</div>
        <div v-if="t.status === 'pending'" class="t-actions">
          <button @click="approve(t.id)">通过</button>
          <button class="reject" @click="reject(t.id)">驳回</button>
        </div>
        <div v-else-if="t.status === 'approved'" class="t-actions">
          <button v-if="t.poolStatus !== 'watch'" class="warn" @click="toWatch(t.id)">进入观察池</button>
          <button v-else @click="outWatch(t.id)">移出观察池</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'

type PoolStatus = 'normal' | 'watch' | 'frozen'

const tab = ref('pending')

const teachers = ref([
  { id: 1, name: 'Emma Brown', avatar: '👩‍🏫', nationality: '加拿大', specialty: '幼儿启蒙', bio: '5年幼儿英语教学经验，持有 TESOL 证书。', status: 'pending', certScore: 48, poolStatus: 'normal' as PoolStatus, anomaly: '' },
  { id: 2, name: 'Michael Lee', avatar: '👨‍🏫', nationality: '美国', specialty: '雅思写作', bio: 'Former IELTS examiner, 8 years experience.', status: 'pending', certScore: 55, poolStatus: 'normal' as PoolStatus, anomaly: '' },
  { id: 3, name: 'Aaron Smith', avatar: '👨‍🏫', nationality: '英国', specialty: '雅思口语', bio: 'Gold certified, founder reviewed.', status: 'approved', certScore: 91, poolStatus: 'normal' as PoolStatus, anomaly: '' },
  { id: 4, name: 'Michael Brown', avatar: '👨‍🏫', nationality: '加拿大', specialty: '少儿英语', bio: '新入驻教师，样本评价不足。', status: 'approved', certScore: 52, poolStatus: 'watch' as PoolStatus, anomaly: '疑似异常评价簇，待复核' },
])

const pending = computed(() => teachers.value.filter((t) => t.status === 'pending'))
const watchList = computed(() => teachers.value.filter((t) => t.poolStatus === 'watch'))

const displayList = computed(() => {
  if (tab.value === 'pending') return pending.value
  if (tab.value === 'watch') return watchList.value
  return teachers.value.filter((t) => t.status === 'approved')
})

function statusLabel(t: (typeof teachers.value)[0]) {
  if (t.poolStatus === 'watch') return '观察池'
  if (t.poolStatus === 'frozen') return '已冻结'
  if (t.status === 'pending') return '待审核'
  return '已认证'
}

function approve(id: number) {
  const t = teachers.value.find((x) => x.id === id)
  if (t) t.status = 'approved'
  showToast('教师已通过审核')
}
function reject(id: number) {
  teachers.value = teachers.value.filter((x) => x.id !== id)
  showToast('已驳回')
}
function toWatch(id: number) {
  const t = teachers.value.find((x) => x.id === id)
  if (t) { t.poolStatus = 'watch'; showToast('已进入观察池，首页降权') }
}
function outWatch(id: number) {
  const t = teachers.value.find((x) => x.id === id)
  if (t) { t.poolStatus = 'normal'; showToast('已移出观察池') }
}
</script>

<style scoped>
.admin-page { width: 100%; }
.tabs { display: flex; gap: 8px; padding: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.tabs button {
  padding: 8px 18px; border: none; border-radius: 100px; background: transparent; cursor: pointer; font-size: 13px;
}
.tabs button.active { background: var(--as-navy); color: #fff; }
.teacher-list { display: flex; flex-direction: column; gap: 14px; }
.teacher-card { padding: 20px; }
.t-head { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
.avatar { font-size: 36px; }
.t-head strong { color: var(--as-navy); }
.t-head p { font-size: 12px; color: var(--as-muted); }
.status-tag { margin-left: auto; padding: 4px 10px; border-radius: 100px; font-size: 11px; }
.status-tag.pending { background: #fff3e0; color: #f57c00; }
.status-tag.approved, .status-tag.normal { background: #e8f5e9; color: #2e7d32; }
.status-tag.watch { background: #fff3e0; color: #e65100; }
.status-tag.frozen { background: #ffebee; color: #c62828; }
.t-bio { font-size: 13px; color: var(--as-muted); margin-bottom: 8px; }
.anomaly { font-size: 12px; color: #c62828; background: #ffebee; padding: 8px 12px; border-radius: 8px; margin-bottom: 12px; }
.t-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.t-actions button {
  padding: 8px 18px; border: none; border-radius: 100px; background: var(--as-navy); color: #fff; cursor: pointer; font-size: 12px;
}
.t-actions button.reject { background: #c62828; }
.t-actions button.warn { background: #e65100; }
</style>

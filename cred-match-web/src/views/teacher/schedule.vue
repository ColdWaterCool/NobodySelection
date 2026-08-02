<template>
  <PortalLayout page-title="排课管理" page-title-en="Schedule" role-label="教师 Teacher" avatar="👨‍🏫" :nav-items="TEACHER_NAV">
    <div class="schedule-wrap">
      <div class="week-nav as-glass">
        <button @click="prevWeek">←</button>
        <span>{{ weekLabel }}</span>
        <button @click="nextWeek">→</button>
        <button class="add-btn" @click="showToast('新增排课')">+ 新增排课</button>
      </div>
      <div class="schedule-grid">
        <div v-for="day in weekDays" :key="day.date" class="day-col as-glass">
          <div class="day-head">
            <strong>{{ day.label }}</strong>
            <span>{{ day.date }}</span>
          </div>
          <div v-for="slot in day.slots" :key="slot.id" class="slot" :class="slot.status">
            <span class="slot-time">{{ slot.time }}</span>
            <span class="slot-student">{{ slot.student }}</span>
            <span class="slot-topic">{{ slot.topic }}</span>
          </div>
          <p v-if="!day.slots.length" class="empty">无课程</p>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import { TEACHER_NAV } from '@/data/portal-nav'

const weekOffset = ref(0)
const weekLabel = computed(() => weekOffset.value === 0 ? '本周 · 2026年6月第2周' : '下周')

const weekDays = ref([
  { label: '周一', date: '06/09', slots: [{ id: 1, time: '09:00', student: '张小雨', topic: '雅思口语', status: 'upcoming' }] },
  { label: '周二', date: '06/10', slots: [] },
  { label: '周三', date: '06/11', slots: [{ id: 2, time: '14:30', student: '李成人', topic: '商务英语', status: 'scheduled' }] },
  { label: '周四', date: '06/12', slots: [{ id: 3, time: '10:00', student: '王同学', topic: '启蒙英语', status: 'scheduled' }] },
  { label: '周五', date: '06/13', slots: [] },
  { label: '周六', date: '06/14', slots: [{ id: 4, time: '15:00', student: '文化活动', topic: '咖啡馆社交局', status: 'culture' }] },
  { label: '周日', date: '06/15', slots: [] },
])

function prevWeek() { weekOffset.value--; showToast('上一周') }
function nextWeek() { weekOffset.value++; showToast('下一周') }
</script>

<style scoped>
.week-nav {
  display: flex; align-items: center; gap: 16px; padding: 14px 20px; margin-bottom: 16px;
}
.week-nav button { border: none; background: none; font-size: 18px; cursor: pointer; color: var(--as-navy); }
.week-nav span { flex: 1; font-weight: 600; color: var(--as-navy); }
.add-btn {
  padding: 8px 16px; background: var(--as-navy); color: #fff; border-radius: 100px; font-size: 12px; cursor: pointer;
}
.schedule-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; }
.day-col { padding: 12px; min-height: 180px; }
.day-head { text-align: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid var(--as-border); }
.day-head strong { display: block; font-size: 13px; color: var(--as-navy); }
.day-head span { font-size: 11px; color: var(--as-muted); }
.slot {
  padding: 8px; margin-bottom: 8px; border-radius: 8px; font-size: 11px;
  background: rgba(61,106,154,0.1); border-left: 3px solid var(--as-blue-soft);
}
.slot.culture { border-left-color: #7b1fa2; background: rgba(123,31,162,0.08); }
.slot-time { font-weight: 700; display: block; }
.slot-student { color: var(--as-navy); }
.slot-topic { color: var(--as-muted); display: block; }
.empty { font-size: 11px; color: var(--as-muted-light); text-align: center; margin-top: 20px; }
@media (max-width: 900px) { .schedule-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 500px) { .schedule-grid { grid-template-columns: 1fr; } }
</style>

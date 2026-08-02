<template>
  <PortalLayout page-title="作业管理" page-title-en="Homework" role-label="教师 Teacher" avatar="👨‍🏫" :nav-items="TEACHER_NAV">
    <div class="hw-admin">
      <button class="create-btn" @click="showToast('布置新作业')">+ 布置新作业</button>
      <div class="pc-panel as-glass">
        <h3>已布置作业</h3>
        <table>
          <thead>
            <tr><th>作业</th><th>学员</th><th>截止</th><th>提交</th><th>状态</th><th>操作</th></tr>
          </thead>
          <tbody>
            <tr v-for="h in list" :key="h.id">
              <td>
                <strong>{{ h.title }}</strong>
                <div class="sub">{{ h.titleEn }}</div>
              </td>
              <td>{{ h.student }}</td>
              <td>{{ h.due }}</td>
              <td>{{ h.submitted }}/{{ h.total }}</td>
              <td><span class="status" :class="h.status">{{ h.statusZh }}</span></td>
              <td><button class="link-btn" @click="showToast('批改作业')">批改</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import { TEACHER_NAV } from '@/data/portal-nav'

const list = [
  { id: 1, title: '雅思口语 Part2 录音', titleEn: 'IELTS Speaking', student: '张小雨', due: '06/10', submitted: 0, total: 1, status: 'pending', statusZh: '待提交' },
  { id: 2, title: '商务邮件写作', titleEn: 'Business Email', student: '李成人', due: '06/08', submitted: 1, total: 1, status: 'submitted', statusZh: '待批改' },
  { id: 3, title: '听力精听 TED', titleEn: 'Listening', student: '张小雨', due: '06/05', submitted: 1, total: 1, status: 'graded', statusZh: '已批改 B+' },
]
</script>

<style scoped>
.create-btn {
  margin-bottom: 16px; padding: 10px 20px; background: var(--as-navy); color: #fff;
  border: none; border-radius: 100px; cursor: pointer; font-size: 13px;
}
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px 8px; text-align: left; border-bottom: 1px solid var(--as-border); font-size: 13px; }
th { color: var(--as-muted); font-weight: 500; }
.sub { font-size: 11px; color: var(--as-muted-light); }
.status { padding: 3px 8px; border-radius: 100px; font-size: 11px; }
.status.pending { background: #fff3e0; color: #f57c00; }
.status.submitted { background: #e3f2fd; color: #1565c0; }
.status.graded { background: #e8f5e9; color: #2e7d32; }
.link-btn { border: none; background: none; color: var(--as-blue-soft); cursor: pointer; font-size: 13px; }
</style>

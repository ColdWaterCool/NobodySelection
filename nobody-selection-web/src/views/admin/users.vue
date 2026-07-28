<template>
  <div class="admin-page">
    <div class="toolbar as-glass">
      <input v-model="search" placeholder="搜索用户…" class="search" />
      <select v-model="roleFilter">
        <option value="">全部角色</option>
        <option value="student">学生</option>
        <option value="parent">家长</option>
        <option value="teacher">教师</option>
      </select>
    </div>
    <div class="table-card">
      <table>
        <thead>
          <tr><th>ID</th><th>昵称</th><th>手机</th><th>角色</th><th>状态</th><th>注册</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="u in filtered" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.phone }}</td>
            <td><span class="role-tag" :class="u.role">{{ u.roleZh }}</span></td>
            <td><span class="status active">{{ u.status }}</span></td>
            <td>{{ u.since }}</td>
            <td><button class="link-btn" @click="showToast('查看详情')">详情</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'

const search = ref('')
const roleFilter = ref('')

const users = [
  { id: 1001, name: '张小雨', phone: '138****0001', role: 'student', roleZh: '青少学员', status: '正常', since: '2025-09' },
  { id: 1002, name: '李成人', phone: '138****0011', role: 'student', roleZh: '成年学员', status: '正常', since: '2026-03' },
  { id: 2001, name: '张家长', phone: '138****0002', role: 'parent', roleZh: '家长', status: '正常', since: '2025-09' },
  { id: 3001, name: 'Aaron Smith', phone: '138****0003', role: 'teacher', roleZh: '教师', status: '正常', since: '2025-06' },
]

const filtered = computed(() =>
  users.filter((u) => {
    if (roleFilter.value && u.role !== roleFilter.value) return false
    if (search.value && !u.name.includes(search.value)) return false
    return true
  }),
)
</script>

<style scoped>
.admin-page { width: 100%; }
.toolbar { display: flex; gap: 12px; padding: 14px 20px; margin-bottom: 16px; }
.search { flex: 1; padding: 8px 14px; border: 1px solid var(--as-border); border-radius: 8px; }
.toolbar select { padding: 8px 14px; border: 1px solid var(--as-border); border-radius: 8px; }
.table-card { background: var(--as-glass); border-radius: var(--as-radius); padding: 24px; border: 1px solid var(--as-glass-border); }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid var(--as-border); font-size: 14px; }
th { color: var(--as-muted); }
.role-tag { padding: 3px 8px; border-radius: 100px; font-size: 11px; background: #e3f2fd; color: #1565c0; }
.role-tag.parent { background: #f3e5f5; color: #7b1fa2; }
.role-tag.teacher { background: #fff3e0; color: #f57c00; }
.status.active { color: #2e7d32; font-size: 13px; }
.link-btn { border: none; background: none; color: var(--as-blue-soft); cursor: pointer; }
</style>

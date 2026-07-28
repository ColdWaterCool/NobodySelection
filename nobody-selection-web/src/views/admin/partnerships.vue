<template>
  <div class="admin-partnerships">
    <div class="table-card">
      <h3>首页「与我们同行」提交记录</h3>
      <p class="sub">用户从主页合作表单提交的申请将同步至此</p>
      <table v-if="inquiries.length">
        <thead>
          <tr>
            <th>编号</th>
            <th>机构</th>
            <th>联系人</th>
            <th>类型</th>
            <th>留言</th>
            <th>日期</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="q in inquiries" :key="q.id">
            <td>{{ q.id }}</td>
            <td>{{ q.orgName }}</td>
            <td>{{ q.contactName }}<br><span class="sub">{{ q.phone }}</span></td>
            <td>{{ q.typeZh }}</td>
            <td class="msg">{{ q.message }}</td>
            <td>{{ q.submittedAt }}</td>
            <td><span class="status-tag" :class="q.status">{{ q.status === 'new' ? '新申请' : '已跟进' }}</span></td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty">暂无合作申请，请从首页「与我们同行」提交</p>
    </div>

    <div class="table-card" style="margin-top:24px">
      <h3>B 端服务报价</h3>
      <p class="sub">教师认证授权查询与背景调查 — 按次计费</p>
      <div class="b2b-grid">
        <div v-for="s in b2bServices" :key="s.id" class="b2b-card">
          <strong>{{ s.nameZh }}</strong>
          <p class="sub">{{ s.descZh }}</p>
          <div class="price">¥{{ s.price }} / {{ s.unit }}</div>
        </div>
      </div>
    </div>

    <div class="table-card" style="margin-top:24px">
      <h3>已签约 B 端合作</h3>
      <div class="partner-grid">
        <div v-for="p in PARTNERSHIPS" :key="p.id" class="partner-card">
          <strong>{{ p.nameZh }}</strong>
          <p class="sub">{{ p.descZh }}</p>
          <span class="status-tag active">{{ p.statusZh }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadInquiries } from '@/data/partner-inquiries'
import { PARTNERSHIPS } from '@/data/partnerships'

const inquiries = ref(loadInquiries())

const b2bServices = [
  { id: 1, nameZh: '教师认证授权查询', descZh: '经教师授权，查询 AS 序列号与认证等级快照', price: 88, unit: '次' },
  { id: 2, nameZh: '标准背景调查', descZh: '学历、教龄、平台履约记录摘要', price: 299, unit: '人' },
  { id: 3, nameZh: '机构批量招聘包', descZh: '含 10 次查询 + 3 次背调，适合国际学校', price: 1980, unit: '包' },
]

onMounted(() => { inquiries.value = loadInquiries() })
</script>

<style scoped>
.table-card {
  background: var(--as-glass); border-radius: var(--as-radius);
  padding: 24px; border: 1px solid var(--as-glass-border);
}
.table-card h3 { color: var(--as-navy); margin-bottom: 8px; }
.sub { font-size: 13px; color: var(--as-muted); margin-bottom: 16px; }
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { padding: 12px 8px; border-bottom: 1px solid var(--as-border); text-align: left; }
.msg { max-width: 200px; font-size: 13px; }
.status-tag { padding: 4px 10px; border-radius: 100px; font-size: 11px; background: #e3f2fd; color: #1565c0; }
.status-tag.active { background: #e8f5e9; color: #2e7d32; }
.empty { color: var(--as-muted); font-size: 14px; }
.partner-grid, .b2b-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.partner-card, .b2b-card {
  padding: 16px; border: 1px solid var(--as-border); border-radius: 12px; background: rgba(255,255,255,0.5);
}
.price { font-size: 18px; font-weight: 700; color: var(--as-navy); margin-top: 10px; }
</style>

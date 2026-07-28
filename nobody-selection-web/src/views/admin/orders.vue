<template>
  <div class="admin-page">
    <div class="toolbar as-glass">
      <select v-model="statusFilter">
        <option value="">全部状态</option>
        <option value="paid">已支付</option>
        <option value="pending">待支付</option>
        <option value="refund">退款中</option>
      </select>
      <span class="count">共 {{ filtered.length }} 笔订单</span>
    </div>
    <div class="table-card">
      <table>
        <thead>
          <tr><th>订单号</th><th>用户</th><th>学员</th><th>课时包</th><th>金额</th><th>时间</th><th>状态</th><th>操作</th></tr>
        </thead>
        <tbody>
          <tr v-for="o in filtered" :key="o.id">
            <td>{{ o.id }}</td>
            <td>{{ o.user }}</td>
            <td>{{ o.learner }}</td>
            <td>{{ o.package }}</td>
            <td>¥{{ o.amount }}</td>
            <td>{{ o.date }}</td>
            <td><span class="order-status" :class="o.status">{{ o.statusText }}</span></td>
            <td>
              <button v-if="o.status === 'refund'" class="link-btn" @click="showToast('处理退款')">处理</button>
              <button v-else class="link-btn" @click="showToast('查看详情')">详情</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'

const statusFilter = ref('')

const orders = [
  { id: 'ORD-2025060901', user: '张家长', learner: '张小雨', package: '20课时', amount: 1800, date: '06/09', status: 'paid', statusText: '已支付' },
  { id: 'ORD-2025060802', user: '李成人', learner: '李成人', package: '50课时', amount: 4000, date: '06/08', status: 'paid', statusText: '已支付' },
  { id: 'ORD-2025060703', user: '张家长', learner: '张小雨', package: '5课时', amount: 500, date: '06/07', status: 'pending', statusText: '待支付' },
  { id: 'ORD-2025060504', user: '王家长', learner: '王同学', package: '20课时', amount: 1800, date: '06/05', status: 'refund', statusText: '退款中' },
]

const filtered = computed(() =>
  statusFilter.value ? orders.filter((o) => o.status === statusFilter.value) : orders,
)
</script>

<style scoped>
.admin-page { width: 100%; }
.toolbar { display: flex; align-items: center; gap: 16px; padding: 14px 20px; margin-bottom: 16px; }
.toolbar select { padding: 8px 14px; border: 1px solid var(--as-border); border-radius: 8px; }
.count { font-size: 13px; color: var(--as-muted); }
.table-card { background: var(--as-glass); border-radius: var(--as-radius); padding: 24px; border: 1px solid var(--as-glass-border); }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 12px; text-align: left; border-bottom: 1px solid var(--as-border); font-size: 14px; }
th { color: var(--as-muted); }
.order-status { padding: 4px 10px; border-radius: 12px; font-size: 12px; }
.order-status.paid { background: #e8f5e9; color: #2e7d32; }
.order-status.pending { background: #fff3e0; color: #f57c00; }
.order-status.refund { background: #fce4ec; color: #c62828; }
.link-btn { border: none; background: none; color: var(--as-blue-soft); cursor: pointer; font-size: 13px; }
</style>

<template>
  <div class="admin-page">
    <div class="cms-grid">
      <div class="cms-card as-glass">
        <h3>首页 Banner</h3>
        <div class="preview">CredMatch · 外教资格评定与匹配</div>
        <button @click="showToast('编辑 Banner')">编辑</button>
      </div>
      <div class="cms-card as-glass">
        <h3>文化沉浸区块</h3>
        <p class="desc">当前展示 3 场活动 · 文案来自 culture-program.ts</p>
        <button @click="showToast('编辑文案')">编辑</button>
      </div>
      <div class="cms-card as-glass">
        <h3>金牌讲师展示</h3>
        <p class="desc">首页展示 4 位讲师 · 分类筛选已启用</p>
        <button @click="showToast('管理讲师排序')">管理</button>
      </div>
      <div class="cms-card as-glass">
        <h3>与我们同行</h3>
        <p class="desc">合作申请表单 · 提交同步至合作申请页</p>
        <router-link to="/admin/partnerships" class="link-btn">查看申请 →</router-link>
      </div>
    </div>
    <div class="table-card as-glass">
      <h3>公告管理</h3>
      <div v-for="n in notices" :key="n.id" class="notice-row">
        <span class="notice-title">{{ n.title }}</span>
        <span class="notice-date">{{ n.date }}</span>
        <span :class="n.published ? 'pub' : 'draft'">{{ n.published ? '已发布' : '草稿' }}</span>
        <button class="link-btn" @click="showToast('编辑公告')">编辑</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'

const notices = [
  { id: 1, title: '2026 暑期文化沉浸活动开放预约', date: '2026-06-01', published: true },
  { id: 2, title: '新教师 Emma Brown 入驻审核中', date: '2026-06-08', published: false },
]
</script>

<style scoped>
.admin-page { width: 100%; }
.cms-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px; }
.cms-card { padding: 20px; }
.cms-card h3 { font-size: 15px; color: var(--as-navy); margin-bottom: 10px; }
.preview { padding: 24px; background: linear-gradient(135deg, var(--as-navy), var(--as-blue-soft)); color: #fff; border-radius: 10px; margin-bottom: 12px; font-size: 14px; text-align: center; }
.desc { font-size: 13px; color: var(--as-muted); margin-bottom: 12px; }
.cms-card button {
  padding: 8px 16px; background: var(--as-navy); color: #fff; border: none; border-radius: 100px; cursor: pointer; font-size: 12px;
}
.link-btn { font-size: 13px; color: var(--as-blue-soft); text-decoration: none; font-weight: 600; }
.table-card { padding: 24px; }
.table-card h3 { margin-bottom: 16px; color: var(--as-navy); }
.notice-row { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid var(--as-border); font-size: 14px; }
.notice-title { flex: 1; font-weight: 500; }
.notice-date { font-size: 12px; color: var(--as-muted); }
.pub { color: #2e7d32; font-size: 12px; }
.draft { color: #f57c00; font-size: 12px; }
.link-btn { border: none; background: none; color: var(--as-blue-soft); cursor: pointer; }
@media (max-width: 768px) { .cms-grid { grid-template-columns: 1fr; } }
</style>

<template>
  <PortalLayout
    page-title="家长中心"
    page-title-en="Parent Dashboard"
    role-label="家长 Parent"
    avatar="👨‍👩‍👧"
    :nav-items="PARENT_NAV"
  >
    <div class="child-tabs as-glass">
      <span class="tabs-label">绑定学员 Bound Learners</span>
      <div class="tabs">
        <button
          v-for="c in children"
          :key="c.id"
          :class="{ active: activeChild === c.id }"
          @click="activeChild = c.id"
        >
          {{ c.name }} · {{ c.gradeZh }}
        </button>
      </div>
      <router-link to="/purchase" class="buy-link">为 {{ activeChildName }} 购买课时 →</router-link>
    </div>

    <div class="pc-banner">
      <div>
        <h2>您好，{{ userName }}！</h2>
        <p>孩子 {{ childName }} 本周已完成 {{ weeklyHours }} 课时 · 综合评级 <strong>{{ aiReport.overall }}</strong></p>
      </div>
      <span class="pc-banner-icon">👧</span>
    </div>

    <div class="pc-stats">
      <div v-for="s in stats" :key="s.label" class="pc-stat as-glass">
        <span class="pc-stat-icon">{{ s.icon }}</span>
        <div>
          <div class="pc-stat-value">{{ s.value }}</div>
          <div class="pc-stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- AI 学习分析（模拟） -->
    <div class="ai-panel as-glass">
      <div class="ai-head">
        <span class="ai-badge">AI 学习分析</span>
        <span class="ai-badge-en">AI Insight Report</span>
      </div>
      <div class="ai-grid">
        <div class="ai-block">
          <h4>优势 Strengths</h4>
          <ul>
            <li v-for="s in aiReport.strengths" :key="s">{{ s }}</li>
          </ul>
        </div>
        <div class="ai-block">
          <h4>薄弱 Weaknesses</h4>
          <ul>
            <li v-for="w in aiReport.weaknesses" :key="w">{{ w }}</li>
          </ul>
        </div>
      </div>
      <div class="ai-suggestions">
        <h4>未来学习方案建议 Recommendations</h4>
        <div v-for="(r, i) in aiReport.recommendations" :key="i" class="ai-rec">
          <span class="rec-num">{{ i + 1 }}</span>
          <span>{{ r }}</span>
        </div>
      </div>
    </div>

    <div class="pc-grid">
      <div class="pc-panel as-glass">
        <h3>近期课程</h3>
        <div v-for="c in recentClasses" :key="c.id" class="pc-row">
          <div style="min-width:50px;font-weight:600">{{ c.date }}</div>
          <div style="flex:1">
            <div style="font-weight:600">{{ c.topic }}</div>
            <div style="font-size:13px;color:var(--as-muted)">{{ c.teacher }} · {{ c.duration }}分钟</div>
          </div>
          <span class="pc-badge" :class="c.status">{{ c.statusText }}</span>
        </div>
      </div>
      <div class="pc-panel as-glass">
        <h3>作业 & 课堂状态</h3>
        <div v-for="h in homeworkStatus" :key="h.title" class="pc-row">
          <span>{{ h.icon }}</span>
          <div style="flex:1">
            <div style="font-weight:600">{{ h.title }}</div>
            <div style="font-size:12px;color:var(--as-muted)">{{ h.status }}</div>
          </div>
          <span :style="{ color: h.color, fontWeight: 600 }">{{ h.score }}</span>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PortalLayout from '@/components/PortalLayout.vue'
import { PARENT_NAV } from '@/data/portal-nav'
import { getUserInfo } from '@/utils/auth'

const userInfo = computed(() => getUserInfo())
const userName = computed(() => userInfo.value?.nickname || '张家长')
const children = computed(() => userInfo.value?.boundChildren || [{ id: 1001, name: '张小雨', age: 12, gradeZh: '初一' }])
const activeChild = ref(children.value[0]?.id || 1001)
const activeChildName = computed(() => children.value.find((c) => c.id === activeChild.value)?.name || '孩子')
const childName = computed(() => activeChildName.value)
const weeklyHours = 4

const stats = [
  { icon: '⏱️', value: '28', label: '剩余课时' },
  { icon: '✅', value: '12', label: '本月已上' },
  { icon: '🤖', value: 'A-', label: 'AI 综合评级' },
  { icon: '📅', value: '3', label: '本周课程' },
]

const aiReport = {
  overall: 'A-',
  strengths: ['口语反应速度较快，课堂参与积极', '词汇量在同龄学员中排名前 20%', '作业按时提交率 100%'],
  weaknesses: ['学术写作结构层次需加强', '长句听力细节抓取不稳定', '部分发音连读仍需纠正'],
  recommendations: [
    '未来 4 周增加每周 1 节雅思写作专项课',
    '推荐 Sarah Johnson 商务场景口语巩固连贯性',
    '完成 10 节课后预约「伦敦咖啡馆」文化沉浸活动',
    '学习基金（15%）可用于兑换文化沉浸活动名额',
  ],
}

const recentClasses = [
  { id: 1, date: '今天', topic: '雅思口语练习', teacher: 'Aaron Smith', duration: 45, status: 'done', statusText: '已完成' },
  { id: 2, date: '明天', topic: '阅读理解', teacher: 'Sarah Johnson', duration: 60, status: 'upcoming', statusText: '待上课' },
]

const homeworkStatus = [
  { icon: '📝', title: '口语录音作业', status: '已提交 · 教师已批改', score: 'B+', color: 'var(--as-blue-soft)' },
  { icon: '📖', title: '阅读理解', status: '进行中 · 截止明天', score: '—', color: 'var(--as-muted)' },
  { icon: '🎧', title: '听力精听', status: '课堂表现优秀', score: 'A', color: '#2e7d32' },
]
</script>

<style scoped>
.child-tabs { padding: 16px 20px; margin-bottom: 20px; }
.tabs-label { font-size: 12px; font-weight: 600; color: var(--as-navy); display: block; margin-bottom: 10px; }
.tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.tabs button {
  padding: 8px 16px; border: 1px solid var(--as-border); border-radius: 100px;
  background: rgba(255,255,255,0.5); font-size: 13px; cursor: pointer;
}
.tabs button.active { background: var(--as-navy); color: #fff; border-color: var(--as-navy); }
.buy-link { display: inline-block; margin-top: 12px; font-size: 13px; color: var(--as-blue-soft); text-decoration: none; font-weight: 600; }
.ai-panel { padding: 24px; margin-bottom: 24px; }
.ai-head { margin-bottom: 16px; }
.ai-badge {
  display: inline-block; padding: 4px 12px; border-radius: 100px;
  background: linear-gradient(135deg, var(--as-navy), var(--as-blue-soft));
  color: #fff; font-size: 12px; font-weight: 600;
}
.ai-badge-en { font-size: 11px; color: var(--as-muted-light); margin-left: 8px; }
.ai-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.ai-block h4 { font-size: 14px; color: var(--as-navy); margin-bottom: 8px; }
.ai-block ul { margin: 0 0 0 18px; font-size: 13px; color: var(--as-muted); }
.ai-block li { margin-bottom: 6px; }
.ai-suggestions h4 { font-size: 14px; color: var(--as-navy); margin-bottom: 12px; }
.ai-rec {
  display: flex; gap: 12px; padding: 10px 12px; margin-bottom: 8px;
  background: rgba(255,255,255,0.45); border-radius: 8px; font-size: 13px;
}
.rec-num {
  width: 22px; height: 22px; border-radius: 50%; background: var(--as-navy);
  color: #fff; font-size: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ai-disclaimer { font-size: 11px; color: var(--as-muted-light); margin-top: 14px; }
@media (max-width: 768px) { .ai-grid { grid-template-columns: 1fr; } }
</style>

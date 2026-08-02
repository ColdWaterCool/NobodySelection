<template>
  <PortalLayout
    page-title="作业详情"
    page-title-en="Homework Detail"
    role-label="学生 Student"
    avatar="🎓"
    :nav-items="navItems"
  >
    <div v-if="detail" class="hw-detail">
      <router-link to="/student/homework" class="back-link">← 返回作业中心</router-link>

      <div class="pc-panel as-glass">
        <h3>{{ homework?.titleZh }}</h3>
        <p class="en">{{ homework?.titleEn }}</p>
        <p class="brief">{{ detail.briefZh }}</p>
        <p class="en brief">{{ detail.briefEn }}</p>
        <ul class="req-list">
          <li v-for="r in detail.requirements" :key="r">{{ r }}</li>
        </ul>
      </div>

      <div class="pc-panel as-glass">
        <h3>提交作业 Submit</h3>
        <textarea v-model="submission" placeholder="输入作业内容，或描述已上传的录音/文件…" rows="5" />
        <button class="submit-btn" :disabled="submitting" @click="handleSubmit">
          {{ submitting ? '提交中…' : '提交作业' }}
        </button>
        <p v-if="submitted" class="submit-ok">✓ 已提交，教师将批改 · AI 分析已更新</p>
      </div>

      <div class="ai-panel as-glass">
        <div class="ai-head">
          <span class="ai-badge">个人 AI 学情分析</span>
          <span class="ai-grade">{{ detail.aiInsight.overall }}</span>
        </div>
        <div class="ai-grid">
          <div class="ai-block">
            <h4>优势</h4>
            <ul><li v-for="s in detail.aiInsight.strengths" :key="s">{{ s }}</li></ul>
          </div>
          <div class="ai-block">
            <h4>薄弱</h4>
            <ul><li v-for="w in detail.aiInsight.weaknesses" :key="w">{{ w }}</li></ul>
          </div>
        </div>
        <div class="ai-suggestions">
          <h4>针对本作业的建议</h4>
          <div v-for="(s, i) in detail.aiInsight.suggestions" :key="i" class="ai-rec">
            <span class="rec-num">{{ i + 1 }}</span><span>{{ s }}</span>
          </div>
        </div>
        <div class="vocab-block">
          <h4>推荐词汇</h4>
          <span v-for="v in detail.aiInsight.vocabulary" :key="v" class="vocab-tag">{{ v }}</span>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import { getStudentNav } from '@/data/portal-nav'
import { HOMEWORK_LIST, HOMEWORK_DETAILS } from '@/data/homework'
import { getUserInfo } from '@/utils/auth'

const route = useRoute()
const submission = ref('')
const submitting = ref(false)
const submitted = ref(false)

const userInfo = computed(() => getUserInfo())
const navItems = computed(() => getStudentNav(userInfo.value?.learnerType))
const homeworkId = computed(() => Number(route.params.id))
const homework = computed(() => HOMEWORK_LIST.find((h) => h.id === homeworkId.value))
const detail = computed(() => HOMEWORK_DETAILS[homeworkId.value])

function handleSubmit() {
  if (!submission.value.trim()) {
    showToast('请先填写或描述作业内容')
    return
  }
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
    showToast('作业已提交')
  }, 600)
}
</script>

<style scoped>
.hw-detail { max-width: 720px; }
.back-link { display: inline-block; font-size: 13px; color: var(--as-blue-soft); margin-bottom: 16px; text-decoration: none; }
.en { font-size: 12px; color: var(--as-muted-light); }
.brief { font-size: 14px; color: var(--as-muted); margin: 10px 0; }
.req-list { margin: 12px 0 0 18px; font-size: 13px; color: var(--as-muted); }
textarea {
  width: 100%; padding: 12px; border: 1px solid var(--as-border); border-radius: 10px;
  font-size: 14px; resize: vertical; margin-bottom: 12px; font-family: inherit;
}
.submit-btn {
  padding: 10px 24px; background: var(--as-navy); color: #fff; border: none;
  border-radius: 100px; cursor: pointer; font-size: 14px;
}
.submit-ok { font-size: 13px; color: #2e7d32; margin-top: 10px; }
.ai-panel { padding: 24px; margin-top: 20px; }
.ai-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.ai-badge {
  padding: 4px 12px; border-radius: 100px;
  background: linear-gradient(135deg, var(--as-navy), var(--as-blue-soft));
  color: #fff; font-size: 12px; font-weight: 600;
}
.ai-grade { font-size: 18px; font-weight: 700; color: var(--as-navy); }
.ai-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.ai-block h4 { font-size: 14px; color: var(--as-navy); margin-bottom: 8px; }
.ai-block ul { margin: 0 0 0 18px; font-size: 13px; color: var(--as-muted); }
.ai-suggestions h4 { font-size: 14px; color: var(--as-navy); margin-bottom: 10px; }
.ai-rec {
  display: flex; gap: 10px; padding: 8px 12px; margin-bottom: 6px;
  background: rgba(255,255,255,0.45); border-radius: 8px; font-size: 13px;
}
.rec-num {
  width: 20px; height: 20px; border-radius: 50%; background: var(--as-navy);
  color: #fff; font-size: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.vocab-block { margin-top: 14px; }
.vocab-block h4 { font-size: 13px; color: var(--as-navy); margin-bottom: 8px; }
.vocab-tag {
  display: inline-block; padding: 4px 10px; margin: 0 6px 6px 0;
  background: rgba(61,106,154,0.12); border-radius: 100px; font-size: 12px;
}
.ai-disclaimer { font-size: 11px; color: var(--as-muted-light); margin-top: 12px; }
@media (max-width: 768px) { .ai-grid { grid-template-columns: 1fr; } }
</style>

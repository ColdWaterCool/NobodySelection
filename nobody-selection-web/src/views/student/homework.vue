<template>
  <PortalLayout
    page-title="作业中心"
    page-title-en="Homework"
    role-label="学生 Student"
    avatar="🎓"
    :nav-items="navItems"
  >
    <div class="hw-list">
      <div
        v-for="h in HOMEWORK_LIST"
        :key="h.id"
        class="hw-card as-glass"
        @click="router.push(`/student/homework/${h.id}`)"
      >
        <div class="hw-head">
          <h3>{{ h.titleZh }}</h3>
          <span class="hw-en">{{ h.titleEn }}</span>
        </div>
        <p class="hw-meta">{{ h.teacher }} · 截止 {{ h.dueDate }}</p>
        <div class="hw-foot">
          <span class="pc-badge" :class="h.status">{{ h.statusZh }}</span>
          <span v-if="h.score" class="hw-score">{{ h.score }}</span>
          <span class="hw-arrow">查看 & 提交 →</span>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PortalLayout from '@/components/PortalLayout.vue'
import { getStudentNav } from '@/data/portal-nav'
import { HOMEWORK_LIST } from '@/data/homework'
import { getUserInfo } from '@/utils/auth'

const router = useRouter()
const userInfo = computed(() => getUserInfo())
const navItems = computed(() => getStudentNav(userInfo.value?.learnerType))
</script>

<style scoped>
.hw-list { display: flex; flex-direction: column; gap: 14px; max-width: 720px; }
.hw-card { padding: 20px 24px; cursor: pointer; transition: transform 0.15s; }
.hw-card:hover { transform: translateY(-2px); }
.hw-head h3 { font-size: 16px; color: var(--as-navy); margin-bottom: 4px; }
.hw-en { font-size: 11px; color: var(--as-muted-light); }
.hw-meta { font-size: 13px; color: var(--as-muted); margin: 10px 0; }
.hw-foot { display: flex; align-items: center; gap: 12px; }
.hw-score { font-weight: 700; color: var(--as-blue-soft); }
.hw-arrow { margin-left: auto; font-size: 12px; color: var(--as-blue-soft); }
</style>

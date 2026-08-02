<template>
  <div class="as-page">
    <AppHeader
      show-title
      title-zh="讲师详情"
      title-en="Teacher Profile"
      back-to="/teachers"
      back-label="← 讲师列表 Teachers"
      :show-auth="false"
    />

    <main v-if="teacher" class="as-wrap page-main">
      <div class="detail-card as-glass">
        <div class="detail-head">
          <ImageSlot
            :src="teacher.avatar"
            :alt="teacher.name"
            shape="rounded"
            size="lg"
            placeholder-icon="👨‍🏫"
          />
          <div class="detail-meta">
            <span class="as-eyebrow">GOLD TEACHER · 金牌讲师</span>
            <h1>{{ teacher.name }}</h1>
            <p class="meta">
              {{ teacher.nationalityZh }}
              <span class="as-sep">·</span>
              {{ teacher.nationality }}
            </p>
            <p class="specialty">
              {{ teacher.specialtyZh }}
              <span class="as-sep">·</span>
              {{ teacher.specialty }}
            </p>
            <div class="rating">★ {{ teacher.rating }} · {{ teacher.experienceZh }}</div>
          </div>
        </div>

        <div class="detail-body">
          <div class="cred-block">
            <h3>学历背景 Education</h3>
            <p>{{ teacher.degreeZh }}</p>
            <p class="en">{{ teacher.degree }}</p>
            <p style="margin-top:8px">{{ teacher.universityZh }}</p>
            <p class="en">{{ teacher.university }}</p>
          </div>
        </div>
      </div>
    </main>

    <main v-else class="as-wrap page-main">
      <div class="as-glass pc-stub">
        <p>未找到该讲师信息</p>
        <router-link to="/teachers" class="as-btn-primary">返回列表</router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import { GOLD_TEACHERS } from '@/data/home'

const route = useRoute()
const teacher = computed(() => GOLD_TEACHERS.find((t) => t.id === Number(route.params.id)))
</script>

<style scoped>
.page-main { padding: 32px 28px 64px; }

.detail-card { padding: 32px; border-radius: var(--as-radius-lg); }

.detail-head {
  display: flex;
  gap: 28px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--as-border);
}

.detail-meta h1 {
  font-size: 28px;
  font-weight: 600;
  color: var(--as-navy);
  margin: 8px 0;
}

.meta, .specialty { font-size: 14px; color: var(--as-muted); margin-bottom: 4px; }
.specialty { color: var(--as-blue-soft); }
.rating { font-size: 15px; font-weight: 600; color: var(--as-navy); margin-top: 12px; }

.cred-block h3 {
  font-size: 15px;
  font-weight: 600;
  color: var(--as-navy);
  margin-bottom: 12px;
}

.cred-block p { font-size: 14px; color: var(--as-text); margin-bottom: 4px; }
.cred-block .en { font-size: 13px; color: var(--as-muted-light); }

@media (max-width: 768px) {
  .detail-head { flex-direction: column; align-items: center; text-align: center; }
}
</style>

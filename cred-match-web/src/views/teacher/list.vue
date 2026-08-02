<template>
  <div class="as-page">
    <AppHeader show-title title-zh="金牌讲师" title-en="Gold Teachers" back-to="/" :show-auth="false" />

    <main class="as-wrap page-main">
      <div class="page-head">
        <span class="as-eyebrow">GOLD TEACHERS · 金牌讲师</span>
        <h1>按学段精准选师</h1>
        <p class="sub">Filter by category & specialty · 综合推荐含认证分权重</p>
      </div>

      <div class="filters as-glass">
        <label>
          <span class="filter-label">大类别</span>
          <select v-model="selectedCategory">
            <option value="">全部</option>
            <option v-for="c in COURSE_CATEGORIES" :key="c.id" :value="c.id">
              {{ c.icon }} {{ c.labelZh }}
            </option>
          </select>
        </label>
        <label>
          <span class="filter-label">细分领域</span>
          <select v-model="selectedSub" :disabled="!selectedCategory">
            <option value="">全部</option>
            <option v-for="s in subOptions" :key="s.id" :value="s.id">{{ s.labelZh }}</option>
          </select>
        </label>
        <label>
          <span class="filter-label">排序</span>
          <select v-model="sortBy">
            <option value="recommend">综合推荐</option>
            <option value="rating">评分最高</option>
            <option value="newest">最新入驻</option>
          </select>
        </label>
      </div>

      <div class="teacher-grid">
        <div
          v-for="teacher in sortedTeachers"
          :key="teacher.id"
          class="teacher-card as-glass"
          :class="{ dimmed: teacher.poolStatus === 'watch' }"
          @click="goDetail(teacher.id)"
        >
          <ImageSlot :src="teacher.avatar" :alt="teacher.name" shape="rounded" size="md" placeholder-icon="👨‍🏫" />
          <div class="teacher-body">
            <h3>{{ teacher.name }}</h3>
            <span v-if="teacher.poolStatus === 'watch'" class="watch-tag">观察池</span>
            <span class="cat-tag">{{ catLabel(teacher).subZh }}</span>
            <p class="meta">{{ teacher.nationalityZh }} · {{ teacher.specialtyZh }}</p>
            <div class="footer">
              <span class="rating">★ {{ teacher.rating }}</span>
              <span class="cert">认证 {{ teacher.certScore }}</span>
              <span class="exp">{{ teacher.experienceZh }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import { GOLD_TEACHERS, calcRecommendScore, isTeacherVisible, type GoldTeacher } from '@/data/home'
import { COURSE_CATEGORIES, getCategoryLabel } from '@/data/categories'

const router = useRouter()
const selectedCategory = ref('')
const selectedSub = ref('')
const sortBy = ref('recommend')

const subOptions = computed(() =>
  COURSE_CATEGORIES.find((c) => c.id === selectedCategory.value)?.children || [],
)

const filteredTeachers = computed(() =>
  GOLD_TEACHERS.filter((t) => {
    if (!isTeacherVisible(t)) return false
    if (selectedCategory.value && t.categoryId !== selectedCategory.value) return false
    if (selectedSub.value && t.subCategoryId !== selectedSub.value) return false
    return true
  }),
)

const sortedTeachers = computed(() => {
  const list = [...filteredTeachers.value]
  if (sortBy.value === 'rating') return list.sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'newest') return list.sort((a, b) => a.joinedDays - b.joinedDays)
  return list.sort((a, b) => calcRecommendScore(b) - calcRecommendScore(a))
})

watch(selectedCategory, () => { selectedSub.value = '' })

function catLabel(t: GoldTeacher) {
  return getCategoryLabel(t.categoryId, t.subCategoryId)
}
function goDetail(id: number) {
  router.push(`/teachers/${id}`)
}
</script>

<style scoped>
.page-main { padding-bottom: 48px; }
.page-head { margin-bottom: 24px; }
.page-head h1 { font-size: 28px; color: var(--as-navy); margin: 8px 0 4px; }
.sub { font-size: 14px; color: var(--as-muted); }
.filters { display: flex; flex-wrap: wrap; gap: 16px; padding: 16px 20px; margin-bottom: 24px; }
.filters label { flex: 1; min-width: 140px; }
.filter-label { display: block; font-size: 11px; font-weight: 600; color: var(--as-muted); margin-bottom: 6px; }
.filters select { width: 100%; padding: 10px; border: 1px solid var(--as-border); border-radius: 8px; }
.teacher-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.teacher-card { padding: 20px; cursor: pointer; transition: transform 0.2s; }
.teacher-card:hover { transform: translateY(-2px); }
.teacher-card.dimmed { opacity: 0.72; }
.teacher-body h3 { font-size: 17px; color: var(--as-navy); margin: 12px 0 4px; }
.watch-tag { font-size: 10px; background: #fff3e0; color: #e65100; padding: 2px 8px; border-radius: 100px; margin-right: 6px; }
.cat-tag { font-size: 11px; color: var(--as-blue-soft); }
.meta { font-size: 13px; color: var(--as-muted); margin: 6px 0; }
.footer { display: flex; gap: 10px; font-size: 12px; color: var(--as-muted); flex-wrap: wrap; }
.rating { color: #f59e0b; font-weight: 600; }
.cert { color: var(--as-navy); font-weight: 600; }
</style>

<template>
  <div class="home">
    <!-- 导航 -->
    <header class="header">
      <div class="wrap header-row">
        <router-link to="/" class="nav-brand">
          <ImageSlot
            src="/images/logo.png"
            alt="NobodySelection"
            shape="rounded"
            size="sm"
            placeholder-icon="◇"
            placeholder-text="Logo"
          />
          <span class="nav-brand-text">NobodySelection</span>
        </router-link>

        <div class="header-right">
          <div class="search-box">
            <span class="search-icon">⌕</span>
            <input
              type="text"
              class="search-input"
              :placeholder="`${SEARCH_PLACEHOLDER.zh}  ${SEARCH_PLACEHOLDER.en}`"
              readonly
            />
          </div>
          <nav class="nav-links">
          <a href="#about" @click.prevent="scrollTo('about')">
            <span>关于</span><span class="nav-en">About</span>
          </a>
          <a href="#teachers" @click.prevent="scrollTo('teachers')">
            <span>讲师</span><span class="nav-en">Teachers</span>
          </a>
          <a href="#partner" @click.prevent="scrollTo('partner')">
            <span>与我们同行</span><span class="nav-en">Partner</span>
          </a>
          <router-link to="/auth" class="nav-cta">登录 Sign In</router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-glow"></div>
      <div class="wrap hero-center">
        <div class="logo-glass">
          <ImageSlot
            src="/images/logo.png"
            alt="NobodySelection"
            shape="rounded"
            size="md"
            placeholder-icon="◇"
            placeholder-text="Optional Logo"
          />
        </div>

        <p class="hero-slogan">
          <span class="en">{{ BRAND.slogan }}</span>
          <span class="zh">{{ BRAND.sloganZh }}</span>
        </p>

        <p class="hero-service">
          <span>{{ BRAND.serviceTagZh }}</span>
          <span class="dot">·</span>
          <span class="en-light">{{ BRAND.serviceTag }}</span>
        </p>

        <p class="hero-position">
          <span class="en">{{ BRAND.positioning }}</span>
          <span class="zh">{{ BRAND.positioningZh }}</span>
        </p>
      </div>
    </section>

    <!-- 品牌 + 创始人 -->
    <section id="about" class="about">
      <div class="wrap">
        <div class="about-glass">
          <div class="about-grid">
            <div class="about-founder">
              <ImageSlot
                :src="FOUNDER.portrait"
                :alt="FOUNDER.name"
                shape="rounded"
                size="lg"
                placeholder-icon="👤"
              />
              <div class="founder-meta">
                <span class="founder-name">{{ FOUNDER.name }}</span>
                <span class="bi-sm">
                  <span>{{ FOUNDER.titleZh }}</span>
                  <span class="sep">/</span>
                  <span>{{ FOUNDER.title }}</span>
                </span>
                <span class="bi-sm muted">
                  <span>{{ FOUNDER.nationalityZh }}</span>
                  <span class="sep">·</span>
                  <span>{{ FOUNDER.nationality }}</span>
                </span>
              </div>
            </div>

            <div class="about-divider"></div>

            <div class="about-content">
              <span class="eyebrow">ABOUT · 关于我们</span>
              <h2 class="about-title">
                {{ BRAND.nameEn }}
                <span class="title-zh">{{ BRAND.nameZh }}</span>
              </h2>

              <div class="bi-block">
                <p class="en">{{ BRAND.description }}</p>
                <p class="zh">{{ BRAND.descriptionZh }}</p>
              </div>

              <div class="bi-block founder-quote">
                <p class="en">{{ FOUNDER.intro }}</p>
                <p class="zh">{{ FOUNDER.introZh }}</p>
              </div>

              <div class="pillars">
                <div v-for="p in BRAND_PILLARS" :key="p.label" class="pillar">
                  <span class="pillar-label">{{ p.labelZh }}</span>
                  <span class="pillar-label-en">{{ p.label }}</span>
                  <span class="pillar-desc">{{ p.descZh }}</span>
                  <span class="pillar-desc-en">{{ p.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 文化沉浸计划 -->
    <section id="culture" class="culture">
      <div class="wrap">
        <div class="culture-glass">
          <span class="eyebrow">CULTURE IMMERSION · 文化沉浸</span>
          <h2>
            {{ CULTURE_PROGRAM.nameZh }}
            <span class="title-en">{{ CULTURE_PROGRAM.nameEn }}</span>
          </h2>
          <p class="culture-tagline">{{ CULTURE_PROGRAM.taglineZh }} · {{ CULTURE_PROGRAM.taglineEn }}</p>
          <p class="culture-desc">{{ CULTURE_PROGRAM.conceptZh }}</p>
          <div class="culture-rules">
            <div class="culture-rule">
              <span class="rule-icon">🎓</span>
              <div>
                <strong>学员权益</strong>
                <p>{{ CULTURE_PROGRAM.studentRuleZh }}</p>
              </div>
            </div>
            <div class="culture-rule">
              <span class="rule-icon">👨‍🏫</span>
              <div>
                <strong>教师激励</strong>
                <p>{{ CULTURE_PROGRAM.teacherRuleZh }}</p>
              </div>
            </div>
          </div>
          <div class="culture-events">
            <div v-for="e in CULTURE_EVENTS" :key="e.id" class="event-card">
              <span class="event-date">{{ e.date }}</span>
              <strong>{{ e.titleZh }}</strong>
              <span class="en-light">{{ e.titleEn }}</span>
              <p>{{ e.venueZh }} · {{ e.themeZh }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 金牌讲师 -->
    <section id="teachers" class="teachers">
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">GOLD TEACHERS · 金牌讲师</span>
          <h2>
            金牌讲师
            <span class="title-en">Gold Teachers</span>
          </h2>
          <p class="section-sub">
            按学段与目标精准匹配外教
            <span class="sub-en">Match educators by level & learning goals</span>
          </p>
        </div>

        <div class="teacher-filters as-glass">
          <label>
            <span class="filter-label">大类别 Category</span>
            <select v-model="selectedCategory">
              <option value="">全部 All</option>
              <option v-for="c in COURSE_CATEGORIES" :key="c.id" :value="c.id">
                {{ c.icon }} {{ c.labelZh }} / {{ c.labelEn }}
              </option>
            </select>
          </label>
          <label>
            <span class="filter-label">细分领域 Specialty</span>
            <select v-model="selectedSub" :disabled="!selectedCategory">
              <option value="">全部 All</option>
              <option v-for="s in subOptions" :key="s.id" :value="s.id">
                {{ s.labelZh }} / {{ s.labelEn }}
              </option>
            </select>
          </label>
        </div>

        <div class="teacher-list">
          <div
            v-for="t in filteredTeachers"
            :key="t.id"
            class="teacher-item"
            @click="goTeacher(t.id)"
          >
            <div class="teacher-avatar">
              <ImageSlot
                :src="t.avatar"
                :alt="t.name"
                shape="circle"
                size="md"
                placeholder-icon="👨‍🏫"
              />
            </div>
            <div class="teacher-body">
              <div class="teacher-top">
                <h3>{{ t.name }}</h3>
                <span class="teacher-rating">★ {{ t.rating }}</span>
              </div>
              <p class="teacher-field">
                <span class="cat-tag">{{ categoryLabel(t).categoryZh }} · {{ categoryLabel(t).subZh }}</span>
              </p>
              <p class="teacher-field">
                <span>{{ t.nationalityZh }}</span>
                <span class="sep">/</span>
                <span class="en-light">{{ t.nationality }}</span>
                <span class="sep">·</span>
                <span>{{ t.specialtyZh }}</span>
              </p>
              <div class="teacher-creds">
                <p>
                  <span>{{ t.degreeZh }}</span>
                  <span class="sep">·</span>
                  <span class="en-light">{{ t.degree }}</span>
                </p>
                <p>
                  <span>{{ t.universityZh }}</span>
                  <span class="sep">·</span>
                  <span class="en-light">{{ t.university }}</span>
                  <span class="sep">·</span>
                  <span>{{ t.experienceZh }}</span>
                  <span class="sep">/</span>
                  <span class="en-light">{{ t.experience }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="teachers-more">
          <router-link to="/teachers" class="link-more">
            查看全部讲师 View All →
          </router-link>
        </div>
      </div>
    </section>

    <!-- 与我们同行 -->
    <section id="partner" class="partner">
      <div class="wrap">
        <div class="partner-glass">
          <span class="eyebrow">PARTNER WITH US · 与我们同行</span>
          <h2>
            合作共建
            <span class="title-en">Build Together</span>
          </h2>
          <p class="partner-desc">
            学校、企业、文化空间 — 欢迎与 NobodySelection 共建外教生态与文化沉浸场景。
            提交后管理员将在后台「合作申请」中跟进。
          </p>
          <form class="partner-form" @submit.prevent="submitPartner">
            <div class="form-row">
              <label>
                <span>机构名称 Organization *</span>
                <input v-model="partnerForm.orgName" required placeholder="如：广州某国际学校" />
              </label>
              <label>
                <span>合作类型 Type *</span>
                <select v-model="partnerForm.type" required>
                  <option v-for="t in PARTNER_TYPES" :key="t.value" :value="t.value">
                    {{ t.labelZh }}
                  </option>
                </select>
              </label>
            </div>
            <div class="form-row">
              <label>
                <span>联系人 Contact *</span>
                <input v-model="partnerForm.contactName" required placeholder="姓名" />
              </label>
              <label>
                <span>电话 Phone *</span>
                <input v-model="partnerForm.phone" required placeholder="138xxxx" />
              </label>
            </div>
            <label class="full">
              <span>邮箱 Email</span>
              <input v-model="partnerForm.email" type="email" placeholder="contact@org.com" />
            </label>
            <label class="full">
              <span>合作意向 Message *</span>
              <textarea v-model="partnerForm.message" required rows="4" placeholder="请简述合作需求…" />
            </label>
            <button type="submit" class="partner-submit" :disabled="partnerSubmitting">
              {{ partnerSubmitting ? '提交中…' : '提交合作申请 Submit' }}
            </button>
            <p v-if="partnerDone" class="partner-ok">✓ 已提交！管理员将在合作申请窗口跟进</p>
          </form>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="wrap footer-row">
        <span>{{ BRAND.nameZh }} {{ BRAND.nameEn }} · {{ BRAND.sloganZh }}</span>
        <span class="footer-copy">&copy; {{ year }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import ImageSlot from '@/components/ImageSlot.vue'
import { BRAND, FOUNDER, GOLD_TEACHERS, BRAND_PILLARS, SEARCH_PLACEHOLDER, calcRecommendScore, isTeacherVisible, type GoldTeacher } from '@/data/home'
import { COURSE_CATEGORIES, getCategoryLabel } from '@/data/categories'
import { CULTURE_PROGRAM, CULTURE_EVENTS } from '@/data/culture-program'
import { PARTNER_TYPES, submitInquiry } from '@/data/partner-inquiries'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const partnerSubmitting = ref(false)
const partnerDone = ref(false)
const partnerForm = ref({
  orgName: '',
  contactName: '',
  phone: '',
  email: '',
  type: 'school',
  message: '',
})

function submitPartner() {
  partnerSubmitting.value = true
  const typeItem = PARTNER_TYPES.find((t) => t.value === partnerForm.value.type)
  submitInquiry({
    orgName: partnerForm.value.orgName,
    contactName: partnerForm.value.contactName,
    phone: partnerForm.value.phone,
    email: partnerForm.value.email || '—',
    type: partnerForm.value.type,
    typeZh: typeItem?.labelZh || '',
    message: partnerForm.value.message,
  })
  setTimeout(() => {
    partnerSubmitting.value = false
    partnerDone.value = true
    showToast('合作申请已提交')
    partnerForm.value = { orgName: '', contactName: '', phone: '', email: '', type: 'school', message: '' }
  }, 500)
}
const year = new Date().getFullYear()
const selectedCategory = ref('')
const selectedSub = ref('')

const subOptions = computed(() =>
  COURSE_CATEGORIES.find((c) => c.id === selectedCategory.value)?.children || [],
)

const filteredTeachers = computed(() => {
  const list = GOLD_TEACHERS.filter((t) => {
    if (!isTeacherVisible(t)) return false
    if (selectedCategory.value && t.categoryId !== selectedCategory.value) return false
    if (selectedSub.value && t.subCategoryId !== selectedSub.value) return false
    return true
  })
  return [...list].sort((a, b) => calcRecommendScore(b) - calcRecommendScore(a))
})

watch(selectedCategory, () => { selectedSub.value = '' })

function categoryLabel(t: GoldTeacher) {
  return getCategoryLabel(t.categoryId, t.subCategoryId)
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function goTeacher(id: number) {
  router.push(`/teachers/${id}`)
}
</script>

<style scoped>
.home {
  --navy: #0c1a2e;
  --blue-soft: #3d6a9a;
  --ice: #f4f7fb;
  --text: #0c1a2e;
  --muted: #5a6f85;
  --muted-light: #8a9bb0;
  background: var(--ice);
  color: var(--text);
  font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif;
  min-height: 100vh;
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 28px;
}

/* 通用中英样式 */
.en-light { color: var(--muted-light); font-size: 0.92em; }
.sep { margin: 0 5px; opacity: 0.35; }
.dot { margin: 0 8px; opacity: 0.3; }

.bi-block .en {
  font-size: 14px;
  line-height: 1.8;
  color: var(--muted);
  margin-bottom: 6px;
}
.bi-block .zh {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text);
}
.founder-quote {
  margin: 20px 0 28px;
  padding-left: 16px;
  border-left: 2px solid rgba(61, 106, 154, 0.2);
}

.bi-sm {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}
.bi-sm.muted { color: var(--muted-light); }

/* ── Header ── */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 12px 0;
  background: rgba(244, 247, 251, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(12, 26, 46, 0.06);
}

.header-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-brand-text {
  font-size: 14px;
  font-weight: 600;
  color: #0c1a2e;
}

.nav-brand :deep(.image-slot.sm) {
  width: 36px;
  height: 36px;
}

.nav-logo {
  height: 32px;
  flex-shrink: 0;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  width: 280px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(12, 26, 46, 0.08);
  border-radius: 100px;
  transition: all 0.2s;
}

.search-box:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(12, 26, 46, 0.12);
}

.search-icon {
  font-size: 16px;
  color: var(--muted-light);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: var(--text);
  outline: none;
  cursor: default;
}

.search-input::placeholder {
  color: var(--muted-light);
  font-size: 12px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.nav-links a {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  line-height: 1.3;
  transition: color 0.2s;
}

.nav-links .nav-en {
  font-size: 10px;
  color: var(--muted-light);
  letter-spacing: 0.5px;
}

.nav-links a:hover { color: var(--blue-soft); }

.nav-cta {
  flex-direction: row !important;
  color: var(--navy) !important;
  border: 1px solid rgba(12, 26, 46, 0.12);
  padding: 7px 18px;
  border-radius: 100px;
  font-size: 12px !important;
  gap: 0;
  white-space: nowrap;
}

.nav-cta:hover {
  background: var(--navy);
  color: #fff !important;
}

/* ── Hero ── */
.hero {
  position: relative;
  padding: 130px 0 72px;
  text-align: center;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 720px;
  background: radial-gradient(circle, rgba(61, 106, 154, 0.1) 0%, transparent 68%);
  pointer-events: none;
}

.logo-glass {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 60px 96px;
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 28px;
  box-shadow:
    0 8px 40px rgba(12, 26, 46, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
}

.hero-logo {
  height: 180px;
  width: auto;
  object-fit: contain;
}

.hero-slogan {
  margin-bottom: 14px;
}
.hero-slogan .en {
  display: block;
  font-size: 22px;
  font-weight: 300;
  font-style: italic;
  color: var(--blue-soft);
  letter-spacing: 1px;
}
.hero-slogan .zh {
  display: block;
  font-size: 15px;
  color: var(--muted);
  margin-top: 4px;
}

.hero-service {
  font-size: 13px;
  color: var(--muted-light);
  margin-bottom: 16px;
  letter-spacing: 0.3px;
}

.hero-position .en {
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--muted-light);
  margin-bottom: 4px;
}
.hero-position .zh {
  display: block;
  font-size: 14px;
  color: var(--muted);
}

/* ── About ── */
.about { padding: 36px 0 72px; }

.about-glass {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 20px;
  padding: 44px;
  box-shadow: 0 8px 40px rgba(12, 26, 46, 0.04);
}

.about-grid {
  display: grid;
  grid-template-columns: 200px 1px 1fr;
  gap: 44px;
  align-items: start;
}

.about-divider {
  width: 1px;
  background: linear-gradient(180deg, transparent, rgba(12, 26, 46, 0.1) 20%, rgba(12, 26, 46, 0.1) 80%, transparent);
  align-self: stretch;
}

.about-founder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.founder-name {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: var(--navy);
}

.eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--blue-soft);
}

.about-title {
  font-size: 26px;
  font-weight: 600;
  color: var(--navy);
  margin: 8px 0 18px;
}
.title-zh {
  font-size: 16px;
  font-weight: 400;
  color: var(--muted);
  margin-left: 10px;
}

.pillars {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.pillar {
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(12, 26, 46, 0.05);
  border-radius: 10px;
}

.pillar-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--navy);
}
.pillar-label-en {
  display: block;
  font-size: 11px;
  color: var(--muted-light);
  margin-bottom: 6px;
}
.pillar-desc {
  display: block;
  font-size: 12px;
  color: var(--text);
  line-height: 1.5;
}
.pillar-desc-en {
  display: block;
  font-size: 11px;
  color: var(--muted-light);
  line-height: 1.5;
  margin-top: 2px;
}

/* ── Teachers ── */
.partner { padding: 0 0 56px; }
.partner-glass {
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(12, 26, 46, 0.08);
  border-radius: 20px;
  padding: 36px 40px;
  box-shadow: 0 8px 32px rgba(12, 26, 46, 0.06);
}
.partner-glass h2 { font-size: 24px; font-weight: 600; color: var(--navy); margin: 8px 0; }
.partner-desc { font-size: 14px; color: var(--muted); margin-bottom: 24px; max-width: 640px; }
.partner-form { max-width: 640px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.partner-form label { display: flex; flex-direction: column; gap: 6px; }
.partner-form label.full { margin-bottom: 14px; }
.partner-form label span { font-size: 12px; font-weight: 600; color: var(--navy); }
.partner-form input, .partner-form select, .partner-form textarea {
  padding: 10px 14px; border: 1px solid rgba(12, 26, 46, 0.1); border-radius: 10px;
  font-size: 14px; font-family: inherit; background: rgba(255,255,255,0.7);
}
.partner-submit {
  padding: 12px 32px; background: var(--navy); color: #fff; border: none;
  border-radius: 100px; font-size: 14px; font-weight: 600; cursor: pointer; margin-top: 8px;
}
.partner-submit:disabled { opacity: 0.6; }
.partner-ok { font-size: 13px; color: #2e7d32; margin-top: 12px; }

.culture { padding: 0 0 56px; }
.culture-glass {
  padding: 36px 40px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(12, 26, 46, 0.06);
}
.culture-glass h2 { font-size: 24px; font-weight: 600; color: var(--navy); margin: 8px 0; }
.culture-tagline { color: var(--blue-soft); font-size: 14px; margin-bottom: 12px; }
.culture-desc { font-size: 14px; color: var(--muted); margin-bottom: 20px; max-width: 720px; }
.culture-rules { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
.culture-rule {
  display: flex; gap: 12px; padding: 16px;
  background: rgba(255,255,255,0.5); border-radius: 12px;
}
.culture-rule strong { display: block; color: #000; margin-bottom: 4px; }
.culture-rule p { font-size: 13px; color: var(--muted); margin: 0; }
.rule-icon { font-size: 28px; }
.culture-events { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.event-card {
  padding: 14px; background: rgba(255,255,255,0.45); border-radius: 12px; font-size: 13px;
}
.event-card strong { display: block; color: var(--navy); margin: 4px 0; }
.event-date { font-size: 11px; color: var(--blue-soft); font-weight: 600; }

.teacher-filters {
  display: flex; flex-wrap: wrap; gap: 16px; padding: 16px 20px; margin-bottom: 20px;
  background: rgba(255,255,255,0.55); border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.75);
}
.teacher-filters label { display: flex; align-items: center; gap: 10px; }
.filter-label { font-size: 12px; color: var(--muted); }
.teacher-filters select {
  padding: 8px 14px; border: 1px solid rgba(12,26,46,0.08); border-radius: 100px;
  background: rgba(255,255,255,0.7); font-size: 13px; color: var(--navy);
}
.cat-tag {
  display: inline-block; padding: 2px 10px; border-radius: 100px;
  background: rgba(61,106,154,0.12); color: var(--blue-soft); font-size: 11px;
}

.teachers { padding: 0 0 88px; }

.section-head { margin-bottom: 36px; }

.section-head h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--navy);
  margin-top: 8px;
}
.title-en {
  font-size: 14px;
  font-weight: 400;
  color: var(--muted-light);
  margin-left: 10px;
}

.section-sub {
  font-size: 14px;
  color: var(--muted);
  margin-top: 8px;
}
.sub-en {
  display: block;
  font-size: 12px;
  color: var(--muted-light);
  margin-top: 2px;
}

.teacher-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.teacher-item {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 22px 26px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s;
}

.teacher-item:hover {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 28px rgba(12, 26, 46, 0.07);
  transform: translateY(-2px);
}

.teacher-top {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 4px;
}

.teacher-body h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--navy);
}

.teacher-rating {
  font-size: 13px;
  color: var(--blue-soft);
}

.teacher-field {
  font-size: 13px;
  color: var(--text);
  margin-bottom: 6px;
}

.teacher-creds p {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.7;
}

.teachers-more {
  text-align: center;
  margin-top: 32px;
}

.link-more {
  font-size: 13px;
  font-weight: 500;
  color: var(--blue-soft);
  text-decoration: none;
  transition: color 0.2s;
}
.link-more:hover { color: var(--navy); }

/* ── Footer ── */
.footer {
  padding: 28px 0;
  border-top: 1px solid rgba(12, 26, 46, 0.06);
}

.footer-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted-light);
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .search-box { width: 200px; }
}

@media (max-width: 768px) {
  .header-row { flex-wrap: wrap; }
  .header-right {
    order: 3;
    width: 100%;
    margin-left: 0;
  }
  .search-box { flex: 1; width: auto; }
  .culture-rules, .culture-events, .form-row { grid-template-columns: 1fr; }
  .teacher-filters { flex-direction: column; }
  .teacher-list { grid-template-columns: 1fr; }
  .hero-logo { height: 130px; }
  .logo-glass { padding: 40px 56px; }
  .about-glass { padding: 28px; }
  .about-grid { grid-template-columns: 1fr; gap: 28px; }
  .about-divider { width: 100%; height: 1px; background: rgba(12, 26, 46, 0.08); }
  .pillars { grid-template-columns: 1fr; }
  .teacher-item { flex-direction: column; text-align: center; }
  .nav-links a:not(.nav-cta) { display: none; }
}
</style>

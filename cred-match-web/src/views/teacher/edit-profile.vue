<template>
  <PortalLayout page-title="编辑资料" page-title-en="Profile" role-label="教师 Teacher" avatar="👨‍🏫" :nav-items="TEACHER_NAV">
    <div class="profile-form">
      <div class="photo-block as-glass">
        <ImageSlot src="/images/teachers/teacher-01.jpg" :alt="name" shape="circle" size="xl" placeholder-icon="👨‍🏫" />
        <button class="pc-btn-sm">更换头像</button>
      </div>
      <div class="pc-panel as-glass">
        <h3>基本信息</h3>
        <div class="field"><label>姓名</label><input v-model="name" /></div>
        <div class="field"><label>国籍</label><input v-model="nationality" /></div>
        <div class="field"><label>教学专长</label><input v-model="specialty" /></div>
        <div class="field"><label>学历</label><input v-model="degree" /></div>
        <div class="field full"><label>个人简介</label><textarea v-model="bio" rows="4" /></div>
      </div>
      <div class="pc-panel as-glass">
        <h3>授课设置</h3>
        <div class="field-row">
          <div class="field"><label>课时费 (¥/45min)</label><input v-model.number="rate" type="number" /></div>
          <div class="field"><label>体验课</label><select v-model="trial"><option>完全免费</option><option>收费</option></select></div>
        </div>
        <div class="tags">
          <span v-for="t in tags" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
      <button class="save-btn" @click="save">保存资料</button>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import ImageSlot from '@/components/ImageSlot.vue'
import { TEACHER_NAV } from '@/data/portal-nav'
import { getUserInfo } from '@/utils/auth'

const name = ref(getUserInfo()?.nickname || 'Aaron Smith')
const nationality = ref('英国 United Kingdom')
const specialty = ref('雅思口语 · 商务英语')
const degree = ref('硕士 MSc · TESOL')
const bio = ref('10+ years teaching experience. Founder-reviewed gold certified educator.')
const rate = ref(180)
const trial = ref('完全免费')
const tags = ['雅思', '商务英语', '文化沉浸', '青少年']

function save() { showToast('资料已保存') }
</script>

<style scoped>
.profile-form { display: flex; flex-direction: column; gap: 16px; }
.photo-block { padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.field { margin-bottom: 14px; }
.field label { display: block; font-size: 12px; font-weight: 600; color: var(--as-navy); margin-bottom: 6px; }
.field input, .field textarea, .field select {
  width: 100%; padding: 10px; border: 1px solid var(--as-border); border-radius: 8px; font-size: 14px;
}
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.tag { padding: 4px 12px; background: rgba(61,106,154,0.12); border-radius: 100px; font-size: 12px; }
.save-btn {
  padding: 12px; background: var(--as-navy); color: #fff; border: none; border-radius: 100px; cursor: pointer;
}
@media (max-width: 600px) { .field-row { grid-template-columns: 1fr; } }
</style>

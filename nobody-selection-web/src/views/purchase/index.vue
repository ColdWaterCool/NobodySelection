<template>
  <PortalLayout
    page-title="购买课时"
    page-title-en="Purchase"
    :role-label="portalMeta.label"
    :avatar="portalMeta.avatar"
    :nav-items="navItems"
  >
    <div class="purchase-wrap">
      <div v-if="isParent" class="child-select as-glass">
        <label>为哪位学员购买 Purchase for</label>
        <select v-model="selectedChildId">
          <option v-for="c in children" :key="c.id" :value="c.id">
            {{ c.name }}（{{ c.gradeZh }} · {{ c.age }}岁）
          </option>
        </select>
        <p class="bind-note">家长账号通过家庭绑定码关联学员，课时充值至绑定学员账户</p>
      </div>

      <div v-else class="self-note as-glass">
        <p>成年学员自主购课 · 课时直接进入您的学员账户</p>
      </div>

      <div class="packages">
        <div
          v-for="pkg in packages"
          :key="pkg.id"
          class="pkg-card as-glass"
          :class="{ selected: selectedPkg === pkg.id }"
          @click="selectedPkg = pkg.id"
        >
          <div class="pkg-hours">{{ pkg.hours }} 课时</div>
          <div class="pkg-price">¥{{ pkg.price }}</div>
          <div class="pkg-unit">¥{{ pkg.unitPrice }}/节</div>
          <span v-if="pkg.tag" class="pkg-tag">{{ pkg.tag }}</span>
        </div>
      </div>

      <div class="split-info as-glass">
        <h4>三层分账 Fund Split</h4>
        <div class="split-bar">
          <div class="split-parent" style="width:15%">学习基金 15%</div>
          <div class="split-school" style="width:85%">教学服务 85%</div>
        </div>
        <p class="split-desc">{{ FUND_SPLIT.descZh }}</p>
        <p class="split-desc sub">教学池内平台抽成按教师认证档位 12%～25%，其余归教师</p>
      </div>

      <button class="pay-btn" :disabled="!selectedPkg || paying" @click="handlePay">
        {{ paying ? '处理中…' : `微信支付 ¥${currentPrice}` }}
      </button>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import PortalLayout from '@/components/PortalLayout.vue'
import { PARENT_NAV, getStudentNav } from '@/data/portal-nav'
import { getUserInfo, getUserRole } from '@/utils/auth'
import { FUND_SPLIT } from '@/data/fund-split'

const userInfo = computed(() => getUserInfo())
/** 家长账号，或成年学员选择了「也是家长」 */
const isParent = computed(() => getUserRole() === 'parent' || !!userInfo.value?.alsoParent)

const portalMeta = computed(() =>
  isParent.value
    ? { label: '家长 Parent', avatar: '👨‍👩‍👧' }
    : { label: '学生 Student', avatar: '🎓' },
)
const navItems = computed(() =>
  isParent.value ? PARENT_NAV : getStudentNav('adult'),
)

const children = computed(() => userInfo.value?.boundChildren || [{ id: 1001, name: '学员', age: 0, gradeZh: '' }])
const selectedChildId = ref(children.value[0]?.id || 1001)
const selectedPkg = ref(2)
const paying = ref(false)

const packages = [
  { id: 1, hours: 5, price: 500, unitPrice: 100, tag: '' },
  { id: 2, hours: 20, price: 1800, unitPrice: 90, tag: '热门' },
  { id: 3, hours: 50, price: 4000, unitPrice: 80, tag: '最划算' },
]

const currentPrice = computed(() => packages.find((p) => p.id === selectedPkg.value)?.price || 0)

function handlePay() {
  paying.value = true
  setTimeout(() => {
    paying.value = false
    const target = isParent.value
      ? children.value.find((c) => c.id === selectedChildId.value)?.name
      : userInfo.value?.nickname
    showToast(`已为 ${target} 充值成功`)
  }, 800)
}
</script>

<style scoped>
.purchase-wrap { width: 100%; }
.child-select, .self-note { padding: 16px 20px; margin-bottom: 20px; }
.child-select label { font-size: 13px; font-weight: 600; color: var(--as-navy); display: block; margin-bottom: 8px; }
.child-select select {
  width: 100%; padding: 10px; border: 1px solid var(--as-border); border-radius: 8px; font-size: 14px;
}
.bind-note, .self-note p { font-size: 12px; color: var(--as-muted); margin-top: 8px; }
.packages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 20px; }
.pkg-card {
  padding: 20px; text-align: center; cursor: pointer; position: relative;
  border: 2px solid transparent; transition: border-color 0.2s;
}
.pkg-card.selected { border-color: var(--as-navy); }
.pkg-hours { font-size: 18px; font-weight: 700; color: var(--as-navy); }
.pkg-price { font-size: 24px; font-weight: 800; margin: 8px 0; }
.pkg-unit { font-size: 12px; color: var(--as-muted); }
.pkg-tag {
  position: absolute; top: 8px; right: 8px; font-size: 10px;
  background: var(--as-navy); color: #fff; padding: 2px 8px; border-radius: 100px;
}
.split-info { padding: 16px 20px; margin-bottom: 20px; }
.split-info h4 { font-size: 14px; color: var(--as-navy); margin-bottom: 10px; }
.split-bar { display: flex; height: 28px; border-radius: 6px; overflow: hidden; font-size: 11px; color: #fff; }
.split-parent { background: #5c8ab8; display: flex; align-items: center; justify-content: center; }
.split-school { background: var(--as-navy); display: flex; align-items: center; justify-content: center; }
.split-desc { font-size: 12px; color: var(--as-muted); margin-top: 8px; }
.pay-btn {
  width: 100%; padding: 14px; background: #07c160; color: #fff; border: none;
  border-radius: 100px; font-size: 16px; font-weight: 600; cursor: pointer;
}
.pay-btn:disabled { opacity: 0.6; cursor: not-allowed; }
@media (max-width: 600px) { .packages { grid-template-columns: 1fr; } }
</style>

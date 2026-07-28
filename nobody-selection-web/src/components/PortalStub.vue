<template>
  <PortalLayout
    :page-title="title"
    :page-title-en="titleEn"
    :role-label="roleMeta.label"
    :avatar="roleMeta.avatar"
    :nav-items="navItems"
  >
    <div class="as-glass pc-stub">
      <span style="font-size:40px;display:block;margin-bottom:16px">{{ icon }}</span>
      <h3 style="font-size:18px;color:var(--as-navy);margin-bottom:8px">{{ title }}</h3>
      <p>{{ message }}</p>
      <router-link v-if="dashboardTo" :to="dashboardTo" class="as-btn-outline">返回概览 Dashboard</router-link>
    </div>
  </PortalLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PortalLayout from '@/components/PortalLayout.vue'
import { getPortalNav, getPortalRoleMeta, type PortalRole } from '@/data/portal-nav'

const props = withDefaults(
  defineProps<{
    role: PortalRole
    title: string
    titleEn?: string
    message?: string
    icon?: string
    dashboardTo?: string
  }>(),
  {
    titleEn: '',
    message: '该功能即将上线，敬请期待。',
    icon: '🚧',
    dashboardTo: '',
  },
)

const navItems = computed(() => getPortalNav(props.role))
const roleMeta = computed(() => getPortalRoleMeta(props.role))
</script>

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { canPurchase, canAccessParentPortal } from '@/data/family-binding'
import { clearAuth, getUserInfo, getUserRole, isAuthenticated } from '@/utils/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/teachers',
    name: 'TeacherList',
    component: () => import('@/views/teacher/list.vue'),
    meta: { title: '教师列表' }
  },
  {
    path: '/teachers/:id',
    name: 'TeacherDetail',
    component: () => import('@/views/teacher/detail.vue'),
    meta: { title: '教师详情' }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/auth/index-fix.vue'),
    meta: { title: '登录', guest: true }
  },
  {
    path: '/student',
    name: 'StudentDashboard',
    component: () => import('@/views/student/index.vue'),
    meta: { title: '学生中心', auth: true, role: 'student' }
  },
  {
    path: '/student/homework',
    name: 'StudentHomework',
    component: () => import('@/views/student/homework.vue'),
    meta: { title: '作业中心', auth: true, role: 'student' }
  },
  {
    path: '/student/homework/:id',
    name: 'StudentHomeworkDetail',
    component: () => import('@/views/student/homework-detail.vue'),
    meta: { title: '作业详情', auth: true, role: 'student' }
  },
  {
    path: '/student/records',
    name: 'StudentRecords',
    component: () => import('@/views/student/records.vue'),
    meta: { title: '学习记录', auth: true, role: 'student' }
  },
  {
    path: '/parent',
    name: 'ParentDashboard',
    component: () => import('@/views/parent/index.vue'),
    meta: { title: '家长中心', auth: true, role: 'parent' }
  },
  {
    path: '/parent/consumption',
    name: 'ParentConsumption',
    component: () => import('@/views/parent/consumption.vue'),
    meta: { title: '课时消费', auth: true, role: 'parent' }
  },
  {
    path: '/parent/statistics',
    name: 'ParentStatistics',
    component: () => import('@/views/parent/statistics.vue'),
    meta: { title: '学时统计', auth: true, role: 'parent' }
  },
  {
    path: '/teacher',
    name: 'TeacherDashboard',
    component: () => import('@/views/teacher/dashboard.vue'),
    meta: { title: '教师中心', auth: true, role: 'teacher' }
  },
  {
    path: '/teacher/profile',
    name: 'TeacherProfile',
    component: () => import('@/views/teacher/edit-profile.vue'),
    meta: { title: '编辑资料', auth: true, role: 'teacher' }
  },
  {
    path: '/teacher/schedule',
    name: 'TeacherSchedule',
    component: () => import('@/views/teacher/schedule.vue'),
    meta: { title: '排课管理', auth: true, role: 'teacher' }
  },
  {
    path: '/teacher/homework',
    name: 'TeacherHomework',
    component: () => import('@/views/teacher/homework.vue'),
    meta: { title: '作业管理', auth: true, role: 'teacher' }
  },
  {
    path: '/teacher/income',
    name: 'TeacherIncome',
    component: () => import('@/views/teacher/income.vue'),
    meta: { title: '收入统计', auth: true, role: 'teacher' }
  },
  {
    path: '/teacher/activities',
    name: 'TeacherActivities',
    component: () => import('@/views/teacher/activities.vue'),
    meta: { title: '活动申请', auth: true, role: 'teacher' }
  },
  {
    path: '/purchase',
    name: 'Purchase',
    component: () => import('@/views/purchase/index.vue'),
    meta: { title: '购买课时', auth: true, purchase: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/purchase/orders.vue'),
    meta: { title: '我的订单', auth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/settings/index.vue'),
    meta: { title: '个人设置', auth: true }
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('@/views/admin/layout.vue'),
    meta: { title: '后台管理', auth: true, role: 'admin' },
    children: [
      { path: '', name: 'AdminDashboard', component: () => import('@/views/admin/dashboard.vue'), meta: { title: '数据看板' } },
      { path: 'users', name: 'AdminUsers', component: () => import('@/views/admin/users.vue'), meta: { title: '用户管理' } },
      { path: 'teachers', name: 'AdminTeachers', component: () => import('@/views/admin/teachers.vue'), meta: { title: '教师审核' } },
      { path: 'orders', name: 'AdminOrders', component: () => import('@/views/admin/orders.vue'), meta: { title: '订单管理' } },
      { path: 'finance', name: 'AdminFinance', component: () => import('@/views/admin/finance.vue'), meta: { title: '财务报表' } },
      { path: 'cms', name: 'AdminCMS', component: () => import('@/views/admin/cms.vue'), meta: { title: '内容管理' } },
      { path: 'activities', name: 'AdminActivities', component: () => import('@/views/admin/activities.vue'), meta: { title: '活动审批' } },
      { path: 'partnerships', name: 'AdminPartnerships', component: () => import('@/views/admin/partnerships.vue'), meta: { title: '合作申请' } },
      { path: 'settings', name: 'AdminSettings', component: () => import('@/views/admin/settings.vue'), meta: { title: '系统设置' } },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '页面未找到' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  document.title = `${String(to.meta.title || 'CredMatch')} — 外教资格评定与匹配`

  if (to.name === 'Auth') {
    next()
    return
  }

  const needsAuth = to.matched.some((r) => r.meta.auth)
  const authed = isAuthenticated()

  if (needsAuth && !authed) {
    clearAuth()
    next({ name: 'Auth', query: { redirect: to.fullPath } })
    return
  }

  if (!needsAuth) {
    next()
    return
  }

  const userRole = getUserRole()
  const needsRole = to.matched.some((r) => r.meta.role)
  const needsPurchase = to.matched.some((r) => r.meta.purchase)

  if (needsRole || needsPurchase) {
    const userInfo = getUserInfo()
    const requiredRole = to.meta.role as string | undefined

    if (requiredRole) {
      if (requiredRole === 'parent') {
        if (!canAccessParentPortal(userRole, userInfo)) {
          next({ name: 'Home' })
          return
        }
      } else if (requiredRole !== userRole) {
        next({ name: 'Home' })
        return
      }
    }

    if (needsPurchase && !canPurchase(userRole, userInfo)) {
      next({ path: '/student' })
      return
    }
  }

  next()
})

export default router

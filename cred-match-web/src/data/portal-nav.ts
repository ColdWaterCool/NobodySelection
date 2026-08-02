import type { NavItem } from '@/components/PortalLayout.vue'
import type { LearnerType } from './family-binding'

export type PortalRole = 'student' | 'parent' | 'teacher'

const STUDENT_BASE: NavItem[] = [
  { to: '/student', label: '学习概览', labelEn: 'Dashboard', icon: '📊' },
  { to: '/student/homework', label: '作业中心', labelEn: 'Homework', icon: '📝' },
  { to: '/settings', label: '个人设置', labelEn: 'Settings', icon: '⚙️' },
]

const STUDENT_ADULT_EXTRA: NavItem = {
  to: '/purchase',
  label: '购买课时',
  labelEn: 'Purchase',
  icon: '💳',
}

export const PARENT_NAV: NavItem[] = [
  { to: '/parent', label: '家长中心', labelEn: 'Dashboard', icon: '📊' },
  { to: '/purchase', label: '购买课时', labelEn: 'Purchase', icon: '💳' },
  { to: '/parent/consumption', label: '课时消费', labelEn: 'Consumption', icon: '📋' },
  { to: '/parent/statistics', label: '学时统计', labelEn: 'Statistics', icon: '📈' },
  { to: '/settings', label: '个人设置', labelEn: 'Settings', icon: '⚙️' },
]

export const TEACHER_NAV: NavItem[] = [
  { to: '/teacher', label: '教师中心', labelEn: 'Dashboard', icon: '📊' },
  { to: '/teacher/profile', label: '编辑资料', labelEn: 'Profile', icon: '👤' },
  { to: '/teacher/schedule', label: '排课管理', labelEn: 'Schedule', icon: '📅' },
  { to: '/teacher/homework', label: '作业管理', labelEn: 'Homework', icon: '📝' },
  { to: '/teacher/activities', label: '活动申请', labelEn: 'Activities', icon: '🎭' },
  { to: '/teacher/income', label: '收入统计', labelEn: 'Income', icon: '💰' },
]

const ROLE_META: Record<PortalRole, { label: string; avatar: string }> = {
  student: { label: '学生 Student', avatar: '🎓' },
  parent: { label: '家长 Parent', avatar: '👨‍👩‍👧' },
  teacher: { label: '教师 Teacher', avatar: '👨‍🏫' },
}

/** 未成年：仅概览+作业+设置；成年学员：额外开放购课 */
export function getStudentNav(learnerType?: LearnerType): NavItem[] {
  if (learnerType === 'adult') {
    const nav = [...STUDENT_BASE]
    nav.splice(2, 0, STUDENT_ADULT_EXTRA)
    return nav
  }
  return STUDENT_BASE
}

export function getPortalNav(role: PortalRole, learnerType?: LearnerType) {
  if (role === 'student') return getStudentNav(learnerType)
  if (role === 'parent') return PARENT_NAV
  return TEACHER_NAV
}

export function getPortalRoleMeta(role: PortalRole) {
  return ROLE_META[role]
}

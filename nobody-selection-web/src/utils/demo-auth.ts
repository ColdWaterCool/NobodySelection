import { saveAuthInfo, getUserInfo, setUserInfo } from './auth'

export interface DemoUser {
  id: number
  nickname: string
  phone: string
  role: string
  avatar: string
  learnerType?: 'minor' | 'adult'
  parentId?: number
  parentName?: string
  boundChildren?: { id: number; name: string; age: number; gradeZh: string }[]
  /** 成年学员在登录时选择「也是家长」 */
  alsoParent?: boolean
}

export const DEMO_USERS: Record<string, DemoUser> = {
  student: {
    id: 1001,
    nickname: '张小雨',
    phone: '13800000001',
    role: 'student',
    avatar: '',
    learnerType: 'minor',
    parentId: 2001,
    parentName: '张家长',
  },
  student_adult: {
    id: 1002,
    nickname: '李成人',
    phone: '13800000011',
    role: 'student',
    avatar: '',
    learnerType: 'adult',
  },
  parent: {
    id: 2001,
    nickname: '张家长',
    phone: '13800000002',
    role: 'parent',
    avatar: '',
    boundChildren: [{ id: 1001, name: '张小雨', age: 12, gradeZh: '初一' }],
  },
  teacher: { id: 3001, nickname: 'Aaron Smith', phone: '13800000003', role: 'teacher', avatar: '' },
  admin: { id: 4001, nickname: '系统管理员', phone: '13800000004', role: 'admin', avatar: '' },
}

export const ROLE_HOME: Record<string, string> = {
  student: '/student',
  student_adult: '/student',
  parent: '/parent',
  teacher: '/teacher',
  admin: '/admin',
}

/** 成年学员选择「也是家长」后写入绑定信息 */
export function enableAlsoParent() {
  const info = getUserInfo() || {}
  setUserInfo({
    ...info,
    alsoParent: true,
    boundChildren: [{ id: 1003, name: '李小明', age: 8, gradeZh: '小学二年级' }],
  })
}

/** Demo 登录：仅写 localStorage，不依赖后端。后端离线时由 index-fix.vue 调用 */
export function loginAsDemo(roleKey: string): DemoUser {
  const user = DEMO_USERS[roleKey]
  if (!user) throw new Error('未知角色')

  const storageRole = roleKey === 'student_adult' ? 'student' : roleKey
  const token = `demo-jwt-${roleKey}-${Date.now()}-pitch-mode-v1`
  saveAuthInfo({
    token,
    refreshToken: `demo-refresh-${user.id}`,
    role: storageRole,
    userInfo: { ...user, role: storageRole, status: 'active', authSource: 'demo' },
  })
  return user
}

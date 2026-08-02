/** 家庭绑定与学员类型 — Demo 角色模型 */

export type LearnerType = 'minor' | 'adult'

export interface BoundChild {
  id: number
  name: string
  age: number
  gradeZh: string
}

export interface UserProfile {
  learnerType?: LearnerType
  parentId?: number
  parentName?: string
  boundChildren?: BoundChild[]
  /** 成年学员登录时选择「也是家长」 */
  alsoParent?: boolean
}

export const FAMILY_BINDINGS = {
  minorStudent: { id: 1001, parentId: 2001, parentName: '张家长' },
  parent: { id: 2001, children: [{ id: 1001, name: '张小雨', age: 12, gradeZh: '初一' }] },
} as const

export function canAccessParentPortal(role: string | null, userInfo: UserProfile | null): boolean {
  return role === 'parent' || (role === 'student' && !!userInfo?.alsoParent)
}

export function canPurchase(role: string | null, userInfo: UserProfile | null): boolean {
  if (role === 'parent') return true
  if (canAccessParentPortal(role, userInfo)) return true
  if (role === 'student' && userInfo?.learnerType === 'adult') return true
  return false
}

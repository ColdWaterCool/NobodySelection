/** 教师文化活动申请 — Demo（localStorage 持久化） */

export interface ActivityApplication {
  id: string
  teacherId: number
  teacherName: string
  eventTitleZh: string
  eventTitleEn: string
  venueZh: string
  proposedDate: string
  slots: number
  roleZh: string
  status: 'pending' | 'approved' | 'rejected'
  statusZh: string
  submittedAt: string
}

const STORAGE_KEY = 'as_activity_applications'

const SEED: ActivityApplication[] = [
  {
    id: 'APP-001',
    teacherId: 3001,
    teacherName: 'Aaron Smith',
    eventTitleZh: '伦敦咖啡馆社交局',
    eventTitleEn: 'London Café Social',
    venueZh: '天河文化空间 A厅',
    proposedDate: '2026-07-12',
    slots: 12,
    roleZh: '咖啡馆店长 / 常客',
    status: 'pending',
    statusZh: '待审批',
    submittedAt: '2026-06-08',
  },
  {
    id: 'APP-002',
    teacherId: 3002,
    teacherName: 'Sarah Johnson',
    eventTitleZh: '纽约商务谈判模拟',
    eventTitleEn: 'NYC Negotiation Lab',
    venueZh: '联合办公沉浸厅',
    proposedDate: '2026-07-26',
    slots: 8,
    roleZh: '甲方采购经理',
    status: 'pending',
    statusZh: '待审批',
    submittedAt: '2026-06-09',
  },
  {
    id: 'APP-003',
    teacherId: 3003,
    teacherName: 'James Wilson',
    eventTitleZh: '悉尼户外自然英语',
    eventTitleEn: 'Sydney Outdoor English',
    venueZh: '城市公园合作场地',
    proposedDate: '2026-08-09',
    slots: 15,
    roleZh: '户外向导',
    status: 'approved',
    statusZh: '已通过',
    submittedAt: '2026-06-01',
  },
]

export function loadApplications(): ActivityApplication[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as ActivityApplication[]
  } catch { /* ignore */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
  return [...SEED]
}

export function saveApplications(list: ActivityApplication[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function submitApplication(app: Omit<ActivityApplication, 'id' | 'status' | 'statusZh' | 'submittedAt'>) {
  const list = loadApplications()
  const item: ActivityApplication = {
    ...app,
    id: `APP-${Date.now()}`,
    status: 'pending',
    statusZh: '待审批',
    submittedAt: new Date().toISOString().slice(0, 10),
  }
  list.unshift(item)
  saveApplications(list)
  return item
}

export function bulkUpdateStatus(ids: string[], status: 'approved' | 'rejected') {
  const list = loadApplications()
  const statusZh = status === 'approved' ? '已通过' : '已驳回'
  list.forEach((a) => {
    if (ids.includes(a.id)) {
      a.status = status
      a.statusZh = statusZh
    }
  })
  saveApplications(list)
  return list
}

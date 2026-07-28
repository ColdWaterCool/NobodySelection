/** 首页「与我们同行」合作申请 — Demo */

export interface PartnerInquiry {
  id: string
  orgName: string
  contactName: string
  phone: string
  email: string
  type: string
  typeZh: string
  message: string
  submittedAt: string
  status: 'new' | 'reviewed'
}

const STORAGE_KEY = 'as_partner_inquiries'

export const PARTNER_TYPES = [
  { value: 'school', labelZh: '学校 / 教育机构', labelEn: 'School' },
  { value: 'enterprise', labelZh: '企业培训', labelEn: 'Enterprise' },
  { value: 'venue', labelZh: '文化场地合作', labelEn: 'Venue' },
  { value: 'other', labelZh: '其他合作', labelEn: 'Other' },
]

export function loadInquiries(): PartnerInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as PartnerInquiry[]
  } catch { /* ignore */ }
  return []
}

export function submitInquiry(data: Omit<PartnerInquiry, 'id' | 'submittedAt' | 'status'>) {
  const list = loadInquiries()
  const item: PartnerInquiry = {
    ...data,
    id: `INQ-${Date.now()}`,
    submittedAt: new Date().toISOString().slice(0, 10),
    status: 'new',
  }
  list.unshift(item)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  return item
}

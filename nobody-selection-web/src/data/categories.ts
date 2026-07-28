/** 课程分类生态 — 大类 + 子类 */

export interface CourseSubCategory {
  id: string
  labelZh: string
  labelEn: string
}

export interface CourseCategory {
  id: string
  labelZh: string
  labelEn: string
  icon: string
  children: CourseSubCategory[]
}

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'early',
    labelZh: '幼儿英语',
    labelEn: 'Early Childhood',
    icon: '🧸',
    children: [
      { id: 'early-phonics', labelZh: '自然拼读', labelEn: 'Phonics' },
      { id: 'early-story', labelZh: '绘本启蒙', labelEn: 'Story Time' },
      { id: 'early-play', labelZh: '游戏互动', labelEn: 'Play-based' },
    ],
  },
  {
    id: 'youth',
    labelZh: '青少年英语',
    labelEn: 'Youth English',
    icon: '🎒',
    children: [
      { id: 'youth-foundation', labelZh: '启蒙英语', labelEn: 'Foundation' },
      { id: 'youth-speaking', labelZh: '口语表达', labelEn: 'Speaking' },
      { id: 'youth-reading', labelZh: '阅读理解', labelEn: 'Reading' },
      { id: 'youth-writing', labelZh: '写作训练', labelEn: 'Writing' },
      { id: 'youth-ielts', labelZh: '雅思备考', labelEn: 'IELTS Prep' },
      { id: 'youth-toefl', labelZh: '托福备考', labelEn: 'TOEFL Prep' },
    ],
  },
  {
    id: 'adult',
    labelZh: '成人英语',
    labelEn: 'Adult English',
    icon: '💼',
    children: [
      { id: 'adult-business', labelZh: '商务英语', labelEn: 'Business English' },
      { id: 'adult-abroad', labelZh: '出国英语', labelEn: 'Study Abroad' },
      { id: 'adult-ielts', labelZh: '雅思英语', labelEn: 'IELTS' },
      { id: 'adult-daily', labelZh: '日常口语', labelEn: 'Daily Conversation' },
      { id: 'adult-accent', labelZh: '发音矫正', labelEn: 'Accent Training' },
    ],
  },
]

export function getCategoryLabel(categoryId: string, subId: string) {
  const cat = COURSE_CATEGORIES.find((c) => c.id === categoryId)
  const sub = cat?.children.find((s) => s.id === subId)
  return {
    categoryZh: cat?.labelZh || '',
    categoryEn: cat?.labelEn || '',
    subZh: sub?.labelZh || '',
    subEn: sub?.labelEn || '',
  }
}

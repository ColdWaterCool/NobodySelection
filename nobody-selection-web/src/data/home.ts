/** 首页品牌与展示数据 */

export const BRAND = {
  nameEn: 'NobodySelection',
  nameZh: 'NobodySelection',
  slogan: 'One standard. Open to all.',
  sloganZh: '统一标准，向所有人开放',
  serviceTag: 'Open Teacher Credential & Matching Framework',
  serviceTagZh: '开源外教资格评定与匹配框架',
  positioning: 'Verifiable credentials · Offline verification · Learner-linked ratings',
  positioningZh: '可验证资格 · 线下核验联动 · 与学生评定挂钩',
  description:
    'NobodySelection explores a shared standard for foreign educator credentials — so institutions can verify, match, and improve teaching quality without locking into a single brand.',
  descriptionZh:
    'NobodySelection 探索外教资格的统一可验证标准：机构可核验、匹配并提升教学质量，而不绑定单一商业品牌——通向更共通的认证秩序。',
}

/** 介绍区文案；头像路径可选，缺省时界面显示占位 */
export const FOUNDER = {
  name: 'Open Maintainers',
  nameZh: '开源维护者',
  title: 'Community',
  titleZh: '社区',
  nationality: 'Global',
  nationalityZh: '全球',
  portrait: '',
  intro:
    'This project is open source. Brand images are optional — upload your own logo or portrait if you self-host. The core idea is a shared credential standard, not a personality brand.',
  introZh:
    '本项目开源。品牌图片为可选项——自托管时可自行上传 Logo 或头像。核心是可共享的资格标准，而非个人品牌。',
}

export const BRAND_PILLARS = [
  {
    label: 'Credential Standard',
    labelZh: '资格标准',
    desc: 'Shared rubric for foreign educator qualification',
    descZh: '外教资格评定的可复用标准与分级',
  },
  {
    label: 'Offline Linkage',
    labelZh: '线下联动',
    desc: 'Online records meet offline verification',
    descZh: '线上档案与线下核验、机构现场联动',
  },
  {
    label: 'Verifiable Proof',
    labelZh: '可验证凭证',
    desc: 'Web3-inspired credential records (extensible)',
    descZh: '类 Web3 的可验证资格记录（可扩展上链）',
  },
  {
    label: 'Learner Feedback Loop',
    labelZh: '学生评定闭环',
    desc: 'Credentials linked to learning outcomes & ratings',
    descZh: '资格与学生学习评价、口碑互相印证',
  },
]

export type TeacherPoolStatus = 'normal' | 'watch' | 'frozen'

export interface GoldTeacher {
  id: number
  name: string
  nationality: string
  nationalityZh: string
  specialty: string
  specialtyZh: string
  categoryId: string
  subCategoryId: string
  rating: number
  experience: string
  experienceZh: string
  degree: string
  degreeZh: string
  university: string
  universityZh: string
  avatar: string
  /** 认证综合分（演示） */
  certScore: number
  acceptRate: number
  joinedDays: number
  poolStatus: TeacherPoolStatus
}

export const GOLD_TEACHERS: GoldTeacher[] = [
  {
    id: 1,
    name: 'Aaron Smith',
    nationality: 'United States',
    nationalityZh: '美国',
    specialty: 'IELTS · Speaking',
    specialtyZh: '雅思 · 口语',
    categoryId: 'youth',
    subCategoryId: 'youth-ielts',
    rating: 5.0,
    experience: '12 yrs',
    experienceZh: '12 年教龄',
    degree: "Master's in TESOL",
    degreeZh: 'TESOL 硕士',
    university: 'Columbia University',
    universityZh: '哥伦比亚大学',
    avatar: '/images/teachers/teacher-01.jpg',
    certScore: 91,
    acceptRate: 0.92,
    joinedDays: 400,
    poolStatus: 'normal',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    nationality: 'United Kingdom',
    nationalityZh: '英国',
    specialty: 'Business English',
    specialtyZh: '商务英语',
    categoryId: 'adult',
    subCategoryId: 'adult-business',
    rating: 4.9,
    experience: '10 yrs',
    experienceZh: '10 年教龄',
    degree: "Master's in Applied Linguistics",
    degreeZh: '应用语言学硕士',
    university: 'University of Oxford',
    universityZh: '牛津大学',
    avatar: '/images/teachers/teacher-02.jpg',
    certScore: 78,
    acceptRate: 0.88,
    joinedDays: 280,
    poolStatus: 'normal',
  },
  {
    id: 3,
    name: 'Michael Brown',
    nationality: 'Canada',
    nationalityZh: '加拿大',
    specialty: 'Young Learners',
    specialtyZh: '少儿英语',
    categoryId: 'early',
    subCategoryId: 'early-play',
    rating: 4.8,
    experience: '8 yrs',
    experienceZh: '8 年教龄',
    degree: "Master's in Education",
    degreeZh: '教育学硕士',
    university: 'University of Toronto',
    universityZh: '多伦多大学',
    avatar: '/images/teachers/teacher-03.jpg',
    certScore: 52,
    acceptRate: 0.75,
    joinedDays: 45,
    poolStatus: 'watch',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    nationality: 'Australia',
    nationalityZh: '澳大利亚',
    specialty: 'TOEFL · Academic Writing',
    specialtyZh: '托福 · 学术写作',
    categoryId: 'youth',
    subCategoryId: 'youth-toefl',
    rating: 4.9,
    experience: '11 yrs',
    experienceZh: '11 年教龄',
    degree: "Master's in English Literature",
    degreeZh: '英国文学硕士',
    university: 'University of Melbourne',
    universityZh: '墨尔本大学',
    avatar: '/images/teachers/teacher-04.jpg',
    certScore: 68,
    acceptRate: 0.85,
    joinedDays: 120,
    poolStatus: 'normal',
  },
]

/** 推荐分 = 认证分×0.6 + 接单率×0.2 + 探索×0.2 */
export function calcRecommendScore(t: GoldTeacher): number {
  const explore = Math.min(100, 40 + t.joinedDays * 0.5)
  const accept = t.acceptRate * 100
  return Math.round((t.certScore * 0.6 + accept * 0.2 + explore * 0.2) * 10) / 10
}

export function isTeacherVisible(t: GoldTeacher): boolean {
  return t.poolStatus !== 'frozen'
}

export const SEARCH_PLACEHOLDER = {
  en: 'Search educators, subjects…',
  zh: '搜索外教、课程领域…',
}

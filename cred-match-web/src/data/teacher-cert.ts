/** 教师认证与综合评分模型（Demo） */

export const SCORE_WEIGHTS = [
  { key: 'education', labelZh: '学历背景', labelEn: 'Education', weight: 30, score: 92 },
  { key: 'judgement', labelZh: '教学评判', labelEn: 'Judgement Score', weight: 40, score: 96 },
  { key: 'activity', labelZh: '活动贡献', labelEn: 'Activity Plan', weight: 20, score: 88 },
  { key: 'hours', labelZh: '授课时长', labelEn: 'Working Hours', weight: 10, score: 94 },
]

export const CERT_TIERS = [
  { id: 'basic', labelZh: '基础级', labelEn: 'Basic', min: 30, max: 44, color: '#8a8a8a' },
  { id: 'silver', labelZh: '白银级', labelEn: 'Silver', min: 45, max: 59, color: '#7a8a9a' },
  { id: 'gold', labelZh: '黄金级', labelEn: 'Gold', min: 60, max: 74, color: '#3d6a9a' },
  { id: 'platinum', labelZh: '铂金级', labelEn: 'Platinum', min: 75, max: 89, color: '#2a5580' },
  { id: 'black', labelZh: '黑金级', labelEn: 'Black Gold', min: 90, max: 95, color: '#0c1a2e' },
] as const

export type CertTierId = (typeof CERT_TIERS)[number]['id']

export function calcCompositeScore(weights = SCORE_WEIGHTS) {
  return Math.round(
    weights.reduce((sum, w) => sum + (w.score * w.weight) / 100, 0) * 10,
  ) / 10
}

export function compositeToTier(score: number) {
  const clamped = Math.max(30, Math.min(95, score))
  const tier =
    CERT_TIERS.find((t) => clamped >= t.min && clamped <= t.max) ||
    CERT_TIERS[CERT_TIERS.length - 1]
  return { score: clamped, tier }
}

/** 生成演示用认证序列号（格式：AS-年份-区域-序号） */
export function generateCertSerial(teacherId: number) {
  return `AS-2026-GZ-${String(teacherId).padStart(5, '0')}`
}

export const CERT_STATUS = {
  labelZh: '金牌认证',
  labelEn: 'Gold Certified',
  renewNoteZh: '认证等级每半年根据综合评分更新（序列号终身唯一）',
  renewNoteEn: 'Grade renews every 6 months; serial number is permanent',
  validUntil: '2026-12-09',
}

export const RATING_SAMPLE_HINT_ZH =
  '评价样本不足时暂不纳入认证分；异常评价将经规则校验后降权'

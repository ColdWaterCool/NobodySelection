/**
 * 白皮书五维认证公式 V2（预埋，默认 UI 仍用 teacher-cert.ts 四维）
 * 融资后 Phase 1 切换；含小样本保护说明
 */

export const CERT_V2_WEIGHTS = [
  { key: 'tenure', labelZh: '教龄', weight: 25 },
  { key: 'qs', labelZh: 'QS 等级', weight: 20 },
  { key: 'rating', labelZh: '学生评分', weight: 25 },
  { key: 'repurchase', labelZh: '复购率', weight: 20 },
  { key: 'sessions', labelZh: '教学场次', weight: 10 },
] as const

export const MIN_RATINGS_FOR_CERT = 5

export function scoreTenure(years: number): number {
  return Math.min(92, Math.round((28 + (years / 25) * 64) * 10) / 10)
}

export function scoreQs(rank: 'top50' | 'top200' | 'top500' | 'none'): number {
  const map = { top50: 88, top200: 75, top500: 62, none: 45 }
  return map[rank]
}

export function scoreStudentRating(avgOutOf5: number): number {
  return Math.round((30 + (avgOutOf5 / 5) * 65) * 10) / 10
}

export function scoreRepurchase(ratePct: number): number {
  return Math.round((30 + ratePct * 0.65) * 10) / 10
}

export function scoreSessions(monthlySessions: number): number {
  return Math.min(95, Math.round((30 + (monthlySessions / 100) * 65) * 10) / 10)
}

export function calcCertV2(input: {
  years: number
  qs: 'top50' | 'top200' | 'top500' | 'none'
  rating: number
  ratingCount: number
  repurchasePct: number
  monthlySessions: number
}): number | null {
  if (input.ratingCount < MIN_RATINGS_FOR_CERT) return null
  const dims = [
    scoreTenure(input.years) * 0.25,
    scoreQs(input.qs) * 0.2,
    scoreStudentRating(input.rating) * 0.25,
    scoreRepurchase(input.repurchasePct) * 0.2,
    scoreSessions(input.monthlySessions) * 0.1,
  ]
  const raw = dims.reduce((a, b) => a + b, 0)
  return Math.max(30, Math.min(95, Math.round(raw * 10) / 10))
}

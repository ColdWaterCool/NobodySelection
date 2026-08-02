/** 阶梯抽成演示（对教学池 85% 部分，不接真实支付） */

import { compositeToTier, type CertTierId } from '@/data/teacher-cert'

export const COMMISSION_TIERS = [
  {
    id: 'new' as const,
    labelZh: '新入驻 / 观察池',
    poolMin: 22,
    poolMax: 25,
    fullRateMin: 18.7,
    fullRateMax: 21.25,
  },
  {
    id: 'mid' as const,
    labelZh: '白银～黄金',
    poolMin: 18,
    poolMax: 20,
    fullRateMin: 15.3,
    fullRateMax: 17,
  },
  {
    id: 'top' as const,
    labelZh: '铂金～黑金',
    poolMin: 12,
    poolMax: 15,
    fullRateMin: 10.2,
    fullRateMax: 12.75,
  },
]

export function tierToCommissionBand(tierId: CertTierId): (typeof COMMISSION_TIERS)[number] {
  if (tierId === 'basic' || tierId === 'silver') return COMMISSION_TIERS[0]
  if (tierId === 'gold') return COMMISSION_TIERS[1]
  return COMMISSION_TIERS[2]
}

/** 演示用：取档位中间值作为教学池抽成 % */
export function calcDemoPoolCommission(tierId: CertTierId): number {
  const band = tierToCommissionBand(tierId)
  return Math.round(((band.poolMin + band.poolMax) / 2) * 10) / 10
}

export function calcTeacherTakeFromPayment(
  payment: number,
  poolCommissionPct: number,
): { fund: number; teaching: number; platform: number; teacher: number } {
  const fund = Math.round(payment * 0.15 * 100) / 100
  const teaching = Math.round(payment * 0.85 * 100) / 100
  const platform = Math.round(teaching * (poolCommissionPct / 100) * 100) / 100
  const teacher = Math.round((teaching - platform) * 100) / 100
  return { fund, teaching, platform, teacher }
}

export function demoCommissionFromScore(score: number) {
  const cert = compositeToTier(score)
  const pct = calcDemoPoolCommission(cert.tier.id)
  return {
    score: cert.score,
    tier: cert.tier,
    poolCommissionPct: pct,
    example: calcTeacherTakeFromPayment(100, pct),
  }
}

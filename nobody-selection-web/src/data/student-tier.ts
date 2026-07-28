/** 学生分层、目标与奖励（Demo） */

import { FUND_SPLIT } from '@/data/fund-split'

export const REWARD_SPLIT = {
  parentPct: FUND_SPLIT.parentPct,
  schoolPct: FUND_SPLIT.teachingPct,
  labelZh: FUND_SPLIT.labelZh,
  labelEn: FUND_SPLIT.labelEn,
}

export const STUDENT_TIERS = [
  { id: 'bronze', labelZh: '青铜学员', labelEn: 'Bronze', minClasses: 0, color: '#8a6d4d' },
  { id: 'silver', labelZh: '白银学员', labelEn: 'Silver', minClasses: 20, color: '#7a8a9a' },
  { id: 'gold', labelZh: '黄金学员', labelEn: 'Gold', minClasses: 50, color: '#3d6a9a' },
  { id: 'platinum', labelZh: '铂金学员', labelEn: 'Platinum', minClasses: 100, color: '#0c1a2e' },
]

export const STUDENT_GOALS = [
  {
    id: 1,
    titleZh: '完成 10 节课',
    titleEn: '10 Classes',
    target: 10,
    current: 8,
    rewardZh: '文化沉浸兑换名额 +1',
    rewardEn: '+1 culture redemption slot',
  },
  {
    id: 2,
    titleZh: '升至白银学员',
    titleEn: 'Reach Silver',
    target: 20,
    current: 12,
    rewardZh: '专属学习报告 + 推荐位优先',
    rewardEn: 'Premium report + priority matching',
  },
  {
    id: 3,
    titleZh: '月度口语达标',
    titleEn: 'Monthly Speaking Goal',
    target: 8,
    current: 5,
    rewardZh: '学习基金权益加成',
    rewardEn: 'Learning fund bonus',
  },
]

export const AS_BADGE_MIN_CLASSES = 30

export function getCurrentTier(completedClasses: number) {
  const tiers = [...STUDENT_TIERS].reverse()
  return tiers.find((t) => completedClasses >= t.minClasses) || STUDENT_TIERS[0]
}

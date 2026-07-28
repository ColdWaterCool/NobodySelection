/** 文化沉浸计划 — 兑换名额制（Demo） */

export const CULTURE_PROGRAM = {
  nameZh: '文化沉浸计划',
  nameEn: 'Culture Immersion Program',
  taglineZh: '语言之外，看见真实的世界',
  taglineEn: 'Beyond language — experience authentic culture',
  studentRuleZh: '每完成 10 节正式课程，获得 1 次文化沉浸活动兑换名额；平台定期开放场次，报名自选时段、额满即止',
  studentRuleEn: 'Every 10 classes → 1 redemption slot; book platform-scheduled events',
  teacherRuleZh: '参与活动的认证教师获得双倍积分、综合评分加成及现金激励（另计，不从当节课教学费扣除）',
  teacherRuleEn: 'Hosts earn 2× points, rating boost & cash reward (separate from lesson fee)',
  conceptZh:
    '在真实场地中，外教扮演情境角色，学生以沉浸式体验完成跨文化对话。名额由平台统一排期，避免档期冲突与空场浪费。',
  conceptEn:
    'Platform-scheduled immersion events in real venues; learners redeem slots when ready.',
  creditValidityZh: '兑换名额有效期 6 个月，可累计；单场未满最低人数将合并至下一场次',
  minClassSize: 6,
  classesPerCredit: 10,
}

export const CULTURE_EVENTS = [
  {
    id: 1,
    titleZh: '伦敦咖啡馆社交局',
    titleEn: 'London Café Social',
    venueZh: '合作文化空间 · 天河',
    date: '2026-07-12',
    slots: 12,
    themeZh: '点餐、闲聊、英式幽默',
  },
  {
    id: 2,
    titleZh: '纽约商务谈判模拟',
    titleEn: 'NYC Negotiation Lab',
    venueZh: '联合办公沉浸厅',
    date: '2026-07-26',
    slots: 8,
    themeZh: '会议礼仪、提案陈述、异议处理',
  },
  {
    id: 3,
    titleZh: '悉尼户外自然英语',
    titleEn: 'Sydney Outdoor English',
    venueZh: '城市公园合作场地',
    date: '2026-08-09',
    slots: 15,
    themeZh: '自然观察、团队任务、文化故事',
  },
]

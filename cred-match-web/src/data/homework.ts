/** 作业中心 Demo 数据 */

export interface HomeworkItem {
  id: number
  titleZh: string
  titleEn: string
  teacher: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded'
  statusZh: string
  score?: string
}

export interface HomeworkAiInsight {
  overall: string
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  vocabulary: string[]
}

export const HOMEWORK_LIST: HomeworkItem[] = [
  {
    id: 1,
    titleZh: '雅思口语 Part2 录音',
    titleEn: 'IELTS Speaking Part 2 Recording',
    teacher: 'Aaron Smith',
    dueDate: '2026-06-10',
    status: 'pending',
    statusZh: '待提交',
  },
  {
    id: 2,
    titleZh: '商务邮件写作练习',
    titleEn: 'Business Email Writing',
    teacher: 'Sarah Johnson',
    dueDate: '2026-06-08',
    status: 'submitted',
    statusZh: '已提交 · 待批改',
  },
  {
    id: 3,
    titleZh: '听力精听 · TED 节选',
    titleEn: 'Listening · TED Excerpt',
    teacher: 'Aaron Smith',
    dueDate: '2026-06-05',
    status: 'graded',
    statusZh: '已批改',
    score: 'B+',
  },
]

export const HOMEWORK_DETAILS: Record<number, {
  briefZh: string
  briefEn: string
  requirements: string[]
  aiInsight: HomeworkAiInsight
}> = {
  1: {
    briefZh: '录制 2 分钟独白，描述一次难忘旅行经历，注意时态与连接词。',
    briefEn: 'Record a 2-min monologue about a memorable trip. Focus on tenses and linkers.',
    requirements: ['时长 1.5–2 分钟', '使用至少 3 个连接词', '上传 MP3 或视频'],
    aiInsight: {
      overall: '待提交 · 预估 B',
      strengths: ['课堂口语反应较快', '词汇量足以支撑旅行主题'],
      weaknesses: ['独白结构易散，缺少开头-展开-结尾', '过去完成时使用偏少'],
      suggestions: [
        '先用中文列三个时间节点，再转英文口述',
        '参考教师范例中的连接词模板',
        '提交前用 AI 自检发音连读',
      ],
      vocabulary: ['memorable', 'itinerary', 'highlight', 'in retrospect'],
    },
  },
  2: {
    briefZh: '撰写一封商务合作邀请邮件，语气正式、结构清晰。',
    briefEn: 'Write a formal partnership invitation email.',
    requirements: ['150–200 词', '包含 subject line', '结尾礼貌用语'],
    aiInsight: {
      overall: '已提交 · AI 预审 A-',
      strengths: ['段落层次清晰', '正式用语得体'],
      weaknesses: ['第二段略长，可拆句', '缺少明确的 CTA 时间'],
      suggestions: ['补充具体会议时间选项', 'Subject line 可更具体'],
      vocabulary: ['collaboration', 'mutual benefit', 'look forward to'],
    },
  },
  3: {
    briefZh: '精听 TED 节选，完成填空并复述关键句。',
    briefEn: 'TED listening gap-fill and key-sentence recap.',
    requirements: ['完成 10 空填空', '复述 3 句关键词', '标注不懂的生词'],
    aiInsight: {
      overall: 'B+ · 教师已批改',
      strengths: ['关键词抓取准确', '生词标注完整'],
      weaknesses: ['连读处仍有漏听', '复述句语法偶有小错'],
      suggestions: ['针对连读做 shadowing 练习', '下周加 1 节听力专项'],
      vocabulary: ['perspective', 'nuance', 'articulate'],
    },
  },
}

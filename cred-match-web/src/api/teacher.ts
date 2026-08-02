import request from '@/utils/request'

// 教师列表
export function getTeacherList(params: {
  page?: number
  pageSize?: number
  specialty?: string
  nationality?: string
  minRate?: number
  maxRate?: number
  sortBy?: string
}) {
  return request.get('/teachers', { params })
}

// 教师详情
export function getTeacherDetail(id: number) {
  return request.get(`/teachers/${id}`)
}

// 金牌教师列表
export function getGoldTeachers() {
  return request.get('/teachers/gold')
}

// 教师编辑个人信息
export function updateTeacherProfile(data: any) {
  return request.put('/teachers/profile', data)
}

// 教师设置可用时段
export function updateAvailability(data: any) {
  return request.put('/teachers/availability', data)
}

// 获取视频上传凭证
export function getVideoUploadToken() {
  return request.post('/teachers/video')
}

// 删除教学视频
export function deleteVideo(videoId: number) {
  return request.delete(`/teachers/video/${videoId}`)
}

// 教师收入统计
export function getIncomeStats(params?: { startDate?: string; endDate?: string }) {
  return request.get('/teachers/income/stats', { params })
}

// 教师收入明细
export function getIncomeRecords(params: { page?: number; pageSize?: number }) {
  return request.get('/teachers/income/records', { params })
}
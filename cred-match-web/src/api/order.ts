import request from '@/utils/request'

// 创建订单
export function createOrder(data: {
  packageId: number
  teacherId?: number
  studentId: number
}) {
  return request.post('/orders', data)
}

// 订单列表
export function getOrderList(params: {
  page?: number
  pageSize?: number
  status?: string
}) {
  return request.get('/orders', { params })
}

// 订单详情
export function getOrderDetail(id: number) {
  return request.get(`/orders/${id}`)
}

// 取消订单
export function cancelOrder(id: number) {
  return request.post(`/orders/${id}/cancel`)
}

// 创建支付
export function createPayment(orderId: number, paymentMethod: string) {
  return request.post('/payments/create', { orderId, paymentMethod })
}

// 申请退款
export function refundOrder(id: number, reason?: string) {
  return request.post(`/orders/${id}/refund`, { reason })
}

// 获取课时包列表
export function getPackages() {
  return request.get('/payments/packages')
}
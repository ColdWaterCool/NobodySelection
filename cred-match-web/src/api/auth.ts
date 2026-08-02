import request from '@/utils/request'

// 发送短信验证码
export function sendSmsCode(phone: string) {
  return request.post('/auth/send-sms', { phone })
}

// 手机号+验证码登录
export function loginBySms(phone: string, code: string, role?: string) {
  return request.post('/auth/sms-login', { phone, code, role })
}

// 手机号+密码登录
export function loginByPassword(phone: string, password: string) {
  return request.post('/auth/password-login', { phone, password })
}

// 获取微信授权URL
export function getWechatAuthUrl(state?: string) {
  return request.get('/auth/wechat', { params: { state } })
}

// 微信OAuth回调
export function wechatCallback(code: string) {
  return request.get('/auth/wechat/callback', { params: { code } })
}

// 刷新Token
export function refreshToken(refreshToken: string) {
  return request.post('/auth/refresh', { refreshToken })
}

// 退出登录
export function logout() {
  return request.post('/auth/logout')
}

// 获取当前用户信息
export function getCurrentUser() {
  return request.get('/auth/me')
}

// 开发模式快速登录（仅非生产环境）
// 联调：后端在线时优先调用；失败时由 index-fix.vue 回退 loginAsDemo()，不影响纯 Demo 演示
export function devLogin(phone: string, role: string) {
  return request.post('/auth/dev-login', { phone, role }, {
    headers: { 'X-Silent-Error': '1' },
    timeout: 3000,
  })
}

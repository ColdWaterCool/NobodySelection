const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_ROLE_KEY = 'userRole'
const USER_INFO_KEY = 'userInfo'

// Token 管理
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

// Refresh Token 管理
export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export function removeRefreshToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// 用户角色管理
export function getUserRole(): string | null {
  return localStorage.getItem(USER_ROLE_KEY)
}

export function setUserRole(role: string): void {
  localStorage.setItem(USER_ROLE_KEY, role)
}

export function removeUserRole(): void {
  localStorage.removeItem(USER_ROLE_KEY)
}

// 用户信息管理
export function getUserInfo(): any {
  const info = localStorage.getItem(USER_INFO_KEY)
  try {
    return info ? JSON.parse(info) : null
  } catch {
    return null
  }
}

export function setUserInfo(info: any): void {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(info))
}

export function removeUserInfo(): void {
  localStorage.removeItem(USER_INFO_KEY)
}

// 保存认证信息（登录时调用）
export function saveAuthInfo(data: {
  token: string
  refreshToken?: string
  role: string
  userInfo: any
}): void {
  setToken(data.token)
  if (data.refreshToken) {
    setRefreshToken(data.refreshToken)
  }
  setUserRole(data.role)
  setUserInfo(data.userInfo)
}

// 清除所有认证信息
export function clearAuth(): void {
  removeToken()
  removeRefreshToken()
  removeUserRole()
  removeUserInfo()
}

// 检查是否已登录
export function isAuthenticated(): boolean {
  const token = getToken()
  return !!token && token.length >= 20
}

/** 当前是否为纯前端 Demo token（非后端 JWT）。Demo 模式下业务页不走数据库 API */
export function isDemoToken(): boolean {
  const token = getToken()
  return !!token && token.startsWith('demo-jwt-')
}

// 检查用户角色
export function hasRole(role: string): boolean {
  return getUserRole() === role
}
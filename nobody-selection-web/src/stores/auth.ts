import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import { loginBySms, loginByPassword, getCurrentUser, logout as logoutApi } from '@/api/auth'
import {
  getToken,
  setToken,
  setRefreshToken,
  getUserRole,
  setUserRole,
  setUserInfo,
  clearAuth,
} from '@/utils/auth'
import router from '@/router'

export interface UserInfo {
  id: number
  phone: string
  nickname: string
  avatar: string
  role: string
  status: string | number
}

interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

interface LoginResult {
  user: UserInfo
  tokens: AuthTokens
}

function applyLoginResult(
  res: LoginResult,
  token: Ref<string | null>,
  userRole: Ref<string | null>,
  userInfo: Ref<UserInfo | null>,
) {
  token.value = res.tokens.accessToken
  userRole.value = res.user.role
  userInfo.value = res.user
  setToken(res.tokens.accessToken)
  setRefreshToken(res.tokens.refreshToken)
  setUserRole(res.user.role)
  setUserInfo(res.user)
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getToken())
  const userInfo = ref<UserInfo | null>(null)
  const userRole = ref<string | null>(getUserRole())

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => userRole.value === 'admin' || userRole.value === 'operator')

  async function loginBySmsAction(phone: string, code: string) {
    const res = (await loginBySms(phone, code)) as LoginResult
    applyLoginResult(res, token, userRole, userInfo)
    return res
  }

  async function loginByPasswordAction(phone: string, password: string) {
    const res = (await loginByPassword(phone, password)) as LoginResult
    applyLoginResult(res, token, userRole, userInfo)
    return res
  }

  async function fetchUserInfo() {
    const res = (await getCurrentUser()) as UserInfo
    userInfo.value = res
    userRole.value = res.role
    setUserRole(res.role)
    setUserInfo(res)
    return res
  }

  async function logout() {
    try {
      await logoutApi()
    } catch {
      // 忽略网络错误，仍清除本地状态
    } finally {
      token.value = null
      userInfo.value = null
      userRole.value = null
      clearAuth()
      router.push('/auth')
    }
  }

  function setUser(info: UserInfo) {
    userInfo.value = info
    userRole.value = info.role
    setUserRole(info.role)
    setUserInfo(info)
  }

  return {
    token,
    userInfo,
    userRole,
    isLoggedIn,
    isAdmin,
    loginBySmsAction,
    loginByPasswordAction,
    fetchUserInfo,
    logout,
    setUser,
  }
})

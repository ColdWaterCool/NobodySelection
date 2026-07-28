import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { showToast } from 'vant'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    
    // 统一响应格式: { code: 0, message: 'success', data: {} }
    if (res.code !== 0) {
      showToast(res.message || '请求失败')
      
      // Token 过期
      if (res.code === 40100) {
        localStorage.removeItem('token')
        localStorage.removeItem('userRole')
        window.location.href = '/auth'
      }
      
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    
    return res.data
  },
  (error) => {
    // 开发登录探测失败时静默，由调用方回退到演示模式
    if (error.config?.headers?.['X-Silent-Error']) {
      return Promise.reject(error)
    }
    const message = error.response?.data?.message || error.message || '网络错误'
    showToast(message)
    return Promise.reject(error)
  }
)

export default service
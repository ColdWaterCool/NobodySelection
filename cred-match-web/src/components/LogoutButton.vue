"<template>
  <button 
    @click="handleLogout" 
    class="logout-btn"
    :class="btnClass"
    :disabled="loading"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <span v-else>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { logout } from '@/utils/auth';

interface Props {
  text?: string;
  btnClass?: string;
  confirm?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  text: '退出登录',
  btnClass: '',
  confirm: true
});

const router = useRouter();
const loading = ref(false);

async function handleLogout() {
  if (loading.value) return;
  
  // 确认对话框
  if (props.confirm) {
    const confirmed = window.confirm('确定要退出登录吗？');
    if (!confirmed) return;
  }
  
  loading.value = true;
  
  try {
    // 清除登录信息
    logout();
    showToast('已退出登录');
    
    // 跳转到登录页
    await router.push('/auth');
  } catch (error) {
    console.error('退出登录失败:', error);
    showToast('退出登录失败');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.logout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ff4d4f;
  color: white;
}

.logout-btn:hover {
  background: #ff7875;
}

.logout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
"""
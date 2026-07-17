<template>
  <div class="loading-screen" :class="{ 'fade-out': isFadingOut }">
    <div class="loading-content">
      <div class="spinner"></div>
      <div class="loading-text">Starting FIRMAN OS...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['loaded']);
const isFadingOut = ref(false);

onMounted(() => {
  // Simulate loading time
  setTimeout(() => {
    isFadingOut.value = true;
    setTimeout(() => {
      emit('loaded');
    }, 500); // Wait for fade out animation
  }, 1500); // 1.5 seconds loading
});
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6; /* Light gray background to match the desktop theme */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.5s ease;
  font-family: 'Inter', sans-serif;
}

.loading-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6; /* Blue spinner */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #4b5563;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

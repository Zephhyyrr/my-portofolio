<template>
  <div class="loading-screen" :class="{ 'fade-out': isFadingOut }">
    <div class="loading-content">
      <div v-if="!isReady" class="spinner"></div>
      <div v-if="!isReady" class="loading-text">Starting FIRMAN OS...</div>
      
      <div v-if="isReady" class="welcome-container fade-in">
        <img src="/foto_firman.png" alt="Profile" class="profile-pic" />
        <h2 class="welcome-text">Firman Ardiansyah</h2>
        <v-btn
          color="primary"
          rounded="pill"
          size="large"
          class="enter-btn mt-4"
          @click="enterOS"
        >
          Masuk / Enter
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['loaded']);
const isFadingOut = ref(false);
const isReady = ref(false);

onMounted(() => {
  // Simulate loading time, then show the Enter button
  setTimeout(() => {
    isReady.value = true;
  }, 1500); // 1.5 seconds loading
});

const enterOS = () => {
  isFadingOut.value = true;
  setTimeout(() => {
    emit('loaded');
  }, 500); // Wait for fade out animation
};
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

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  border: 3px solid white;
}

.welcome-text {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.enter-btn {
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.fade-in {
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

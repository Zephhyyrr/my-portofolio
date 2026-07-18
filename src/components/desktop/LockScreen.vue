<template>
  <div 
    class="lock-screen"
    :class="{ 'is-dragging': isDragging }"
    :style="{ transform: `translateY(${translateY}px)` }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <div class="lock-content">
      <img src="/foto_firman.png" alt="Firman Ardiansyah" class="profile-pic" />
      <h1 class="user-name">Firman Ardiansyah</h1>
      <p class="instruction">Swipe up to unlock</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useSystemState } from '@/composables/useSystemState';

const { unlockSystem } = useSystemState();

const translateY = ref(0);
const isDragging = ref(false);
let startY = 0;

const startDrag = (e) => {
  isDragging.value = true;
  startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', onDragEnd);
};

const onDragMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
  
  const currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
  const diffY = currentY - startY;
  
  // Only allow dragging up
  if (diffY < 0) {
    translateY.value = diffY;
  }
};

const onDragEnd = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('touchmove', onDragMove);
  window.removeEventListener('touchend', onDragEnd);
  
  if (translateY.value < -150) {
    translateY.value = -window.innerHeight;
    setTimeout(() => {
      unlockSystem();
    }, 300);
  } else {
    translateY.value = 0;
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('mouseup', onDragEnd);
  window.removeEventListener('touchmove', onDragMove);
  window.removeEventListener('touchend', onDragEnd);
});
</script>

<style scoped>
.lock-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(30, 30, 32, 0.4);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: grab;
  user-select: none;
}

.lock-screen.is-dragging {
  transition: none;
  cursor: grabbing;
}

.lock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.user-name {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.instruction {
  font-size: 0.9rem;
  opacity: 0.7;
  animation: pulse 2s infinite;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

@keyframes pulse {
  0% { opacity: 0.4; transform: translateY(0); }
  50% { opacity: 0.8; transform: translateY(-5px); }
  100% { opacity: 0.4; transform: translateY(0); }
}
</style>

<template>
  <div class="taskbar">
    <div class="start-button">
      <v-icon color="white">mdi-cat</v-icon>
    </div>
    
    <div class="open-apps">
      <div 
        v-for="win in windows.filter(w => w.isOpen)" 
        :key="win.id"
        class="taskbar-item"
        :class="{ active: win.isFocused }"
        @click="win.isMinimized ? openWindow(win.id) : focusWindow(win.id)"
      >
        <v-icon size="small" color="white">{{ win.icon }}</v-icon>
      </div>
    </div>

    <div class="system-tray">
      <!-- Music & Volume controls -->
      <div class="volume-container">
        <v-icon size="small" class="tray-icon" @click="showVolumeSlider = !showVolumeSlider">
          {{ musicState.volume === 0 ? 'mdi-volume-mute' : (musicState.volume > 50 ? 'mdi-volume-high' : 'mdi-volume-medium') }}
        </v-icon>
        <div v-if="showVolumeSlider" class="volume-popup">
          <span class="volume-percent">{{ musicState.volume }}%</span>
          <input type="range" class="volume-slider" orient="vertical" min="0" max="100" v-model="musicState.volume" />
        </div>
      </div>
      
      <v-icon size="small" class="tray-icon" :color="musicState.isVisible ? '#3498db' : '#555'" @click="toggleVisibility">
        mdi-music-note-outline
      </v-icon>

      <v-icon size="small" class="tray-icon">mdi-wifi</v-icon>
      <div class="tray-icon battery">
        <v-icon size="small">mdi-battery-80</v-icon>
        <span class="battery-text">85%</span>
      </div>
      <div class="tray-time">
        <div class="time">{{ currentTime }}</div>
        <div class="date">{{ currentDate }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useWindows } from '@/composables/useWindows';
import { useMusicState } from '@/composables/useMusicState';

const { windows, focusWindow, openWindow } = useWindows();
const { musicState, toggleVisibility } = useMusicState();

const showVolumeSlider = ref(false);

const currentTime = ref('');
const currentDate = ref('');
let timer = null;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  currentDate.value = now.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.taskbar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: rgba(230, 230, 240, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 9999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.start-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #2c3e50;
}
.start-button:hover {
  background-color: #34495e;
}

.open-apps {
  flex: 1;
  display: flex;
  gap: 8px;
  margin-left: 16px;
}

.taskbar-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.taskbar-item:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.taskbar-item.active {
  background-color: rgba(0, 0, 0, 0.8);
  border-bottom: 3px solid #3498db;
}

.system-tray {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #333;
}

.tray-icon {
  color: #555;
  cursor: pointer;
  transition: color 0.2s;
}
.tray-icon:hover {
  color: #000;
}

.volume-container {
  display: flex;
  align-items: center;
  position: relative;
}
.volume-popup {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(230, 230, 240, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}
.volume-percent {
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
}
.volume-slider {
  -webkit-appearance: slider-vertical;
  appearance: slider-vertical;
  width: 12px;
  height: 80px;
  background: #cbd5e1;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
}
.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  transition: transform 0.1s;
}
.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.battery {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.6rem;
  line-height: 1;
}

.tray-time {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
}
</style>

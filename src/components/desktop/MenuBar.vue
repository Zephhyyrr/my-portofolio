<template>
  <div class="mac-menubar">
    <div class="menu-left" ref="menuLeftEl">
      <div class="start-trigger-container" @click="showStartMenu = !showStartMenu">
        <div class="profile-trigger">
          <img src="/foto_firman.png" alt="Profile" class="menu-profile-pic" />
        </div>
        <span class="profile-name">Firman Ardiansyah</span>
      </div>
      <StartMenuPopup v-if="showStartMenu" @close="showStartMenu = false" />
    </div>
    
    <div class="menu-right">
      <!-- Music & Volume controls -->
      <div class="volume-container" ref="volumeContainerEl">
        <v-icon size="small" class="tray-icon" @click="showVolumeSlider = !showVolumeSlider">
          {{ musicState.volume === 0 ? 'mdi-volume-mute' : (musicState.volume > 50 ? 'mdi-volume-high' : 'mdi-volume-medium') }}
        </v-icon>
        <div v-if="showVolumeSlider" class="volume-popup">
          <span class="volume-percent">{{ musicState.volume }}%</span>
          <input type="range" class="volume-slider" orient="vertical" min="0" max="100" v-model="musicState.volume" />
        </div>
      </div>
      
      <v-icon size="small" :class="['tray-icon', { 'music-active': musicState.isVisible }]" @click="toggleVisibility">
        mdi-music-note-outline
      </v-icon>

      <v-icon size="small" class="tray-icon">mdi-wifi</v-icon>
      <div class="tray-icon battery">
        <v-icon size="small">mdi-battery-80</v-icon>
        <span class="battery-text">85%</span>
      </div>
      <div class="tray-time-container" ref="calendarContainerEl">
        <div class="tray-time" @click="showCalendar = !showCalendar">
          <div class="time">{{ currentTime }}</div>
          <div class="date">{{ currentDate }}</div>
        </div>
        
        <div v-if="showCalendar" class="calendar-popup">
          <v-date-picker color="primary" elevation="0"></v-date-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useMusicState } from '@/composables/useMusicState';
import StartMenuPopup from './StartMenuPopup.vue';

const { musicState, toggleVisibility } = useMusicState();

const showVolumeSlider = ref(false);
const showStartMenu = ref(false);
const showCalendar = ref(false);

const menuLeftEl = ref(null);
const volumeContainerEl = ref(null);
const calendarContainerEl = ref(null);

onClickOutside(menuLeftEl, () => {
  showStartMenu.value = false;
});

onClickOutside(volumeContainerEl, () => {
  showVolumeSlider.value = false;
});

onClickOutside(calendarContainerEl, () => {
  showCalendar.value = false;
});

const currentTime = ref('');
const currentDate = ref('');
let timer = null;

const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  currentDate.value = now.toLocaleDateString('id-ID', { weekday: 'short', day: '2-digit', month: 'short' });
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
.mac-menubar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: rgba(250, 250, 252, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 10000;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 0.85rem;
  color: #333;
  border-top: 1px solid rgba(0,0,0,0.1);
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.menu-left {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.start-trigger-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}
.start-trigger-container:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.profile-trigger {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.1);
  transition: transform 0.1s;
}

.start-trigger-container:active .profile-trigger {
  transform: scale(0.9);
}

.menu-profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: white;
}

.profile-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  user-select: none;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 500;
}

.tray-icon {
  color: #555;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}
.tray-icon:hover {
  color: #000;
}

.music-active {
  color: #3498db !important;
}

.volume-container {
  display: flex;
  align-items: center;
  position: relative;
}

.volume-popup {
  position: absolute;
  bottom: 56px; /* Pop upwards */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(250, 250, 252, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05);
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

.battery {
  display: flex;
  align-items: center;
  gap: 4px;
}
.battery-text {
  font-size: 0.75rem;
}

.tray-time {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.tray-time:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.tray-time-container {
  position: relative;
}

.calendar-popup {
  position: absolute;
  bottom: 56px;
  right: 0;
  background-color: rgba(250, 250, 252, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0,0,0,0.05);
  overflow: hidden;
  z-index: 10001;
}

</style>

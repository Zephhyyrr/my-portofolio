<template>
  <div class="start-menu-popup" @click.stop>
    <div class="pinned-section">
      <div class="section-title">PINNED APPS</div>
      <div class="apps-grid">
        <div 
          v-for="win in windows" 
          :key="win.id"
          class="app-item"
          @click="handleAppClick(win.id)"
        >
          <div class="app-icon-wrapper">
            <v-icon size="32" :color="win.id === 'linkedin' ? '#0a66c2' : (win.id === 'music' ? '#a759cf' : '#008080')">
              {{ win.icon }}
            </v-icon>
          </div>
          <div class="app-title">{{ win.title }}</div>
        </div>
      </div>
    </div>

    <div class="user-section">
      <div class="user-info">
        <img src="/foto_firman.png" alt="User" class="mini-profile-pic" />
        <div class="user-name">
          <div class="first-name">Firman</div>
          <div class="last-name">Ardiansyah</div>
        </div>
      </div>
      
      <div class="system-icons">
        <v-icon size="small" class="sys-icon" color="#2563eb" title="About Me (ID)" @click="handleSysClick('about')">mdi-card-account-details-outline</v-icon>
        <v-icon size="small" class="sys-icon" :color="isDarkMode ? '#a78bfa' : '#f59e0b'" title="Toggle Dark Mode" @click="handleSysClick('theme')">mdi-weather-night</v-icon>
        <v-icon size="small" class="sys-icon" color="#475569" title="Lock Screen" @click="handleSysClick('lock')">mdi-lock-outline</v-icon>
        <v-icon size="small" class="sys-icon" color="#475569" title="Restart" @click="handleSysClick('restart')">mdi-restart</v-icon>
        <v-icon size="small" class="sys-icon" color="#ef4444" title="Power Off" @click="handleSysClick('power')">mdi-power</v-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWindows } from '@/composables/useWindows';
import { useTheme } from '@/composables/useTheme';
import { useSystemState } from '@/composables/useSystemState';

const emit = defineEmits(['close']);
const { windows, focusWindow, openWindow } = useWindows();
const { isDarkMode, toggleDarkMode } = useTheme();
const { lockSystem, requestShutdown } = useSystemState();

const handleAppClick = (id) => {
  const win = windows.find(w => w.id === id);
  if (win.isMinimized || !win.isOpen) {
    openWindow(id);
  } else {
    focusWindow(id);
  }
  emit('close');
};

const handleSysClick = (action) => {
  switch(action) {
    case 'about':
      handleAppClick('about');
      break;
    case 'theme':
      toggleDarkMode();
      break;
    case 'lock':
      lockSystem();
      emit('close');
      break;
    case 'restart':
      window.location.reload();
      break;
    case 'power':
      requestShutdown();
      emit('close');
      break;
  }
};
</script>

<style scoped>
.start-menu-popup {
  position: absolute;
  bottom: 56px;
  left: 12px;
  width: 380px;
  background-color: rgba(250, 250, 252, 0.85);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255,255,255,0.4) inset;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Inter', -apple-system, sans-serif;
  z-index: 10001;
}

.pinned-section {
  padding: 24px;
}

.section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.1s;
}

.app-item:hover {
  transform: scale(1.05);
}

.app-item:active {
  transform: scale(0.95);
}

.app-icon-wrapper {
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.app-title {
  font-size: 0.75rem;
  color: #334155;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.user-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background-color: rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(0,0,0,0.05);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(0,0,0,0.1);
  background-color: white;
}

.user-name {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.first-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
}

.last-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #475569;
}

.system-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sys-icon {
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

.sys-icon:hover {
  opacity: 0.7;
}

.sys-icon:active {
  transform: scale(0.9);
}
</style>

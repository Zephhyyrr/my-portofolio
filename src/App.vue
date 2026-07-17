<template>
  <div class="desktop-environment">
    <LoadingScreen v-if="isLoading" @loaded="handleLoaded" />

    <div v-show="!isLoading" class="desktop-background" :style="{ backgroundImage: `url('${currentBackground}')` }">
      <MenuBar />
      
      <div class="desktop-icons-container">
        <DesktopIcon 
          v-for="win in desktopWindows" 
          :key="win.id" 
          :windowData="win" 
        />
      </div>

      <WeatherWidget />
      <StickyNote />
      <MusicPlayer />

      <WindowFrame 
        v-for="win in windows" 
        :key="win.id" 
        :windowData="win"
      >
        <component :is="getComponentForWindow(win.id)" :windowData="win" />
      </WindowFrame>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useWindows } from '@/composables/useWindows';
import { useTheme as useAppTheme } from '@/composables/useTheme';
import { useTheme as useVuetifyTheme } from 'vuetify';

import LoadingScreen from './components/LoadingScreen.vue';
import DesktopIcon from './components/desktop/DesktopIcon.vue';
import WindowFrame from './components/desktop/WindowFrame.vue';
import MenuBar from './components/desktop/MenuBar.vue';
import WeatherWidget from './components/widgets/WeatherWidget.vue';
import StickyNote from './components/widgets/StickyNote.vue';
import MusicPlayer from './components/widgets/MusicPlayer.vue';

import AboutSection from './components/section/AboutSection.vue';
import PortofolioSection from './components/section/PortofolioSection.vue';
import CertificateSection from './components/section/CertificateSection.vue';
import TechStackSection from './components/section/TechStackSection.vue';
import LinkedInSection from './components/section/LinkedInSection.vue';

const { windows } = useWindows();
const { isDarkMode } = useAppTheme();
const vuetifyTheme = useVuetifyTheme();

watch(isDarkMode, (newVal) => {
  vuetifyTheme.global.name.value = newVal ? 'dark' : 'light';
}, { immediate: true });

// Show all icons except music which is already a widget, but wait, music is an icon in the screenshot.
const desktopWindows = computed(() => windows);

const isLoading = ref(true);

const backgrounds = [
  'https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2069&auto=format&fit=crop', // original
  'https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop', // dark aesthetic
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop', // abstract gradient
  'https://images.unsplash.com/photo-1495110314580-48a98404a3f9?q=80&w=2076&auto=format&fit=crop', // modern minimal dark
  'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2070&auto=format&fit=crop'  // artistic dark gradient
];
const currentBackground = ref(backgrounds[Math.floor(Math.random() * backgrounds.length)]);

const handleLoaded = () => {
  isLoading.value = false;
};

const getComponentForWindow = (id) => {
  switch (id) {
    case 'about':
      return AboutSection;
    case 'projects':
      return PortofolioSection;
    case 'certificates':
      return CertificateSection;
    case 'techstack':
      return TechStackSection;
    case 'linkedin':
      return LinkedInSection;
    default:
      return null;
  }
};
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; 
  height: 100dvh;
  width: 100vw;
  font-family: 'Inter', sans-serif;
}

.desktop-environment {
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}

.desktop-background {
  width: 100vw;
  height: 100dvh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
}

.desktop-icons-container {
  padding: 20px;
  margin-top: 0; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  height: calc(100dvh - 48px); /* Adjust for bottom Taskbar */
  flex-wrap: wrap; 
}

/* Override Vuetify global styles if they mess up the layout */
.v-application {
  background: transparent !important;
}
.v-application__wrap {
  min-height: 100dvh !important;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Dark Theme Global Styles */
body.dark-theme .desktop-background {
  background-color: #121212;
}

body.dark-theme .mac-menubar {
  background-color: rgba(30, 30, 30, 0.7) !important;
  color: #ffffff !important;
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
}

body.dark-theme .profile-name,
body.dark-theme .tray-icon:not(.music-active),
body.dark-theme .system-tray,
body.dark-theme .tray-time,
body.dark-theme .time,
body.dark-theme .date,
body.dark-theme .battery-text {
  color: #ffffff !important;
}

body.dark-theme .tray-icon:hover {
  color: #e2e8f0 !important;
}

body.dark-theme .start-trigger-container:hover,
body.dark-theme .tray-time:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

body.dark-theme .start-menu-popup {
  background-color: rgba(30, 30, 32, 0.85) !important;
  color: #f1f5f9 !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset !important;
}

body.dark-theme .user-section {
  background-color: rgba(0, 0, 0, 0.3) !important;
  border-top: 1px solid rgba(255,255,255,0.1) !important;
}

body.dark-theme .app-title, body.dark-theme .section-title, body.dark-theme .first-name, body.dark-theme .last-name {
  color: #f1f5f9 !important;
}

body.dark-theme .browser-window {
  background-color: rgba(30, 30, 32, 0.85) !important;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset !important;
}

body.dark-theme .browser-toolbar {
  background-color: rgba(40, 40, 42, 0.5) !important;
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
}

body.dark-theme .browser-content {
  background-color: rgba(30, 30, 32, 0.95) !important;
  color: #f1f5f9 !important;
}

body.dark-theme .active-tab {
  background-color: rgba(40, 40, 42, 0.8) !important;
  color: #f1f5f9 !important;
}

body.dark-theme .inactive-tab {
  color: #94a3b8 !important;
}

body.dark-theme .address-bar {
  background-color: rgba(0, 0, 0, 0.4) !important;
  color: #f1f5f9 !important;
}

body.dark-theme .nav-buttons {
  color: #94a3b8 !important;
}

body.dark-theme .nav-btn:hover {
  color: #f1f5f9 !important;
}

body.dark-theme .close-tab:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

body.dark-theme .new-tab-btn {
  color: #94a3b8 !important;
}

body.dark-theme .new-tab-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* Portofolio & Certificate Cards Dark Mode */
body.dark-theme .gradient-text {
    color: #f1f5f9;
}
body.dark-theme .subtitle {
    color: #94a3b8;
}
body.dark-theme .project-card, 
body.dark-theme .certificate-card, 
body.dark-theme .tech-item {
    background-color: #1e1e20 !important;
    border-color: #3f3f46 !important;
}
body.dark-theme .project-card .v-card-title,
body.dark-theme .tech-name,
body.dark-theme .certificate-card .text-subtitle-1 {
    color: #f1f5f9 !important;
}
body.dark-theme .project-card .v-card-subtitle,
body.dark-theme .description-text,
body.dark-theme .certificate-card .text-caption,
body.dark-theme .certificate-card .text-body-2,
body.dark-theme .certificate-card .v-card-subtitle {
    color: #94a3b8 !important;
}
body.dark-theme .dialog-card {
    background-color: #1e1e20 !important;
}
body.dark-theme .dialog-title,
body.dark-theme .dialog-card .text-subtitle-1 {
    color: #f1f5f9 !important;
}
body.dark-theme .dialog-card .v-card-subtitle,
body.dark-theme .full-description {
    color: #94a3b8 !important;
}
body.dark-theme .tech-chip {
    background-color: #3f3f46 !important;
    color: #f1f5f9 !important;
}
body.dark-theme .demo-btn {
    color: #60a5fa !important;
}
body.dark-theme .demo-btn:hover {
    background-color: rgba(96, 165, 250, 0.1) !important;
}

/* About Me Dark Mode */
body.dark-theme .subtitle-text {
    color: #f1f5f9 !important;
}

/* LinkedIn Card Dark Mode */
body.dark-theme .linkedin-card {
    background-color: #1e1e20 !important;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5) !important;
}
body.dark-theme .linkedin-card .profile-name {
    color: #f1f5f9 !important;
}
body.dark-theme .linkedin-card .profile-title {
    color: #94a3b8 !important;
}
body.dark-theme .linkedin-card .alert-box {
    background-color: rgba(37, 99, 235, 0.15) !important;
    border-color: rgba(37, 99, 235, 0.3) !important;
    color: #93c5fd !important;
}
</style>

<template>
  <v-app class="desktop-environment">
    <LoadingScreen v-if="isLoading" @loaded="handleLoaded" />

    <div v-show="!isLoading" class="desktop-background">
      <img :src="currentBackground" class="desktop-bg-image" alt="background" />
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
      <MusicPlayer v-if="!isPoweredOff" />

      <WindowFrame 
        v-for="win in windows" 
        :key="win.id" 
        :windowData="win"
      >
        <component :is="getComponentForWindow(win.id)" :windowData="win" />
      </WindowFrame>
    </div>

    <!-- System Overlays -->
    <LockScreen v-if="isLocked" />
    <PowerScreen v-if="isPoweredOff" />

    <!-- Shutdown Confirmation Dialog -->
    <v-dialog v-model="isShuttingDown" max-width="400" persistent>
      <v-card :theme="isDarkMode ? 'dark' : 'light'" class="rounded-xl pa-2">
        <v-card-title class="text-h6 font-weight-bold d-flex align-center">
          <v-icon color="error" class="mr-3">mdi-alert</v-icon>
          Shut Down
        </v-card-title>
        <v-card-text class="pt-2 pb-4">
          Are you sure you want to shut down the system?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="cancelShutdown">Cancel</v-btn>
          <v-btn color="error" variant="flat" class="px-6 rounded-lg" @click="confirmShutdown">Shut Down</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
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
import LockScreen from './components/desktop/LockScreen.vue';
import PowerScreen from './components/desktop/PowerScreen.vue';

import { useSystemState } from './composables/useSystemState';

import AboutSection from './components/section/AboutSection.vue';
import PortofolioSection from './components/section/PortofolioSection.vue';
import CertificateSection from './components/section/CertificateSection.vue';
import TechStackSection from './components/section/TechStackSection.vue';
import LinkedInSection from './components/section/LinkedInSection.vue';
import ChatSection from './components/section/ChatSection.vue';

const { windows } = useWindows();
const { isDarkMode } = useAppTheme();
const vuetifyTheme = useVuetifyTheme();
const { isLocked, isShuttingDown, isPoweredOff, confirmShutdown, cancelShutdown } = useSystemState();

watch(isDarkMode, (newVal) => {
  vuetifyTheme.global.name.value = newVal ? 'dark' : 'light';
}, { immediate: true });

// Show all icons except music which is already a widget, but wait, music is an icon in the screenshot.
const desktopWindows = computed(() => windows);

const isLoading = ref(true);

const backgrounds = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop', // abstract colorful wave
  'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2070&auto=format&fit=crop', // artistic gradient
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2029&auto=format&fit=crop', // abstract purple gradient
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop'  // abstract colorful gradient
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
    case 'chat':
      return ChatSection;
    default:
      return null;
  }
};
</script>

<style src="@/assets/styles/app.css"></style>

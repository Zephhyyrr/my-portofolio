<template>
  <div>
    <LoadingScreen v-if="isLoading" @loaded="handleLoaded" @play-music="startMusic" />
    
    <v-app v-show="!isLoading" class="fade-in-app">
    <AppHeader />
    <v-main>
      <v-container class="app-container">
        <HomeSection />
        <AboutSection />
        <PortofolioSection />
        <MessageSection />
      </v-container>
    </v-main>

    <AppFooter />
    
    <!-- Floating Music Toggle Button -->
    <v-btn
      v-if="!isLoading"
      class="floating-music-btn"
      icon
      size="large"
      elevation="8"
      @click="toggleMusic"
      :color="isMusicPlaying ? '#a759cf' : 'grey-darken-3'"
    >
      <v-icon color="white" :class="{ 'spin-animation': isMusicPlaying }">
        {{ isMusicPlaying ? 'mdi-music' : 'mdi-music-off' }}
      </v-icon>
    </v-btn>
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PortofolioSection from './components/section/PortofolioSection.vue';
import HomeSection from './components/section/HomeSection.vue';
import AboutSection from './components/section/AboutSection.vue';
import MessageSection from './components/section/MessageSection.vue';
import LoadingScreen from './components/LoadingScreen.vue';

const isLoading = ref(true);
const isMusicPlaying = ref(false);
let bgmAudio = null;

onMounted(() => {
  // Pre-load the BGM audio object
  bgmAudio = new Audio('/music/bgm.mp3');
  bgmAudio.loop = true;
  bgmAudio.volume = 0.5; // Adjust volume if needed
});

const handleLoaded = () => {
  isLoading.value = false;
};

const startMusic = () => {
  if (bgmAudio) {
    bgmAudio.play().then(() => {
      isMusicPlaying.value = true;
    }).catch(e => console.error("Audio playback failed:", e));
  }
};

const toggleMusic = () => {
  if (!bgmAudio) return;
  
  if (isMusicPlaying.value) {
    bgmAudio.pause();
    isMusicPlaying.value = false;
  } else {
    bgmAudio.play().then(() => {
      isMusicPlaying.value = true;
    }).catch(e => console.error("Audio playback failed:", e));
  }
};

</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: auto;
  padding: 6px;
}

.fade-in-app {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.floating-music-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.floating-music-btn:hover {
  transform: scale(1.1);
}

.spin-animation {
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

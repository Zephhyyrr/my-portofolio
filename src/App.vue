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
    <button
      v-if="!isLoading"
      class="pixel-music-btn"
      :class="{ 'playing': isMusicPlaying }"
      @click="toggleMusic"
    >
      <v-icon :class="{ 'spin-animation': isMusicPlaying }">
        {{ isMusicPlaying ? 'mdi-music' : 'mdi-music-off' }}
      </v-icon>
    </button>
    </v-app>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PortofolioSection from './components/section/PortofolioSection.vue';
import HomeSection from './components/section/HomeSection.vue';
import AboutSection from './components/section/AboutSection.vue';
import MessageSection from './components/section/MessageSection.vue';
import LoadingScreen from './components/LoadingScreen.vue';

const isLoading = ref(true);
const isMusicPlaying = ref(false);
let bgmAudio = null;

const handleVisibilityChange = () => {
  if (!bgmAudio) return;
  
  if (document.hidden) {
    // Tab hidden: pause if it was playing, but don't change the state variable
    if (isMusicPlaying.value) {
      bgmAudio.pause();
    }
  } else {
    // Tab visible: resume playing if the state says it should be playing
    if (isMusicPlaying.value) {
      bgmAudio.play().catch(e => console.error("Audio playback failed on return:", e));
    }
  }
};

onMounted(() => {
  // Pre-load the BGM audio object
  bgmAudio = new Audio('/music/bgm.mp3');
  bgmAudio.loop = true;
  bgmAudio.volume = 0.5; // Adjust volume if needed
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
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

.pixel-music-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  width: 56px;
  height: 56px;
  background-color: #000;
  color: #757575; /* grey-darken-1 */
  border: 4px solid #757575;
  box-shadow: 4px 4px 0px #757575;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s ease;
}

.pixel-music-btn.playing {
  color: #a759cf;
  border-color: #a759cf;
  box-shadow: 4px 4px 0px #a759cf;
}

.pixel-music-btn:active {
  transform: translate(4px, 4px) !important;
  box-shadow: 0px 0px 0px transparent !important;
}

.pixel-music-btn:hover {
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

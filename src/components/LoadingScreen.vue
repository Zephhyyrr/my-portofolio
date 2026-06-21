<template>
  <div class="terminal-screen" :class="{ 'fade-out': isFadingOut }">
    <!-- Popup Modal -->
    <div v-if="showPopup" class="retro-popup">
      <div class="popup-content">
        <p class="popup-title">ENABLE BACKGROUND MUSIC?</p>
        <div class="popup-actions">
          <button class="pixel-btn" @click="handlePopup(true)">YES</button>
          <button class="pixel-btn" @click="handlePopup(false)">NO</button>
        </div>
      </div>
    </div>

    <!-- Terminal Content -->
    <div v-else class="terminal-content">
      <div v-for="(line, index) in visibleLines" :key="index" class="terminal-line">
        {{ line }}
      </div>
      <div class="terminal-line">
        <span v-if="!isBootComplete" class="cursor">_</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['loaded', 'play-music']);
const isFadingOut = ref(false);
const showPopup = ref(true);
const visibleLines = ref([]);
const isBootComplete = ref(false);

const terminalLines = [
  "FIRMAN OS v1.0 (C) 2024-2026 FIRMAN CORP",
  "CPU: FULLSTACK & AI ENGINEER @ 4.2 GHz",
  "MATH CO-PROCESSOR: INTEGRATED",
  "DETECTING CORE SKILLS...",
  "  MOBILE_UNIT: ANDROID JETPACK COMPOSE ... OK",
  "  FRONTEND UNIT: VUE.JS & NUXT.JS ... OK",
  "  BACKEND UNIT: NODE.JS & GOLANG ... OK",
  "  AI UNIT: PYTHON & MACHINE LEARNING ... OK",
  "MOUNTING PROJECT MODULES...",
  "  system_portfolio.sh ... MOUNTED",
  "  lib_mobile_apps.so ... ACTIVE",
  "  ai_vision_models.ko ... INSTALLED",
  "ESTABLISHING SECURE PROTOCOLS ... LEVEL 1 SAFE",
  "BOOTING OS..."
];

const handlePopup = (playMusic) => {
  showPopup.value = false;
  if (playMusic) {
    emit('play-music');
  }
  startBootSequence();
};

const startBootSequence = () => {
  let currentIndex = 0;

  const printLine = () => {
    if (currentIndex < terminalLines.length) {
      visibleLines.value.push(terminalLines[currentIndex]);
      currentIndex++;

      const delay = Math.random() * 250 + 50; // Faster typing
      setTimeout(printLine, delay);
    } else {
      isBootComplete.value = true;
      // Auto transition after finishing
      setTimeout(() => {
        finishLoading();
      }, 1000); // 1 second delay before auto-transition
    }
  };

  setTimeout(printLine, 500); // Small delay before boot starts
};

const finishLoading = () => {
  isFadingOut.value = true;
  setTimeout(() => {
    emit('loaded');
  }, 500);
};
</script>

<style scoped>
.terminal-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  color: #a759cf;
  z-index: 9999;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1.5rem;
  transition: opacity 0.5s ease;
  overflow-y: auto;
}

.terminal-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

/* Popup Styles */
.retro-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.popup-content {
  border: 4px solid #da62a0;
  background-color: #000;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 15px #da62a0;
  font-family: 'Press Start 2P', monospace;
}

.popup-title {
  color: #a759cf;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

/* Terminal Content */
.terminal-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  font-family: 'Press Start 2P', monospace;
  text-shadow: 0 0 4px rgba(167, 89, 207, 0.4);
}

.terminal-line {
  font-size: 0.75rem;
  /* Smaller font size */
  line-height: 1.8;
  margin-bottom: 0.5rem;
  text-align: left;
  white-space: pre-wrap;
}

.cursor {
  animation: blink 1s step-start infinite;
}

.pixel-btn {
  background-color: transparent;
  color: #da62a0;
  border: 2px solid #da62a0;
  padding: 0.8rem 1.5rem;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s;
}

.pixel-btn:hover {
  background-color: #da62a0;
  color: #000;
  box-shadow: 0 0 10px #da62a0;
}

@keyframes blink {

  0%,
  49% {
    opacity: 1;
  }

  50%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 600px) {
  .terminal-screen {
    padding: 1rem;
  }

  .terminal-line {
    font-size: 0.55rem;
  }

  .popup-title {
    font-size: 0.8rem;
  }

  .pixel-btn {
    font-size: 0.7rem;
    padding: 0.6rem 1rem;
  }
}
</style>

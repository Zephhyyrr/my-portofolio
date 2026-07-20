<template>
  <div class="music-player-widget" 
       :class="{ 'is-hidden': !musicState.isVisible, 'is-dragging': isDragging }"
       :style="[style, { position: 'fixed', zIndex: 100 }]"
       ref="widgetRef">
    <div class="player-header" ref="playerHeaderRef">
      <v-icon size="small" class="mr-2">mdi-music-note</v-icon>
      YOUTUBE PLAYLIST
      <v-icon size="small" class="close-btn" @click.stop="toggleVisibility">mdi-close</v-icon>
    </div>

    <div class="track-info">
      <div class="track-title">{{ currentTrack.title }}</div>
      <div class="track-artist">{{ currentTrack.artist }}</div>
    </div>

    <div class="controls">
      <v-icon class="control-btn" @click="prevTrack">mdi-skip-previous</v-icon>
      <div class="play-btn" @click="togglePlay">
        <v-icon color="black" size="28">{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
      </div>
      <v-icon class="control-btn" @click="nextTrack">mdi-skip-next</v-icon>
    </div>

    <div class="progress-section">
      <span class="time">{{ formatTime(currentTime) }}</span>
      <div class="progress-bar" @click="seek($event)">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <span class="time">{{ formatTime(duration) }}</span>
    </div>

    <!-- Hidden YouTube Player -->
    <div id="yt-player-container" style="position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;">
      <div id="yt-player"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useMusicState } from '@/composables/useMusicState';

const { musicState, toggleVisibility } = useMusicState();

const widgetRef = ref(null);
const playerHeaderRef = ref(null);

const getInitialPosition = () => {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  const w = window.innerWidth;
  const h = window.innerHeight;
  const widgetWidth = w > 768 ? 300 : Math.min(340, w - 32);
  const widgetHeight = 150; // approximate collapsed height
  
  const x = w > 768 ? w - 340 : (w - widgetWidth) / 2;
  const y = h - widgetHeight - 150; // start position
  
  return { x, y };
};

const { style, isDragging } = useDraggable(widgetRef, {
  initialValue: getInitialPosition(),
  handle: playerHeaderRef,
});


// Playlist - tambahkan video ID YouTube dan info lagu di sini
const playlist = ref([
  { videoId: 'bAoxY1jQnqo', title: 'bergema sampai selamanya', artist: 'Nadhif Basalamah' },
  { videoId: 'Zq1Jg0H5fzc', title: 'everything u are', artist: 'Hindia' },
  { videoId: 'xnALK28rQ1w', title: 'Bunga Maaf', artist: 'The Lantis' },
  { videoId: '4PgOJwUCdIc', title: 'About You', artist: 'The 1975' },
  { videoId: 'BrGElm2d9ck', title: 'Multo', artist: 'Cup of Joe' },
  { videoId: '5F28ye50-Kc', title: 'Teh Hijau', artist: 'Tulus' },
  { videoId: 'fKgoo_KT6aM', title: "You're On Your Own, Kid", artist: 'Taylor Swift' },
  { videoId: 'fFMPxt-XNIk', title: 'Message In A Bottle', artist: 'Taylor Swift' },
  { videoId: 'tW3KekLxXpg', title: 'Foto kita blur', artist: 'Sal Priadi' },
  { videoId: 'VaYlPJte3Jk', title: 'Running', artist: '가호 (Gaho)' },
  { videoId: 'ro3tNNE9wiw', title: 'Take A Chance With Me', artist: 'NIKI' },
  { videoId: 'iOYXNfc23pk', title: 'High School in Jakarta', artist: 'NIKI' },
  { videoId: 'c-8abSPAPOU', title: 'back to friends', artist: 'Sombr' },
  { videoId: 'BIAlNtIhajM', title: 'Backburner', artist: 'NIKI' },
  { videoId: '7SqC7_f_-0M', title: 'All Too Well (10 Minute Version)', artist: 'Taylor Swift' },
  { videoId: 'uWRwLfWwZe0', title: 'You & I', artist: 'One Direction' },
  { videoId: '2EiK3RnPu7A', title: 'Angin Rindu', artist: 'Rony Parulian' },
  { videoId: 'k1BfsO0mxWQ', title: 'Dan...', artist: 'Sheila On 7' }
]);

// Randomize first song
const currentIndex = ref(Math.floor(Math.random() * playlist.value.length));
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
let player = null;
let progressInterval = null;

const currentTrack = computed(() => playlist.value[currentIndex.value]);
const progressPercent = computed(() => duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0);

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => resolve();
  });
};

const initPlayer = async () => {
  await loadYouTubeAPI();
  player = new window.YT.Player('yt-player', {
    height: '1',
    width: '1',
    videoId: currentTrack.value.videoId,
    playerVars: {
      autoplay: 0, // Disable autoplay for consistency
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      origin: window.location.origin,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

const onPlayerReady = () => {
  duration.value = player.getDuration() || 0;
  player.setVolume(musicState.volume);
};

watch(() => musicState.volume, (newVolume) => {
  if (player && player.setVolume) {
    player.setVolume(newVolume);
  }
});

const onPlayerStateChange = (event) => {
  const state = event.data;
  if (state === window.YT.PlayerState.PLAYING) {
    isPlaying.value = true;
    duration.value = player.getDuration();
    startProgressTracking();
  } else if (state === window.YT.PlayerState.PAUSED) {
    isPlaying.value = false;
    stopProgressTracking();
  } else if (state === window.YT.PlayerState.ENDED) {
    isPlaying.value = false;
    stopProgressTracking();
    nextTrack();
  }
};

const startProgressTracking = () => {
  stopProgressTracking();
  progressInterval = setInterval(() => {
    if (player && player.getCurrentTime) {
      currentTime.value = player.getCurrentTime();
    }
  }, 500);
};

const stopProgressTracking = () => {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }
};

const togglePlay = () => {
  if (!player) return;
  if (isPlaying.value) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

const nextTrack = () => {
  currentIndex.value = (currentIndex.value + 1) % playlist.value.length;
  loadTrack();
};

const prevTrack = () => {
  currentIndex.value = (currentIndex.value - 1 + playlist.value.length) % playlist.value.length;
  loadTrack();
};

const loadTrack = () => {
  if (!player) return;
  currentTime.value = 0;
  player.loadVideoById(currentTrack.value.videoId);
};

const seek = (event) => {
  if (!player) return;
  const bar = event.currentTarget;
  const rect = bar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  player.seekTo(percent * duration.value, true);
};

onMounted(() => {
  initPlayer();
});

onBeforeUnmount(() => {
  stopProgressTracking();
  if (player && player.destroy) {
    player.destroy();
  }
});
</script>

<style scoped>
.music-player-widget {
  width: 300px;
  background-color: rgba(24, 24, 24, 0.92);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 16px;
  color: white;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.06);
  font-family: 'Inter', sans-serif;
  transform-origin: center center;
  transition: opacity 0.3s ease, visibility 0.4s;
}

.music-player-widget:not(.is-dragging) {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, visibility 0.4s;
}

.music-player-widget.is-hidden {
  transform: scale(0.8) !important;
  opacity: 0;
  visibility: hidden;
}

.player-header {
  cursor: grab;
}
.player-header:active {
  cursor: grabbing;
}


.player-header {
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  color: #aaa;
  margin-bottom: 16px;
  font-weight: 600;
}
.close-btn {
  margin-left: auto;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
}
.close-btn:hover {
  color: white;
}

.track-info {
  margin-bottom: 20px;
}
.track-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.3;
}
.track-artist {
  font-size: 0.85rem;
  color: #888;
  margin-top: 2px;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  margin-bottom: 16px;
}
.control-btn {
  color: white;
  cursor: pointer;
  font-size: 28px !important;
  transition: opacity 0.2s;
}
.control-btn:hover {
  opacity: 0.7;
}

.play-btn {
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.1s;
}
.play-btn:hover {
  transform: scale(1.05);
}
.play-btn:active {
  transform: scale(0.95);
}

.progress-section {
  display: flex;
  align-items: center;
  gap: 10px;
}
.time {
  font-size: 0.7rem;
  color: #888;
  min-width: 34px;
  font-variant-numeric: tabular-nums;
}
.progress-bar {
  flex: 1;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background-color: white;
  border-radius: 2px;
  transition: width 0.3s linear;
}

@media (max-width: 768px) {
  .music-player-widget {
    width: calc(100% - 32px);
    max-width: 340px;
  }
}
</style>

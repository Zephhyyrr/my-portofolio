<template>
  <div class="desktop-icon" @click="handleAction">
    <div class="icon-box" :class="windowData.id">
      <v-icon size="large" color="white">{{ windowData.icon }}</v-icon>
    </div>
    <div class="icon-label">{{ windowData.title }}</div>
  </div>
</template>

<script setup>
import { useWindows } from '@/composables/useWindows';
import { useMusicState } from '@/composables/useMusicState';

const props = defineProps({
  windowData: {
    type: Object,
    required: true
  }
});

const { openWindow, focusWindow } = useWindows();
const musicState = useMusicState();

const handleAction = () => {
  if (props.windowData.id === 'music') {
    musicState.toggleVisibility();
  } else {
    openWindow(props.windowData.id);
  }
};
</script>

<style scoped>
.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin-bottom: 24px;
  cursor: pointer;
  transition: transform 0.2s;
}

.desktop-icon:hover {
  transform: scale(1.05);
}

.icon-box {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.about {
  background-color: #4a90e2;
}
.projects {
  background-color: #2ecc71;
}
.linkedin {
  background-color: #2980b9;
}
.music {
  background-color: #9b59b6;
}
.certificates {
  background-color: #e67e22;
}
.techstack {
  background-color: #e74c3c;
}
.chat {
  background-color: #25d366;
}

.icon-label {
  color: white;
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>

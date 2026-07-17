<template>
  <div class="mac-dock-container">
    <div class="mac-dock">
      <div 
        v-for="win in windows" 
        :key="win.id"
        class="dock-item"
        @click="win.isMinimized ? openWindow(win.id) : focusWindow(win.id)"
      >
        <div class="dock-icon-wrapper">
          <v-icon size="36" color="#333">{{ win.icon }}</v-icon>
        </div>
        <div class="dock-dot" :class="{ 'is-open': win.isOpen }"></div>
        <div class="dock-tooltip">{{ win.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWindows } from '@/composables/useWindows';

const { windows, focusWindow, openWindow } = useWindows();
</script>

<style scoped>
.mac-dock-container {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 9999;
  pointer-events: none; /* Let clicks pass through container */
}

.mac-dock {
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 6px 10px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.4);
  height: 64px;
}

.dock-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  width: 50px;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* Liquid / Magnify Effect */
.dock-item:hover {
  width: 70px;
  transform: translateY(-10px);
}
.dock-item:hover .dock-icon-wrapper {
  width: 60px;
  height: 60px;
  transform: scale(1.2);
}

/* Sibling effects for true macOS liquid feel */
.dock-item:hover + .dock-item,
.dock-item:has(+ .dock-item:hover) {
  width: 60px;
  transform: translateY(-5px);
}
.dock-item:hover + .dock-item .dock-icon-wrapper,
.dock-item:has(+ .dock-item:hover) .dock-icon-wrapper {
  width: 50px;
  height: 50px;
  transform: scale(1.1);
}

.dock-icon-wrapper {
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  margin-bottom: 6px;
}

.dock-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color 0.2s;
  position: absolute;
  bottom: 0;
}

.dock-dot.is-open {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Tooltip */
.dock-tooltip {
  position: absolute;
  top: -45px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  white-space: nowrap;
  backdrop-filter: blur(4px);
}

.dock-tooltip::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgba(0, 0, 0, 0.6);
}

.dock-item:hover .dock-tooltip {
  opacity: 1;
}
</style>

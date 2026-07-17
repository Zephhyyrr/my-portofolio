<template>
  <div 
    v-show="windowData.isOpen && !windowData.isMinimized"
    ref="windowEl"
    class="browser-window"
    :class="{ 'is-maximized': windowData.isMaximized }"
    :style="windowStyle"
    @mousedown="focusWindow(windowData.id)"
  >
    <!-- Browser Top Bar (Draggable Area) -->
    <div ref="handleEl" class="browser-header">
      <!-- Tabs Area -->
      <div class="tabs-area" v-if="windowData.tabs">
        <div 
          v-for="tab in windowData.tabs" 
          :key="tab.id"
          class="active-tab"
          :class="{ 'inactive-tab': windowData.activeTabId !== tab.id }"
          @click.stop="setActiveTab(windowData.id, tab.id)"
        >
          <v-icon size="x-small" :color="windowData.id === 'linkedin' ? '#0a66c2' : '#333'" class="mr-2">{{ windowData.icon }}</v-icon>
          <span class="tab-title">{{ tab.title }}</span>
          <v-icon size="x-small" class="close-tab" @click.stop="closeTab(windowData.id, tab.id)">mdi-close</v-icon>
        </div>
        <div class="new-tab-btn" @click.stop="addNewTab(windowData.id)">
          <v-icon size="small">mdi-plus</v-icon>
        </div>
      </div>
      
      <!-- Fallback for windows without tabs -->
      <div class="tabs-area" v-else>
        <div class="active-tab">
          <v-icon size="x-small" :color="windowData.id === 'linkedin' ? '#0a66c2' : '#333'" class="mr-2">{{ windowData.icon }}</v-icon>
          <span class="tab-title">{{ windowData.title }}</span>
          <v-icon size="x-small" class="close-tab" @click.stop="closeWindow(windowData.id)">mdi-close</v-icon>
        </div>
      </div>
      
      <!-- Window Controls (macOS style on hover) -->
      <div class="window-controls">
        <div class="control-dot minimize" @click.stop="minimizeWindow(windowData.id)">
          <v-icon class="control-icon" size="12">mdi-minus</v-icon>
        </div>
        <div class="control-dot maximize" @click.stop="toggleMaximizeWindow(windowData.id)">
          <v-icon class="control-icon" size="12">
            {{ windowData.isMaximized ? 'mdi-window-restore' : 'mdi-plus' }}
          </v-icon>
        </div>
        <div class="control-dot close" @click.stop="closeWindow(windowData.id)">
          <v-icon class="control-icon" size="12">mdi-close</v-icon>
        </div>
      </div>
    </div>

    <!-- Browser Toolbar (Address Bar) -->
    <div class="browser-toolbar">
      <div class="nav-buttons">
        <v-icon size="small" class="nav-btn">mdi-arrow-left</v-icon>
        <v-icon size="small" class="nav-btn">mdi-arrow-right</v-icon>
        <v-icon size="small" class="nav-btn">mdi-refresh</v-icon>
        <v-icon size="small" class="nav-btn">mdi-home-outline</v-icon>
      </div>
      <div class="address-bar">
        <span class="url-text">{{ currentUrl }}</span>
      </div>
    </div>

    <!-- Window Content -->
    <div class="browser-content">
      <div v-show="!windowData.tabs || isComponentTabActive" class="content-wrapper">
        <slot></slot>
      </div>
      
      <!-- Render iframes for additional tabs -->
      <template v-if="windowData.tabs">
        <iframe 
          v-for="tab in iframeTabs" 
          :key="tab.id" 
          v-show="windowData.activeTabId === tab.id" 
          :src="tab.url" 
          class="tab-iframe"
        ></iframe>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useWindows } from '@/composables/useWindows';

const props = defineProps({
  windowData: {
    type: Object,
    required: true
  }
});

const { minimizeWindow, closeWindow, focusWindow, toggleMaximizeWindow, updateWindowPosition, setActiveTab, closeTab, addTabToWindow } = useWindows();

const currentUrl = computed(() => {
  if (props.windowData.tabs && props.windowData.activeTabId !== 'main') {
    const tab = props.windowData.tabs.find(t => t.id === props.windowData.activeTabId);
    if (tab && tab.url) return tab.url;
  }
  return `portfolio://${props.windowData.id}`;
});

const iframeTabs = computed(() => {
  if (!props.windowData.tabs) return [];
  return props.windowData.tabs.filter(t => t.type === 'iframe');
});

const isComponentTabActive = computed(() => {
  if (!props.windowData.tabs) return true;
  const tab = props.windowData.tabs.find(t => t.id === props.windowData.activeTabId);
  return tab ? tab.type === 'component' : false;
});

const addNewTab = (windowId) => {
  addTabToWindow(windowId, {
    id: 'tab-' + Date.now(),
    title: props.windowData.title,
    type: 'component'
  });
};

const windowEl = ref(null);
const handleEl = ref(null);

const { x, y } = useDraggable(windowEl, {
  initialValue: { x: props.windowData.x, y: props.windowData.y },
  handle: handleEl,
  onMove(position) {
     if (!props.windowData.isMaximized) {
         updateWindowPosition(props.windowData.id, position.x, position.y);
     }
  }
});

watch(() => props.windowData.x, (newX) => {
    if (!props.windowData.isMaximized) x.value = newX;
});
watch(() => props.windowData.y, (newY) => {
    if (!props.windowData.isMaximized) y.value = newY;
});

const windowStyle = computed(() => {
  if (props.windowData.isMaximized) {
    return {
      zIndex: props.windowData.zIndex,
      left: '0px',
      top: '0px', // Top of screen
      width: '100vw',
      height: 'calc(100vh - 48px)', // Leave room for bottom taskbar
      borderRadius: '0px'
    };
  }
  return {
    zIndex: props.windowData.zIndex,
    left: `${x.value}px`,
    top: `${Math.max(y.value, 0)}px`, // Constrain to below top edge
    width: `${props.windowData.width}px`,
    height: `${props.windowData.height}px`
  };
});
</script>

<style scoped>
.browser-window {
  position: absolute;
  background-color: rgba(250, 250, 252, 0.85);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.4) inset;
  transition: opacity 0.2s, border-radius 0.2s; /* Don't transition transform here if draggable is used */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.browser-window.is-maximized {
  box-shadow: none;
  border-radius: 0px;
}

.browser-header {
  height: 40px;
  background-color: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 12px 0 8px;
  cursor: grab;
  user-select: none;
}
.browser-window.is-maximized .browser-header {
  cursor: default; /* Disable grab cursor when maximized */
}
.browser-header:active {
  cursor: grabbing;
}
.browser-window.is-maximized .browser-header:active {
  cursor: default;
}

.tabs-area {
  display: flex;
  align-items: flex-end;
  height: 100%;
}

.active-tab {
  background-color: rgba(255, 255, 255, 0.6);
  height: 32px;
  min-width: 150px;
  max-width: 200px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 0.8rem;
  color: #333;
  box-shadow: 0 -1px 2px rgba(0,0,0,0.03);
  cursor: pointer;
  margin-right: 2px;
  backdrop-filter: blur(10px);
}

.inactive-tab {
  background-color: transparent;
  color: #555;
  box-shadow: none;
}
.inactive-tab:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.tab-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-tab {
  color: #888;
  cursor: pointer;
  border-radius: 50%;
  padding: 2px;
}
.close-tab:hover {
  background-color: #eee;
}

.new-tab-btn {
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  margin-left: 4px;
}
.new-tab-btn:hover {
  background-color: rgba(0,0,0,0.05);
  border-radius: 8px;
}

/* macOS style controls */
.window-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100%;
  padding-bottom: 12px; 
}

.control-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}
.control-icon {
  opacity: 0;
  color: rgba(0, 0, 0, 0.6);
  transition: opacity 0.2s;
  font-weight: bold;
}

.window-controls:hover .control-icon {
  opacity: 1;
}

.control-dot.minimize { background-color: #f1c40f; }
.control-dot.minimize:active { background-color: #d4ac0d; }

.control-dot.maximize { background-color: #2ecc71; }
.control-dot.maximize:active { background-color: #27ae60; }

.control-dot.close { background-color: #ff5f56; }
.control-dot.close:active { background-color: #e74c3c; }

.browser-toolbar {
  height: 48px;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-buttons {
  display: flex;
  gap: 12px;
  color: #5f6368;
}
.nav-btn {
  cursor: pointer;
}
.nav-btn:hover {
  color: #333;
}

.address-bar {
  flex: 1;
  background-color: #f1f3f4;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #5f6368;
  font-size: 0.85rem;
}

.browser-content {
  flex: 1;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.85);
  position: relative;
  display: flex; 
  flex-direction: column;
}

.browser-content::-webkit-scrollbar {
  width: 8px;
}
.browser-content::-webkit-scrollbar-track {
  background: transparent;
}
.browser-content::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.content-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
}

.tab-iframe {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}
</style>

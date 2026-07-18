import { reactive } from 'vue';

// Initialize with safe default values for SSR or before window is defined
const defaultX = typeof window !== 'undefined' ? window.innerWidth / 2 - 400 : 100;
const defaultY = typeof window !== 'undefined' ? window.innerHeight / 2 - 300 : 100;

const windowsState = reactive({
  windows: [
    { id: 'about', title: 'About Me', icon: 'mdi-account', isOpen: false, isMinimized: false, isMaximized: true, isFocused: false, zIndex: 10, x: defaultX, y: defaultY, width: 800, height: 600 },
    { 
      id: 'projects', title: 'Projects', icon: 'mdi-folder-multiple-image', isOpen: false, isMinimized: false, isMaximized: true, isFocused: false, zIndex: 10, x: defaultX + 50, y: defaultY + 50, width: 900, height: 700,
      tabs: [{ id: 'main', title: 'My Projects', type: 'component' }],
      activeTabId: 'main'
    },
    { id: 'certificates', title: 'Certificates', icon: 'mdi-certificate', isOpen: false, isMinimized: false, isMaximized: true, isFocused: false, zIndex: 10, x: defaultX + 100, y: defaultY + 100, width: 850, height: 650 },
    { id: 'techstack', title: 'Tech Stack', icon: 'mdi-layers', isOpen: false, isMinimized: false, isMaximized: true, isFocused: false, zIndex: 10, x: defaultX + 150, y: defaultY + 150, width: 800, height: 600 },
    { id: 'linkedin', title: 'LinkedIn', icon: 'mdi-linkedin', isOpen: false, isMinimized: false, isMaximized: false, isFocused: false, zIndex: 10, x: defaultX + 200, y: defaultY + 200, width: 800, height: 600 },
    { id: 'music', title: 'Music', icon: 'mdi-music', isOpen: false, isMinimized: false, isMaximized: false, isFocused: false, zIndex: 10, x: defaultX + 250, y: defaultY + 250, width: 400, height: 500 },
    { id: 'chat', title: 'Global Chat', icon: 'mdi-chat', isOpen: false, isMinimized: false, isMaximized: false, isFocused: false, zIndex: 10, x: defaultX + 300, y: defaultY + 100, width: 450, height: 650 }
  ],
  highestZIndex: 10,
});

export function useWindows() {
  const openWindow = (id) => {
    const win = windowsState.windows.find(w => w.id === id);
    if (win) {
      if (!win.isOpen) {
        win.isOpen = true;
      }
      if (win.isMinimized) {
        win.isMinimized = false;
      }
      focusWindow(id);
    }
  };

  const openBrowser = (url) => {
    const win = windowsState.windows.find(w => w.id === 'browser');
    if (win) {
      win.url = url;
      if (!win.isOpen) {
        win.isOpen = true;
      }
      focusWindow('browser');
    }
  };

  const addTabToWindow = (windowId, tabData) => {
    const win = windowsState.windows.find(w => w.id === windowId);
    if (win && win.tabs) {
      win.tabs.push(tabData);
      win.activeTabId = tabData.id;
    }
  };

  const closeTab = (windowId, tabId) => {
    const win = windowsState.windows.find(w => w.id === windowId);
    if (win && win.tabs) {
      const index = win.tabs.findIndex(t => t.id === tabId);
      if (index !== -1) {
        win.tabs.splice(index, 1);
        if (win.activeTabId === tabId) {
          win.activeTabId = win.tabs.length > 0 ? win.tabs[win.tabs.length - 1].id : null;
        }
      }
    }
  };

  const setActiveTab = (windowId, tabId) => {
    const win = windowsState.windows.find(w => w.id === windowId);
    if (win && win.tabs) {
      win.activeTabId = tabId;
    }
  };

  const closeWindow = (id) => {
    const win = windowsState.windows.find(w => w.id === id);
    if (win) {
      win.isOpen = false;
      win.isMinimized = false;
      win.isFocused = false;
    }
  };

  const closeAllWindows = () => {
    windowsState.windows.forEach(w => {
      w.isOpen = false;
      w.isMinimized = false;
      w.isFocused = false;
    });
  };

  const minimizeWindow = (id) => {
    const win = windowsState.windows.find(w => w.id === id);
    if (win) {
      win.isMinimized = true;
      win.isFocused = false;
    }
  };

  const toggleMaximizeWindow = (id) => {
    const win = windowsState.windows.find(w => w.id === id);
    if (win) {
      win.isMaximized = !win.isMaximized;
      focusWindow(id);
    }
  };

  const focusWindow = (id) => {
    const win = windowsState.windows.find(w => w.id === id);
    if (win) {
      windowsState.windows.forEach(w => w.isFocused = false);
      windowsState.highestZIndex += 1;
      win.zIndex = windowsState.highestZIndex;
      win.isFocused = true;
    }
  };
  
  const updateWindowPosition = (id, x, y) => {
      const win = windowsState.windows.find(w => w.id === id);
      if (win) {
          win.x = x;
          win.y = y;
      }
  };

  const updateWindowSize = (id, width, height) => {
      const win = windowsState.windows.find(w => w.id === id);
      if (win) {
          win.width = width;
          win.height = height;
      }
  };

  const updateWindowBounds = (id, x, y, width, height) => {
      const win = windowsState.windows.find(w => w.id === id);
      if (win) {
          if (x !== undefined) win.x = x;
          if (y !== undefined) win.y = y;
          if (width !== undefined) win.width = width;
          if (height !== undefined) win.height = height;
      }
  };

  return {
    windows: windowsState.windows,
    openWindow,
    openBrowser,
    addTabToWindow,
    closeTab,
    setActiveTab,
    closeWindow,
    closeAllWindows,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    updateWindowBounds
  };
}

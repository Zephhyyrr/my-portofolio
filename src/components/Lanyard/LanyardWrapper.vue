<!-- LanyardWrapper.vue -->
<template>
  <div class="container">
    <div ref="reactMountPoint" class="react-wrapper"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LanyardReact from './LanyardReact'; // Import your React component

export default defineComponent({
  name: 'LanyardWrapper',
  setup() {
    const reactMountPoint = ref(null);
    let root = null;

    onMounted(() => {
      if (reactMountPoint.value) {
        // Create a React root and render the React component
        root = ReactDOM.createRoot(reactMountPoint.value);
        root.render(React.createElement(LanyardReact, {}));
      }
    });

    onBeforeUnmount(() => {
      // Cleanup when the Vue component is unmounted
      if (root) {
        root.unmount();
      }
    });

    return {
      reactMountPoint
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.react-wrapper {
  width: 100%;
  height: 450px;
  position: relative;
  margin-right: 0;
  padding-right: 0;
  right: 0;
  z-index: 1000;
}
</style>

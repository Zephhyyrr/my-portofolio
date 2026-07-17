<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
    <iframe v-if="windowData.url" :src="windowData.url" style="flex: 1; width: 100%; border: none;"></iframe>
    <div v-else style="flex: 1; display: flex; align-items: center; justify-content: center; color: #888;">
      Membuka tautan...
    </div>
  </div>
</template>

<script setup>
defineProps({
  windowData: {
    type: Object,
    required: true
  }
});
</script>

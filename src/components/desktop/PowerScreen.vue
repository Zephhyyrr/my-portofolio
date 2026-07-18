<template>
  <div class="power-screen">
    <div class="power-button" @click="turnOn">
      <v-icon size="64" color="rgba(255, 255, 255, 0.7)">mdi-power</v-icon>
    </div>
  </div>
</template>

<script setup>
const turnOn = () => {
  window.location.reload();
};
</script>

<style scoped>
.power-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: #000000;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.power-button {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.power-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.7);
}

.power-button:active {
  transform: scale(0.95);
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

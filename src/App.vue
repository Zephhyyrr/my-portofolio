<template>
  <v-app>
    <AppHeader />

    <v-main>
      <v-container class="app-container">
        <PortofolioSection />
      </v-container>
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import PortofolioSection from './components/section/PortofolioSection.vue';

// Kosongkan jika tidak ada logic
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: auto;
  padding: 6px;
}
</style>

<template>
  <div class="header-container">
    <div class="lanyard-wrapper">
      <LanyardWrapper />
    </div>
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>
    <v-app-bar :elevation="0" class="retro-nav">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none"></v-app-bar-nav-icon>
        <v-app-bar-title class="retro-title">
          Firman Ardiansyah
        </v-app-bar-title>
      </template>

      <div class="nav-links-container">
        <div class="nav-links d-none d-sm-flex">
          <v-btn v-for="(item, index) in menuItems" :key="index" text @click="scrollToSection(item.section)"
            :class="{ 'active-link': activeSection === item.section }">
            {{ item.title }}
            <div class="underline" :class="{ 'active-underline': activeSection === item.section }"></div>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary location="left">
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index"
          @click="scrollToSection(item.section); drawer = false;"
          :class="{ 'active-mobile-link': activeSection === item.section }">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import LanyardWrapper from '../components/Lanyard/LanyardWrapper.vue';

const menuItems = [
  { title: 'Home', section: 'home' },
  { title: 'About', section: 'about' },
  { title: 'Portofolio', section: 'portofolio' },
  { title: 'Comments', section:"comments"}
];

const activeSection = ref('home');
const scrollProgress = ref(0);
const drawer = ref(false);

const scrollToSection = (section) => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const calculateScrollProgress = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (documentHeight > 0) {
    scrollProgress.value = (scrollTop / documentHeight) * 100;
  } else {
    scrollProgress.value = 0;
  }
};

const handleScroll = () => {
  const sections = ['home', 'about', 'portofolio', 'comments'];
  for (const section of sections) {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = 200;

      if (rect.top <= offset && rect.bottom >= offset) {
        activeSection.value = section;
        break;
      }
    }
  }

  calculateScrollProgress();
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.header-container {
  position: relative;
}

.retro-nav {
  background-color: #000 !important;
  border-bottom: 4px solid #333 !important;
}

.retro-title {
  font-family: 'Press Start 2P', monospace;
  color: #a759cf;
  font-size: 1.2rem;
  text-shadow: 2px 2px 0px #da62a0;
}

.progress-container {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: 6px;
  z-index: 999;
}

.progress-bar {
  height: 100%;
  background-color: #da62a0;
  width: 0%;
  transition: width 0.1s ease;
}

.nav-links-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.v-btn {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.7rem;
  color: #fff !important;
  letter-spacing: 0px;
}

.v-btn:hover {
  color: #a759cf !important;
}

.active-link {
  color: #da62a0 !important;
  text-shadow: 2px 2px 0px #333;
}

.active-underline {
  width: 100%;
  background-color: #da62a0;
  height: 4px;
}

.active-mobile-link {
  color: #da62a0 !important;
  background-color: #222;
  border-left: 4px solid #da62a0;
}

@media (max-width: 768px) {
  .lanyard-wrapper {
    left: 0;
  }
}

@media (max-width: 600px) {
  .lanyard-wrapper {
    display: none;
  }
}
</style>

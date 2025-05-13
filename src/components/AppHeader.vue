<template>
  <div>
    <v-app-bar :elevation="2" rounded>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-flex d-sm-none"></v-app-bar-nav-icon>
        <v-app-bar-title style="
  background: linear-gradient(to right, #a759cf, #da62a0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;">
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

    <div class="progress-container">
      <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>
    </div>

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

const menuItems = [
  { title: 'Home', section: 'home' },
  { title: 'About', section: 'about' },
  { title: 'Portofolio', section: 'portofolio' }
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
  const sections = ['home', 'about', 'portofolio'];
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
.progress-container {
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 999;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #a759cf, #da62a0);
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
  position: relative;
  padding-bottom: 6px;
  overflow: visible;
}

.underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: transparent;
  transition: width 0.3s ease;
}

.active-link {
  background: linear-gradient(to right, #a759cf, #da62a0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  font-weight: 500;
}

.active-underline {
  width: 100%;
  background: linear-gradient(to right, #a759cf, #da62a0);
}

.active-mobile-link {
  background: linear-gradient(to right, #a759cf, #da62a0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  font-weight: 500;
}

@media (max-width: 600px) {
  .progress-container {
    top: 56px;
  }
}
</style>

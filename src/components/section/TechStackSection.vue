<template>
  <div class="portfolio-container">
    <div class="header" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
      <h1 class="gradient-text">Tech Stack</h1>
      <p class="subtitle">
        Technologies and tools I work with
      </p>
    </div>

    <div class="tech-categories" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
      <div class="tech-items">
        <div v-for="(tech, techIndex) in techStack.items" :key="techIndex" class="tech-item" :data-aos="'zoom-in'"
          :data-aos-delay="100 + techIndex * 100">
          <div class="tech-icon" :style="{ backgroundColor: tech.color || '#f3f4f6' }">
            <v-icon size="x-large" :color="tech.iconColor || '#3b82f6'">{{ tech.icon }}</v-icon>
          </div>
          <span class="tech-name">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const techStack = {
  items: [
    { name: "Kotlin", icon: "mdi-language-kotlin" },
    { name: "Jetpack Compose", icon: "mdi-android", color: "#E8F5E9", iconColor: "#3DDC84" },
    { name: "Vue.js", icon: "mdi-vuejs", color: "#E8F5E9", iconColor: "#4FC08D" },
    { name: "JavaScript", icon: "mdi-language-javascript", color: "#FFF8E1", iconColor: "#F7DF1E" },
    { name: "TypeScript", icon: "mdi-language-typescript", color: "#E3F2FD", iconColor: "#3178C6" },
    { name: "Express.js", icon: "mdi-web", color: "#ECEFF1", iconColor: "#000000" },
    { name: "Laravel", icon: "mdi-laravel", color: "#FFEBEE", iconColor: "#FF2D20" },
    { name: "PostgreSQL", icon: "mdi-database", color: "#E0F7FA", iconColor: "#336791" },
    { name: "MySQL", icon: "mdi-database", color: "#E0F7FA", iconColor: "#00758F" },
    { name: "HTML5", icon: "mdi-language-html5", color: "#FFEBEE", iconColor: "#E34F26" },
    { name: "CSS", icon: "mdi-language-css3", color: "#E3F2FD", iconColor: "#1572B6" },
    { name: "Bootstrap", icon: "mdi-bootstrap", color: "#F3E5F5", iconColor: "#563D7C" },
    { name: "Golang", icon: "mdi-language-go", color: "#E0F7FA", iconColor: "#00ADD8" },
    { name: "Nuxt.js", icon: "mdi-nuxt", color: "#E8F5E9", iconColor: "#00C58E" },
    { name: "Firebase", icon: "mdi-firebase", color: "#FFF3E0", iconColor: "#FFCA28" },
  ]
};
</script>

<style scoped src="@/assets/styles/portofolio.css"></style>

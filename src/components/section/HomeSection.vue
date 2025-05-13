<template>
  <v-container class="portfolio-container" fluid>
    <v-row align="center">
      <v-col cols="12" md="6">
        <h1 class="gradient-text">Firman Ardiansyah</h1>
        <p class="gradient-text-subtitle">
          {{ typedText }}<span class="cursor">|</span>
        </p>
        <div class="mb-4">
          <v-btn class="custom-btn mr-3" variant="tonal" color="primary"
            href="https://drive.google.com/file/d/1XNcYCPg61dim3EiTpWwewGLOJJykhiGR/view?usp=sharing" target="_blank">
            My Resume
            <v-icon end>mdi-file-document</v-icon>
          </v-btn>

          <v-btn class="custom-btn-two" variant="tonal" color="primary"
            href="https://drive.google.com/file/d/1j9tz1XAvPYM5PFyhDzGH7Hdx0obZbV9Y/view?usp=sharing" target="_blank">
            My Portfolio
            <v-icon end>mdi-file-document</v-icon>
          </v-btn>
        </div>

        <!-- Ikon Sosial Media -->
        <div class="social-icons mt-7 pb-5">
          <h3 style="background: linear-gradient(to right, #8e8e8e, #c0c0c0);-webkit-background-clip: text;background-clip: text; -webkit-text-fill-color: transparent;">Let's Connect With Me</h3>
          <v-btn icon href="https://www.linkedin.com/in/firman-ardiansyah04" target="_blank" class="mr-2 custom-btn-two">
            <v-icon size="26" color="#ffffff">mdi-linkedin</v-icon>
          </v-btn>
          <v-btn icon href="https://github.com/Zephhyyrr" target="_blank" class="mr-2 custom-btn-two">
            <v-icon size="26" color="#ffffff">mdi-github</v-icon>
          </v-btn>
          <v-btn icon href="mailto:ardiansyahfirman2004@gmail.com" target="_blank" class="mr-2 custom-btn-two">
            <v-icon size="26" color="#ffffff">mdi-email</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="text-center">
        <div class="gif-wrapper">
          <img src="/images/gif/home.gif" alt="Animation" class="animated-gif" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const texts = ['Mobile Developer ', 'Frontend Developer ']
const typedText = ref('')
let textIndex = 0
let charIndex = 0
let isDeleting = false

function typeEffect() {
  const currentText = texts[textIndex]
  const speed = isDeleting ? 40 : 100

  if (isDeleting) {
    typedText.value = currentText.substring(0, charIndex--)
  } else {
    typedText.value = currentText.substring(0, charIndex++)
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true
      typeEffect()
    }, 1000)
    return
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
  }

  setTimeout(typeEffect, speed)
}

onMounted(() => {
  typeEffect()
})
</script>

<style scoped>
.gif-wrapper {
  width: 400px;
  height: 400px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}

.animated-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.portfolio-container {
  padding: 2rem 1rem;
}

.gradient-text {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(to right, #a759cf, #da62a0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.gradient-text-subtitle {
  font-size: 30px;
  font-weight: bold;
  background: linear-gradient(to right, #8e8e8e, #c0c0c0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 800px;
}

.cursor {
  display: inline-block;
  width: 1px;
  margin-left: 3px;
  background-color: #c0c0c0;
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.custom-btn {
  background-color: #a759cf !important;
  color: white !important;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #da62a0 !important;
}

.custom-btn-two {
  background-color: transparent !important;
  color: white !important;
  transition: background-color 0.3s ease;
}

.custom-btn-two:hover {
  background-color: #da62a0 !important;
}
</style>

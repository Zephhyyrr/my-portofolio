<template>
  <section id="home" class="section-container">
    <v-container class="container" fluid>
      <v-row align="center">
        <!-- Kiri -->
        <v-col
          cols="12"
          md="6"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <h1
            class="gradient-text"
            data-aos="fade-down"
            data-aos-delay="100"
            data-aos-duration="800"
          >
            Firman Ardiansyah
          </h1>
          <p
            class="gradient-text-subtitle"
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            {{ typedText }}<span class="cursor">|</span>
          </p>

          <div
            class="mb-4"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="900"
          >
            <v-btn
              class="custom-btn mr-3"
              variant="tonal"
              color="primary"
              href="https://drive.google.com/file/d/1Vn9o7Wi1OzMErVm0wtWxQGOT0WzkGlb1/view?usp=drive_link"
              target="_blank"
            >
              My Resume
              <v-icon end>mdi-file-document</v-icon>
            </v-btn>

            <v-btn
              class="custom-btn-two"
              variant="tonal"
              color="primary"
              href="https://drive.google.com/file/d/1lbILlBPvyoNXWHwposzlLYQzOCFC2327/view?usp=sharing"
              target="_blank"
            >
              My Portfolio
              <v-icon end>mdi-file-document</v-icon>
            </v-btn>
          </div>

          <div
            class="social-icons mt-7 pb-5"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            <h3
              style="
                background: linear-gradient(to right, #8e8e8e, #c0c0c0);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
              "
            >
              Let's Connect With Me
            </h3>

            <v-btn icon href="https://www.linkedin.com/in/firman-ardiansyah04" target="_blank" class="mr-2 custom-btn-two">
              <v-icon size="26" color="#ffffff">mdi-linkedin</v-icon>
            </v-btn>
            <v-btn icon href="https://github.com/Zephhyyrr" target="_blank" class="mr-2 custom-btn-two">
              <v-icon size="26" color="#ffffff">mdi-github</v-icon>
            </v-btn>
            <v-btn icon href="https://instagram.com/firman.ard04" target="_blank" class="mr-2 custom-btn-two">
              <v-icon size="26" color="#ffffff">mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon href="mailto:ardiansyahfirman2004@gmail.com" target="_blank" class="mr-2 custom-btn-two">
              <v-icon size="26" color="#ffffff">mdi-email</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Kanan -->
        <v-col
          cols="12"
          md="6"
          class="text-center"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="1200"
        >
          <div class="gif-wrapper">
            <img
              src="/images/gif/home.gif"
              alt="Animation"
              class="animated-gif"
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="1000"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const texts = ['Mobile Developer ', 'Frontend Developer ', 'UI/UX Designer ']
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
    },3000)
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
<style scoped src="@/assets/styles/styles.css"></style>
<style scoped>
.gif-wrapper {
  width: 400px;
  height: 400px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}

.gif-wrapper:hover {
  transform: scale(1.05) translateY(-8px) rotateZ(4deg);
  transition: transform 0.3s ease-in-out;
}

.animated-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.animated-gif:hover{
    border-color: #a759cf;
    transform: scale(1.05) translateY(-8px) rotateZ(4deg);
    cursor: pointer;
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

</style>

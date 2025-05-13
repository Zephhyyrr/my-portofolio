<template>
  <section id="portofolio" class="section-container">
  <div class="portfolio-container">
    <div class="header">
      <h1 class="gradient-text">Portfolio Showcase</h1>
      <p class="subtitle">
        Explore my journey through projects, certifications, and technical expertise
      </p>
    </div>

    <div class="tabs-container">
      <div class="tab" :class="{ active: activeTab === 'projects' }" @click="activeTab = 'projects'">
        <v-icon>mdi-code-braces</v-icon>
        <span>Projects</span>
      </div>
      <div class="tab" :class="{ active: activeTab === 'certificates' }" @click="activeTab = 'certificates'">
        <v-icon>mdi-certificate</v-icon>
        <span>Certificates</span>
      </div>
      <div class="tab" :class="{ active: activeTab === 'techstack' }" @click="activeTab = 'techstack'">
        <v-icon>mdi-layers</v-icon>
        <span>Tech Stack</span>
      </div>
    </div>

    <div v-if="activeTab === 'projects'" class="tab-content">
      <v-row>
        <v-col v-for="(project, index) in projects" :key="index" cols="12" sm="6" md="4">
          <v-card variant="outlined" class="project-card">
            <v-img :src="project.image" height="200px" cover></v-img>

            <v-card-title>
              {{ project.title }}
            </v-card-title>

            <v-card-subtitle>
              Role: {{ project.role }}
            </v-card-subtitle>

            <v-card-text class="description-text">
              {{ truncateText(project.description) }}
            </v-card-text>

            <v-card-actions>
              <v-btn class="custom-btn" variant="tonal" @click="showProjectDetails(project)">
                Details
                <v-icon class="ml-1">mdi-arrow-right</v-icon>
              </v-btn>
              <v-btn v-if="project.githubUrl" class="demo-btn" variant="text" :href="project.githubUrl" target="_blank">
                Github Link
                <v-icon class="ml-1">mdi-open-in-new</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="activeTab === 'certificates'" class="tab-content">
      <v-row>
        <v-col v-for="(certificate, index) in certificates" :key="index" cols="12" sm="6" md="4">
          <v-card variant="outlined" class="certificate-card">
            <v-img :src="certificate.image" contain class="certificate-img"></v-img>

            <v-card-title>
              {{ certificate.title }}
            </v-card-title>

            <v-card-subtitle>
              Issued by: {{ certificate.issuer }}
            </v-card-subtitle>

            <v-card-text>
              <p>{{ certificate.date }}</p>
              <p class="credential" v-if="certificate.credentialId">
                Credential ID: {{ certificate.credentialId }}
              </p>
            </v-card-text>

            <v-card-actions>
              <v-btn v-if="certificate.verifyUrl" class="verify-btn" variant="tonal" :href="certificate.verifyUrl"
                target="_blank">
                Verify
                <v-icon class="ml-1">mdi-check-circle</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="activeTab === 'techstack'" class="tab-content">
      <div class="tech-categories">
        <div class="tech-items">
          <div v-for="(tech, techIndex) in techStack.items" :key="techIndex" class="tech-item">
            <div class="tech-icon" :style="{ backgroundColor: tech.color || '#a759cf20' }">
              <v-icon size="x-large" :color="tech.iconColor || '#a759cf'">{{ tech.icon }}</v-icon>
            </div>
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialogVisible" max-width="800px">
      <v-card v-if="selectedProject" class="dialog-card">
        <v-img :src="selectedProject.image" height="250px" cover></v-img>
        <v-card-title class="dialog-title">{{ selectedProject.title }}</v-card-title>
        <v-card-subtitle>Role: {{ selectedProject.role }}</v-card-subtitle>
        <v-card-text>
          <p class="full-description">{{ selectedProject.description }}</p>
          <div v-if="selectedProject.technologies && selectedProject.technologies.length > 0"
            class="technologies-section">
            <h3>Technologies Used:</h3>
            <div class="technology-tags">
              <v-chip v-for="(tech, techIndex) in selectedProject.technologies" :key="techIndex" class="tech-chip">
                {{ tech }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="selectedProject.githubUrl" class="demo-btn" variant="text" :href="selectedProject.githubUrl"
            target="_blank">
            Github Link
            <v-icon class="ml-1">mdi-open-in-new</v-icon>
          </v-btn>
          <v-btn class="close-btn" variant="tonal" @click="dialogVisible = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('projects');
const dialogVisible = ref(false);
const selectedProject = ref(null);

// Projects data
const projects = [
  {
    title: "UrVoice App (On-Going Project)",
    role: "Mobile App Developer, UI/UX Designer",
    description: "UrVoice App is an application with the aim of improving public speaking in English through grammar correction. UrVoice App uses Whisper AI to convert speech-to-text and a locally executed Meta LLAMA 3.2 1B-Instruct model using python's Transformers library to analyze grammar errors. UrVoice App is built using Jetpack Compose with MVVM clean architecture.",
    image: "/images/UrVoiceApp.png",
    githubUrl: "https://github.com/Zephhyyrr/UrVoice-App",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Figma"],
  },
  {
    title: "UrVoice Backend (On-Going Project)",
    role: "Backend Developer",
    description: "UrVoice Backend is the backend component of the UrVoice application. It is built using Express.js and TypeScript, with PostgreSQL as the database managed through Prisma ORM as the main API. In addition, the backend also integrates a grammar analysis service developed using Flask, which interacts locally with the LLAMA Meta model.",
    image: "/images/UrVoiceBackend.png",
    githubUrl: "https://github.com/Zephhyyrr/Capstone-Project-Backend",
    technologies: ["Express.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Flask", "Postman"],

  },
  {
    title: "DermaSeer App",
    role: "Mobile App Developer, UI/UX Designer",
    description: "DermaSeer is a Smart Android Application to provide skincare recommendations to you, based on your acne type and skin problems using Generative AI and Machine Learning models for acne type with >90% accuracy. DermaSeer is built with MVVM architecture and has implemented Clean Architecture.",
    image: "/images/DermaSeer.png",
    githubUrl: "https://github.com/Zephhyyrr/DermaSeer-app",
    technologies: ["Kotlin", "MVVM", "Clean Architecture", "Figma"],
  },
  {
    title: "Book App",
    role: "Mobile App Developer",
    description: "Book App is an android application from api openlibrary.org. This application is built using MVVM architecture and has implemented Clean Architecture. Book App is built using kotlin xml and use modularization to separate the features.",
    image: "/images/BookApp.png",
    githubUrl: "https://github.com/Zephhyyrr/expert-submission",
    technologies: ["Kotlin", "XML", "MVVM", "Clean Architecture", "Modularization"],
  },
  {
    title: "PT. Rumpun Alam Indonesia Website",
    role: "Frontend Developer",
    description: "Static Corporate website for PT. Rumpun Alam Indonesia, a spice export company from West Sumatera",
    image: "/images/RAI.png",
    githubUrl: "https://github.com/Zephhyyrr/PT.RAI-company-profile",
    technologies: ["Vue.js", "Bootstrap"],
  },
  {
    title: "Pesona Simarasok",
    role: "Fullstack Developer",
    description: "Creating a Website with the Theme Halal Tourism. This project is a Talent Scouting Academy project of Politeknik Negeri Padang. Located in Simarasok, Baso, West Sumatra. I made this website with three other friends. We used the Laravel framework MySql for the database.",
    image: "/images/Simarasok.png",
    githubUrl: "https://simarasok.umkm-pnp.com/",
    technologies: ["Laravel", "MySQL", "PHP", "Bootstrap"],
  }
];

const certificates = [
  {
    title: "Bangkit Distinction Graduate Mobile Development Cohort 2024 Batch 2",
    issuer: "Google Indonesia",
    date: "January 2025",
    credentialId: "BA24/DIST/XXIV-01/A132B4KY1524",
    verifyUrl: "https://drive.google.com/file/d/1HFihQYq3WjZZTvQ0OeNIFgNauAAPF1fp/view?usp=sharing",
    image: "/images/certificates/Bangkit.png"
  },
  {
    title: "Menjadi Android Developer Expert",
    issuer: "Dicoding Indonesia",
    date: "May 2025",
    credentialId: "N9ZO9KJL6XG5",
    verifyUrl: "https://www.dicoding.com/certificates/N9ZO9KJL6XG5",
    image: "/images/certificates/MADE.png"
  },
  {
    title: "Belajar Membuat Aplikasi Android dengan Jetpack Compose",
    issuer: "Dicoding Indonesia",
    date: "May 2025",
    credentialId: "ERZREVEK2XYV",
    verifyUrl: "https://www.dicoding.com/certificates/ERZREVEK2XYV",
    image: "/images/certificates/Compose.png"
  },
  {
    title: "Belajar Pengembangan Aplikasi Android Intermediate",
    issuer: "Dicoding Indonesia",
    date: "November 2024",
    credentialId: "6RPNY080QZ2M",
    verifyUrl: "https://www.dicoding.com/certificates/6RPNY080QZ2M",
    image: "/images/certificates/BPAAI.png"
  },
  {
    title: "Belajar Penerapan Machine Learning untuk Android",
    issuer: "Dicoding Indonesia",
    date: "November 2024",
    credentialId: "1OP84R7EVZQK",
    verifyUrl: "https://www.dicoding.com/certificates/1OP84R7EVZQK",
    image: "/images/certificates/BPMLA.png"
  },
  {
    title: "Belajar Fundamental Aplikasi Android",
    issuer: "Dicoding Indonesia",
    date: "October 2024",
    credentialId: "0LZ044QR3P65",
    verifyUrl: "https://www.dicoding.com/certificates/0LZ044QR3P65",
    image: "/images/certificates/BFAA.png"
  },
  {
    title: "Belajar Membuat Aplikasi Android untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "October 2024",
    credentialId: "0LZ04GRQNP65",
    verifyUrl: "https://www.dicoding.com/certificates/0LZ04GRQNP65",
    image: "/images/certificates/MAAP.png"
  },
  {
    title: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding Indonesia",
    date: "September 2024",
    credentialId: "07Z6027DMZQR",
    verifyUrl: "https://www.dicoding.com/certificates/07Z6027DMZQR",
    image: "/images/certificates/MPK.png"
  },
  {
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "October 2024",
    credentialId: "07Z64WD0MPQR",
    verifyUrl: "https://www.dicoding.com/certificates/07Z64WD0MPQR",
    image: "/images/certificates/BDA.png"
  },
  {
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    date: "November 2024",
    credentialId: "81P246VENZOY",
    verifyUrl: "https://www.dicoding.com/certificates/81P246VENZOY",
    image: "/images/certificates/MPD.png"
  },
  {
    title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "December 2024",
    credentialId: "KEXLYOY4MZG2",
    verifyUrl: "https://www.dicoding.com/certificates/KEXLYOY4MZG2",
    image: "/images/certificates/Flutter Pemula.png"
  },
  {
    title: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    date: "Maret 2025",
    credentialId: "53XEDM7E0PRN",
    verifyUrl: "https://www.dicoding.com/certificates/53XEDM7E0PRN",
    image: "/images/certificates/BDDC.png"
  },
  {
    title: "Belajar Dasar Visualisasi Data",
    issuer: "Dicoding Indonesia",
    date: "April 2025",
    credentialId: "72ZD56J49ZYW",
    verifyUrl: "https://www.dicoding.com/certificates/72ZD56J49ZYW",
    image: "/images/certificates/BDVD.png"
  },
];

// Tech Stack data
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
    { name: "CSS", icon: "mdi-language-css3", color: "#FFEBEE", iconColor: "#1572B6" },
    { name: "Bootstrap", icon: "mdi-bootstrap", color: "#FFEBEE", iconColor: "#563D7C" },
  ]
};


// Helper functions
const truncateText = (text) => {
  const maxLength = 100;
  if (text.length <= maxLength) {
    return text;
  }
  let lastSpace = text.lastIndexOf(' ', maxLength);
  if (lastSpace === -1) lastSpace = maxLength;
  return text.substring(0, lastSpace) + '...';
};

const showProjectDetails = (project) => {
  selectedProject.value = project;
  dialogVisible.value = true;
};

const getGradientColor = (proficiency) => {
  if (proficiency >= 85) {
    return '#a759cf';
  } else if (proficiency >= 70) {
    return '#da62a0';
  } else {
    return '#e97fa2';
  }
};
</script>

<style scoped src="@/assets/styles/portofolio.css"></style>

<template>
  <div class="portfolio-container">
    <div class="header" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
      <h1 class="gradient-text">My Projects</h1>
      <p class="subtitle">
        Explore my journey through various technical projects
      </p>
    </div>

    <div class="filter-container mb-6 d-flex flex-wrap justify-center gap-2">
      <v-chip
        v-for="category in categories"
        :key="category"
        class="filter-chip ma-1"
        :class="{ 'active-filter': selectedCategory === category }"
        @click="selectedCategory = category"
        variant="outlined"
      >
        {{ category }}
      </v-chip>
    </div>
    <v-row justify="center">
      <v-col v-for="(project, index) in filteredProjects" :key="index" cols="12" sm="6" md="4" :data-aos="'fade-up'"
        :data-aos-delay="100 * (index + 1)" data-aos-duration="800">
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
            <v-btn class="custom-btn" variant="flat" @click="showProjectDetails(project)">
              Details
              <v-icon class="ml-1">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn v-if="project.githubUrl" class="demo-btn" variant="text" @click="openLinkInBrowser(project.githubUrl, project.title)">
              Publication Link
              <v-icon class="ml-1">mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog for Project Details -->
    <v-dialog v-model="dialogVisible" max-width="800px">
      <v-card v-if="selectedProject" class="dialog-card">
        <v-img :src="selectedProject.image" height="250px" cover></v-img>
        <v-card-title class="dialog-title">{{ selectedProject.title }}</v-card-title>
        <v-card-subtitle>Role: {{ selectedProject.role }}</v-card-subtitle>
        <v-card-text>
          <p class="full-description">{{ selectedProject.description }}</p>
          <div v-if="selectedProject.technologies && selectedProject.technologies.length > 0"
            class="technologies-section">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">Technologies Used:</h3>
            <div class="technology-tags">
              <v-chip v-for="(tech, techIndex) in selectedProject.technologies" :key="techIndex" class="tech-chip">
                {{ tech }}
              </v-chip>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="selectedProject.githubUrl" class="demo-btn" variant="text" @click="openLinkInBrowser(selectedProject.githubUrl, selectedProject.title)">
            Publication Link
            <v-icon class="ml-1">mdi-open-in-new</v-icon>
          </v-btn>
          <v-btn class="demo-btn" variant="text" @click="dialogVisible = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useWindows } from '@/composables/useWindows';

const { addTabToWindow } = useWindows();

const dialogVisible = ref(false);
const selectedProject = ref(null);

const selectedCategory = ref('All');
const categories = ['All', 'Mobile App', 'Backend', 'Fullstack', 'Frontend', 'AI / ML'];

// Projects data
const projects = [
  {
    title: "Mosque Financial Management Information System",
    role: "Fullstack Developer & AI Engineer",
    category: "Fullstack",
    description: "\"Final Project: Mosque Financial Management Information System and Donation Forecasting\" (February – Now). This project is a thesis focused on developing a mosque financial management system integrated with a donation forecasting model. The forecasting system uses a hybrid time series forecasting combining Prophet for trend and seasonality modeling and LightGBM for residual learning. I developed the backend using Express.js with a PostgreSQL database and the frontend using Nuxt.js.",
    image: "/images/zamfis.png",
    githubUrl: "https://zamfis.nekosukuriputo.dev/",
    technologies: ["Nuxt.js", "Express.js", "PostgreSQL", "Prophet", "LightGBM"],
  },
  {
    title: "Rima Batombe",
    role: "Fullstack Developer",
    category: "Fullstack",
    description: "\"Rima Batombe\" (August - December 2025). This project is a digital platform designed to preserve Batombe culture from Nagari Abai, South Solok. It uses Generative AI via the Gemini API to generate Batombe-style pantun and includes features such as pantun sharing, a collection of authentic pantun, and a Minangkabau language learning module. I developed the Android app using Jetpack Compose with MVVM architecture, the backend using Express.js, and handled deployment using Docker and Kubernetes.",
    image: "/images/rima_batombe.png",
    githubUrl: "https://appdistribution.firebase.google.com/i/7358cdd0da7facb8",
    technologies: ["Jetpack Compose", "MVVM", "Express.js", "Docker", "Kubernetes", "Gemini API"],
  },
  {
    title: "Teaching Factory System SMKN 2 Batusangkar",
    role: "Backend Developer",
    category: "Backend",
    description: "\"Community Service Project at SMK Negeri 2 Batusangkar\" (Mei – July 2025). This was a community engagement project conducted in collaboration with my university lecturer. We developed an information system website to manage the outcomes of the school's Teaching Factory program. I was responsible for the backend development using Express.js, with PostgreSQL as the database and Prisma ORM for database management.",
    image: "/images/tefa.png",
    githubUrl: "https://tefa.smkn2batusangkar.sch.id/",
    technologies: ["Express.js", "PostgreSQL", "Prisma ORM"],
  },
  {
    title: "License Plate Recognition (LPR) Surabaya",
    role: "AI Engineer",
    category: "AI / ML",
    description: "Building a License Plate Recognition (LPR) model for the Surabaya City Government, including annotation and augmentation with Roboflow, modeling using YOLO 11n, and performance optimization through hyperparameter tuning and determining the best threshold based on F1-Score using the Grid Search method.",
    image: "/images/lpr.png",
    githubUrl: "https://github.com/Zephhyyrr/Licence-Plate-Recognition-Night-Condition",
    technologies: ["Roboflow", "YOLO 11n", "Hyperparameter Tuning", "Grid Search"],
  },
  {
    title: "UrVoice App",
    role: "Mobile App Developer, UI/UX Designer",
    category: "Mobile App",
    description: "UrVoice App is an application with the aim of improving public speaking in English through grammar correction. UrVoice App uses Whisper AI to convert speech-to-text and a locally executed Meta LLAMA 3.2 1B-Instruct model using python's Transformers library to analyze grammar errors. UrVoice App is built using Jetpack Compose with MVVM clean architecture.",
    image: "/images/UrVoiceApp.png",
    githubUrl: "https://github.com/Zephhyyrr/UrVoice-App",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Figma"],
  },
  {
    title: "UrVoice Backend",
    role: "Backend Developer",
    category: "Backend",
    description: "UrVoice Backend is the backend component of the UrVoice application. It is built using Express.js and TypeScript, with PostgreSQL as the database managed through Prisma ORM as the main API. In addition, the backend also integrates a grammar analysis service developed using Flask, which interacts locally with the LLAMA Meta model.",
    image: "/images/UrVoiceBackend.png",
    githubUrl: "https://github.com/Zephhyyrr/Capstone-Project-Backend",
    technologies: ["Express.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Flask", "Postman"],
  },
  {
    title: "Ignite Step",
    role: "Backend Developer",
    category: "Backend",
    description: "This is my final project for the 6th semester in the Special Topics course. Ignite Step is a website application for selling shoes catalog. I served as the backend developer, utilizing Express.js with a PostgreSQL database, employing Redis for caching, and Elasticsearch for product search functionality.",
    image: "/images/IgniteStep.png",
    githubUrl: "https://github.com/Baghaztra-Van-Ril/backend-2",
    technologies: ["Express.js", "PostgreSQL", "Redis", "Elasticsearch", "TypeScript"],
  },
  {
    title: "DermaSeer App",
    role: "Mobile App Developer, UI/UX Designer",
    category: "Mobile App",
    description: "DermaSeer is a Smart Android Application to provide skincare recommendations to you, based on your acne type and skin problems using Generative AI and Machine Learning models for acne type with >90% accuracy. DermaSeer is built with MVVM architecture and has implemented Clean Architecture.",
    image: "/images/DermaSeer.png",
    githubUrl: "https://github.com/Zephhyyrr/DermaSeer-app",
    technologies: ["Kotlin", "MVVM", "Clean Architecture", "Figma"],
  },
  {
    title: "Book App",
    role: "Mobile App Developer",
    category: "Mobile App",
    description: "Book App is an android application from api openlibrary.org. This application is built using MVVM architecture and has implemented Clean Architecture. Book App is built using kotlin xml and use modularization to separate the features.",
    image: "/images/BookApp.png",
    githubUrl: "https://github.com/Zephhyyrr/expert-submission",
    technologies: ["Kotlin", "XML", "MVVM", "Clean Architecture", "Modularization"],
  },
  {
    title: "PT. Rumpun Alam Indonesia Website",
    role: "Frontend Developer",
    category: "Frontend",
    description: "Static Corporate website for PT. Rumpun Alam Indonesia, a spice export company from West Sumatera",
    image: "/images/RAI.png",
    githubUrl: "https://github.com/Zephhyyrr/PT.RAI-company-profile",
    technologies: ["Vue.js", "Bootstrap"],
  },
  {
    title: "Pesona Simarasok",
    role: "Fullstack Developer",
    category: "Fullstack",
    description: "Creating a Website with the Theme Halal Tourism. This project is a Talent Scouting Academy project of Politeknik Negeri Padang. Located in Simarasok, Baso, West Sumatra. I made this website with three other friends. We used the Laravel framework MySql for the database.",
    image: "/images/Simarasok.png",
    githubUrl: "https://simarasok.umkm-pnp.com/",
    technologies: ["Laravel", "MySQL", "PHP", "Bootstrap"],
  }
];

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects;
  return projects.filter(project => project.category === selectedCategory.value);
});

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

const openLinkInBrowser = (url, title) => {
  // Many sites like GitHub block iframes for security (X-Frame-Options).
  // We will open them in a real new tab.
  if (url.includes('github.com') || url.includes('google.com')) {
    window.open(url, '_blank');
  } else {
    dialogVisible.value = false;
    addTabToWindow('projects', {
      id: 'tab-' + Date.now(),
      title: title || 'Web Page',
      type: 'iframe',
      url: url
    });
  }
};
</script>

<style scoped src="@/assets/styles/portofolio.css"></style>

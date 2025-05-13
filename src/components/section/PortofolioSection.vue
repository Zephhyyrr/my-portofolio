<template>
  <div class="portfolio-container">
    <div class="header">
      <h1 class="gradient-text">Portfolio Showcase</h1>
      <p class="subtitle">
        Explore my journey through projects, certifications, and technical expertise
      </p>
    </div>

    <div class="tabs-container">
      <div
        class="tab"
        :class="{ active: activeTab === 'projects' }"
        @click="activeTab = 'projects'"
      >
        <v-icon>mdi-code-braces</v-icon>
        <span>Projects</span>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'certificates' }"
        @click="activeTab = 'certificates'"
      >
        <v-icon>mdi-certificate</v-icon>
        <span>Certificates</span>
      </div>
      <div
        class="tab"
        :class="{ active: activeTab === 'techstack' }"
        @click="activeTab = 'techstack'"
      >
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
            <v-img :src="certificate.image" height="160px" contain class="certificate-img"></v-img>

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
              <v-btn v-if="certificate.verifyUrl" class="verify-btn" variant="tonal" :href="certificate.verifyUrl" target="_blank">
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
        <div v-for="(category, catIndex) in techStack" :key="catIndex" class="tech-category">
          <div class="tech-items">
            <div v-for="(tech, techIndex) in category.items" :key="techIndex" class="tech-item">
              <div class="tech-icon" :style="{ backgroundColor: tech.color || '#a759cf20' }">
                <v-icon size="x-large" :color="tech.iconColor || '#a759cf'">{{ tech.icon }}</v-icon>
              </div>
              <span class="tech-name">{{ tech.name }}</span>
            </div>
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

          <div v-if="selectedProject.technologies && selectedProject.technologies.length > 0" class="technologies-section">
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
          <v-btn v-if="selectedProject.githubUrl" class="demo-btn" variant="text" :href="selectedProject.githubUrl" target="_blank">
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
    image: "/img/projects/urvoice-app.jpg",
    githubUrl: "#",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Whisper AI", "LLAMA 3.2"],
  },
  {
    title: "UrVoice Backend (On-Going Project)",
    role: "Backend Developer",
    description: "UrVoice Backend is the backend component of the UrVoice application. It is built using Express.js and TypeScript, with PostgreSQL as the database managed through Prisma ORM as the main API. In addition, the backend also integrates a grammar analysis service developed using Flask, which interacts locally with the LLAMA Meta model.",
    image: "/img/projects/urvoice-backend.jpg",
    githubUrl: "#",
    technologies: ["Express.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Flask", "LLAMA Meta"],

  },
  {
    title: "DermaSeer App",
    role: "Mobile App Developer, UI/UX Designer",
    description: "DermaSeer is a Smart Android Application to provide skincare recommendations to you, based on your acne type and skin problems using Generative AI and Machine Learning models for acne type with >90% accuracy. DermaSeer is built with MVVM architecture and has implemented Clean Architecture.",
    image: "/img/projects/dermaseer.jpg",
    githubUrl: "#",
    technologies: ["Kotlin", "MVVM", "Clean Architecture", "Machine Learning", "Generative AI"],
  },
  {
    title: "Book App",
    role: "Mobile App Developer",
    description: "Book App is an android application from api openlibrary.org. This application is built using MVVM architecture and has implemented Clean Architecture. Book App is built using kotlin xml and use modularization to separate the features.",
    image: "/img/projects/book-app.jpg",
    githubUrl: "#",
    technologies: ["Kotlin", "XML", "MVVM", "Clean Architecture", "Modularization"],
  },
  {
    title: "PT. Rumpun Alam Indonesia Website",
    role: "Frontend Developer",
    description: "Static Corporate website for PT. Rumpun Alam Indonesia, a spice export company from West Sumatera",
    image: "/img/projects/rumpun-alam.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    title: "Pesona Simarasok",
    role: "Fullstack Developer",
    description: "Creating a Website with the Theme Halal Tourism. This project is a Talent Scouting Academy project of Politeknik Negeri Padang. Located in Simarasok, Baso, West Sumatra. I made this website with three other friends. We used the Laravel framework MySql for the database.",
    image: "/img/projects/pesona-simarasok.jpg",
    githubUrl: "#",
    technologies: ["Laravel", "MySQL", "PHP", "Bootstrap", "JavaScript"],
  }
];

const certificates = [
  {
    title: "Google Associate Android Developer",
    issuer: "Google",
    date: "Sep 2023",
    credentialId: "AAD-P23-XYZ123",
    verifyUrl: "#",
    image: "/img/certificates/android-developer.jpg"
  },
  {
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    date: "Jun 2023",
    credentialId: "AWS-DEV-ABC456",
    verifyUrl: "#",
    image: "/img/certificates/aws-developer.jpg"
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "Mar 2023",
    credentialId: "TF-DEV-789QWE",
    verifyUrl: "#",
    image: "/img/certificates/tensorflow-developer.jpg"
  },
  {
    title: "Flutter Development Bootcamp",
    issuer: "Udemy",
    date: "Jan 2023",
    verifyUrl: "#",
    image: "/img/certificates/flutter-bootcamp.jpg"
  },
  {
    title: "Kotlin for Android Developers",
    issuer: "JetBrains",
    date: "Dec 2022",
    credentialId: "KTL-AND-456RTY",
    verifyUrl: "#",
    image: "/img/certificates/kotlin-android.jpg"
  },
  {
    title: "Full Stack Web Development",
    issuer: "Dicoding Indonesia",
    date: "Oct 2022",
    credentialId: "FSWD-DIC-789UIO",
    verifyUrl: "#",
    image: "/img/certificates/fullstack-dicoding.jpg"
  }
];

// Tech Stack data
const techStack = [
  {
    items: [
      { name: "Kotlin", icon: "mdi-language-kotlin" },
      { name: "Jetpack Compose", icon: "mdi-android", proficiency: 85, color: "#E8F5E9", iconColor: "#3DDC84" },
      { name: "Flutter", icon: "mdi-flutter", proficiency: 75, color: "#E3F2FD", iconColor: "#02569B" },
      { name: "React Native", icon: "mdi-react", proficiency: 70, color: "#E0F7FA", iconColor: "#61DAFB" }
    ]
  },
  {
    items: [
      { name: "Vue.js", icon: "mdi-vuejs", proficiency: 85, color: "#E8F5E9", iconColor: "#4FC08D" },
      { name: "React", icon: "mdi-react", proficiency: 80, color: "#E0F7FA", iconColor: "#61DAFB" },
      { name: "JavaScript", icon: "mdi-language-javascript", proficiency: 90, color: "#FFF8E1", iconColor: "#F7DF1E" },
      { name: "TypeScript", icon: "mdi-language-typescript", proficiency: 80, color: "#E3F2FD", iconColor: "#3178C6" }
    ]
  },
  {
    items: [
      { name: "Node.js", icon: "mdi-nodejs", proficiency: 85, color: "#E8F5E9", iconColor: "#339933" },
      { name: "Express.js", icon: "mdi-web", proficiency: 80, color: "#ECEFF1", iconColor: "#000000" },
      { name: "Laravel", icon: "mdi-laravel", proficiency: 75, color: "#FFEBEE", iconColor: "#FF2D20" },
      { name: "PostgreSQL", icon: "mdi-database", proficiency: 75, color: "#E0F7FA", iconColor: "#336791" }
    ]
  },
  {
    items: [
      { name: "TensorFlow", icon: "mdi-tensorflow", proficiency: 70, color: "#FFF3E0", iconColor: "#FF6F00" },
      { name: "Python", icon: "mdi-language-python", proficiency: 80, color: "#E3F2FD", iconColor: "#3776AB" },
      { name: "Whisper AI", icon: "mdi-microphone", proficiency: 65, color: "#F3E5F5", iconColor: "#9C27B0" },
      { name: "LLM Integration", icon: "mdi-brain", proficiency: 60, color: "#E8EAF6", iconColor: "#5C6BC0" }
    ]
  }
];

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

<style scoped>
.portfolio-container {
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
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

.subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.tabs-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  background-color: rgba(167, 89, 207, 0.05);
  border-radius: 12px;
  padding: 0.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 8px;
  margin: 0 0.25rem;
  transition: all 0.3s ease;
  color: #6c757d;
}

.tab span {
  margin-left: 0.5rem;
  font-weight: 500;
}

.tab.active {
  background: linear-gradient(to right, #a759cf, #da62a0);
  color: white;
  box-shadow: 0 4px 15px rgba(167, 89, 207, 0.3);
  transform: translateY(-2px);
}

.tab-content {
  padding: 1rem;
  min-height: 400px;
}

/* Project Cards Styling */
.project-card {
  height: 100%;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  box-shadow: 0 4px 20px rgba(167, 89, 207, 0.4);
  border-color: #a759cf;
  transform: translateY(-8px);
  cursor: pointer;
}

.description-text {
  flex-grow: 1;
}

.custom-btn {
  background-color: #a759cf;
  color: white;
  transition: background-color 0.3s ease;
}

.custom-btn:hover {
  background-color: #da62a0;
}

.demo-btn {
  color: #a759cf;
  transition: color 0.3s ease;
}

.demo-btn:hover {
  color: #da62a0;
}

/* Certificate Cards Styling */
.certificate-card {
  height: 100%;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.certificate-card:hover {
  box-shadow: 0 4px 20px rgba(167, 89, 207, 0.4);
  border-color: #a759cf;
  transform: translateY(-8px);
}

.certificate-img {
  background-color: #f8f9fa;
  padding: 1rem;
}

.credential {
  font-size: 0.9rem;
  color: #6c757d;
}

.verify-btn {
  background-color: #a759cf;
  color: white;
  transition: background-color 0.3s ease;
}

.verify-btn:hover {
  background-color: #da62a0;
}

/* Tech Stack Styling */
.tech-categories {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tech-category {
  margin-bottom: 1rem;
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  position: relative;
  padding-left: 1rem;
  border-left: 4px solid #a759cf;
}

.tech-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(167, 89, 207, 0.2);
}

.tech-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.tech-name {
  font-weight: 500;
  margin-bottom: 1rem;
}

.proficiency-bar {
  width: 100%;
  height: 6px;
  background-color: #f1f1f1;
  border-radius: 3px;
  overflow: hidden;
}

.proficiency-level {
  height: 100%;
  border-radius: 3px;
  transition: width 1s ease-in-out;
}

/* Dialog Styling */
.dialog-card {
  border-radius: 12px;
  overflow: hidden;
}

.dialog-title {
  font-size: 1.8rem;
  color: white;
}

.full-description {
  margin: 1rem 0;
  line-height: 1.6;
}

.technologies-section, .highlights-section {
  margin-top: 1.5rem;
}

.technology-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tech-chip {
  background: linear-gradient(to right, #a759cf, #da62a0);
  color:white;
  font-weight: 500;
}

.highlights-list {
  margin: 0.5rem 0 0 1.5rem;
}

.highlights-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.github-btn {
  color: #333;
}

.close-btn {
  background-color: #f1f1f1;
  color: #333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tabs-container {
    flex-direction: column;
    max-width: 90%;
  }

  .tab {
    margin: 0.25rem 0;
  }

  .tech-items {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .gradient-text {
    font-size: 2.5rem;
  }
}
</style>

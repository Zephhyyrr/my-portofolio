<template>
  <div class="portfolio-container">
    <div class="header" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
      <h1 class="gradient-text">My Certificates</h1>
      <p class="subtitle">
        Professional certifications and achievements
      </p>
    </div>

    <v-row>
      <v-col v-for="(certificate, index) in certificates" :key="index" cols="12" sm="6" md="4" :data-aos="'fade-up'"
        :data-aos-delay="100 * (index + 1)" data-aos-duration="800">
        <v-card variant="outlined" class="certificate-card">
          <v-img :src="certificate.image" contain class="certificate-img" height="220px"></v-img>

          <v-card-title class="text-subtitle-1 font-weight-bold">{{ certificate.title }}</v-card-title>
          <v-card-subtitle>Issued by: {{ certificate.issuer }}</v-card-subtitle>

          <v-card-text>
            <p class="text-body-2 text-grey-darken-1 mb-1">{{ certificate.date }}</p>
            <p class="text-caption text-grey" v-if="certificate.credentialId">
              Credential ID: {{ certificate.credentialId }}
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="certificate.verifyUrl" class="verify-btn ml-2 mb-2" variant="flat" :href="certificate.verifyUrl"
              target="_blank">
              Verify
              <v-icon class="ml-1" size="small">mdi-check-circle</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
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
</script>

<style scoped src="@/assets/styles/portofolio.css"></style>
<style scoped>
.certificate-img {
    background-color: #f9f9f9;
}
</style>

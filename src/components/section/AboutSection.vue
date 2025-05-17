<template>
  <section id="about" class="section-container">
    <v-container class="container mb-10 mt-7" fluid>
      <h1
        class="gradient-text"
        style="text-align: center;"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        About Me
      </h1>

      <h2
        class="subtitle-text pb-7"
        style="text-align: center;"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        "Lifelong Learning, Trying to be Better"
      </h2>

      <v-row align="center">
        <!-- Teks deskripsi -->
        <v-col
          cols="12"
          md="6"
          data-aos="fade-right"
          data-aos-delay="300"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <p class="subtitle-text" style="text-align: justify;">
            Hello, my name is Firman Ardiansyah, or you can call me Firman. I come from Politeknik Negeri Padang,
            Department of Information Technology, Applied Bachelor Study Program (Diploma 4), Software Engineering
            Technology. Driven by a commitment to continuous learning, perseverance, and a strong sense of responsibility,
            I am passionate about learning about the latest technology. My interests in software engineering include
            mobile applications, Frontend development, website development, UI/UX design, machine learning, and others. My
            experience in organizing can also be used in the industrial world because I am used to working in groups and
            leading an activity. With an initiative-taking problem-solving approach and a dedication to staying updated on
            industry trends, I am poised to contribute effectively to dynamic and innovative projects.
          </p>
        </v-col>

        <!-- Foto profil -->
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center"
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="1200"
          data-aos-easing="ease-out-cubic"
        >
          <div class="profile-photo-container">
            <div class="profile-photo-wrapper">
              <img
                src="/foto_firman.png"
                alt="Foto Firman"
                class="profile-photo"
                data-aos="zoom-out-down"
                data-aos-delay="500"
                data-aos-duration="1000"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped src="@/assets/styles/styles.css"></style>

<style scoped>
.profile-photo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-photo-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 30px rgba(167, 89, 207, 0.7);
}

.profile-photo-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  opacity: 0;
  z-index: 2;
  border-radius: 50%;
  transition: opacity 0.3s ease;
}

.profile-photo-wrapper:hover {
  transform: scale(1.05);
}

.profile-photo-wrapper:hover::before {
  opacity: 0.3;
}

.profile-photo-wrapper::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  z-index: -1;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(167, 89, 207, 0.7);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
}

.profile-photo-wrapper:hover .profile-photo {
  opacity: 0.9;
}

.profile-photo-wrapper:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(to right, rgba(186, 186, 186, 0), rgba(192, 192, 192, 0.4), rgba(186, 186, 186, 0));
  transform: skewX(-25deg);
  animation: shimmer 1.5s infinite;
  z-index: 3;
  opacity: 1;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

.profile-photo-container::after {
  content: none;
}
</style>

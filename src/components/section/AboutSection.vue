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
        "Lifelong Learner, Trying to be Better"
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
  border: 4px solid #da62a0;
  box-shadow: 8px 8px 0px #a759cf;
  overflow: hidden;
  transition: transform 0.2s ease;
  background-color: #000;
}

.profile-photo-wrapper:hover {
  transform: scale(1.02) translate(-4px, -4px);
  box-shadow: 12px 12px 0px #da62a0;
  border-color: #a759cf;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

</style>

<template>
  <v-footer class="text-center d-flex flex-column gap-4 py-4" style="background: linear-gradient(90deg,
#a759cf,
#da62a0);">
    <div class="d-flex justify-center gap-3">
      <v-btn
        v-for="item in icons"
        :key="item.icon"
        color="white"
        density="comfortable"
        :href="item.link"
        :icon="item.icon"
        target="_blank"
        variant="text"
      />
    </div>

    <v-divider
      class="my-2"
      style="max-width: 50px; margin: 0 auto"
      thickness="2"
    />

    <v-divider class="my-2" />

    <div class="text-body-2">
      <strong>Firman Ardiansyah</strong> &copy; {{ new Date().getFullYear() }}
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
  interface SocialIcon {
    icon: string;
    link: string;
  }

  const icons: SocialIcon[] = [
    { icon: 'mdi-linkedin', link: 'https://linkedin.com/in/firman-ardiansyah' },
    { icon: 'mdi-instagram', link: 'https://instagram.com/firmanardiansyah' },
    { icon: 'mdi-github', link: 'https://github.com/firmanardiansyah' },
    { icon: 'mdi-email', link: 'mailto:firman@example.com' },
  ];
</script>

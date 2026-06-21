<template>
  <v-footer class="text-center d-flex flex-column gap-4 py-4" style="background-color: #000; border-top: 4px solid #da62a0;">
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
        class="retro-card"
        style="border: 2px solid #a759cf; margin: 0 4px;"
      />
    </div>

    <v-divider
      class="my-2"
      style="max-width: 50px; margin: 0 auto"
      thickness="2"
    />

    <v-divider class="my-2" />

    <div class="text-body-2" style="font-family: 'Press Start 2P', monospace; font-size: 0.6rem; color: #a759cf; line-height: 2;">
      Firman Ardiansyah &copy; {{ new Date().getFullYear() }}<br>
      <span style="font-family: 'VT323', monospace; font-size: 1rem; color: #fff;">8-Bit Edition</span>
    </div>
  </v-footer>
</template>

<script lang="ts" setup>
  interface SocialIcon {
    icon: string;
    link: string;
  }

  const icons: SocialIcon[] = [
    { icon: 'mdi-linkedin', link: 'https://www.linkedin.com/in/firman-ardiansyah04' },
    { icon: 'mdi-instagram', link: 'https://instagram.com/firman.ard04' },
    { icon: 'mdi-github', link: 'https://github.com/Zephhyyrr' },
    { icon: 'mdi-email', link: 'mailto:ardiansyahfirman2004@gmail.com' },
  ];
</script>

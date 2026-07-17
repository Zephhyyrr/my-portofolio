<template>
  <div class="sticky-note">
    <div class="note-header">
      <v-icon size="small">mdi-note-edit-outline</v-icon>
      Catatan Cepat
    </div>
    <ul class="note-content">
      <li>Klik icon di desktop untuk membuka aplikasi.</li>
      <li>Atau klik Start Menu di kiri bawah.</li>
      <li>Tahan dan geser judul jendela untuk memindahkan.</li>
    </ul>
  </div>
</template>

<style scoped>
.sticky-note {
  position: absolute;
  top: 140px;
  right: 40px;
  background-color: #fcf193; /* Yellow sticky note */
  padding: 20px;
  width: 250px;
  border-radius: 2px 2px 20px 2px;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
  color: #5d4037;
  font-family: 'Inter', sans-serif;
  transform: rotate(2deg);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
}

.sticky-note:hover {
  transform: rotate(0deg) scale(1.05) translateY(-5px);
  box-shadow: 8px 12px 25px rgba(0,0,0,0.3);
  z-index: 10;
}

.sticky-note::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-width: 20px 20px 0 0;
  border-style: solid;
  border-color: #e5d87a transparent transparent transparent;
}

.note-header {
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1rem;
}

.note-content {
  font-size: 0.85rem;
  padding-left: 16px;
  line-height: 1.5;
}

.note-content li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .sticky-note {
    top: 130px;
    right: 15px;
    transform: scale(0.7) rotate(2deg);
    transform-origin: top right;
  }
  
  .sticky-note:hover {
    transform: rotate(0deg) scale(0.75) translateY(-5px);
  }
}
</style>

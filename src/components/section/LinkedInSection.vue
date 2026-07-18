<template>
  <div class="linkedin-container">
    <div class="linkedin-card">
      <div class="profile-header">
        <div class="linkedin-logo">
          <v-icon size="60" color="white">mdi-linkedin</v-icon>
        </div>
        <h1 class="profile-name">Firman Ardiansyah</h1>
        <p class="profile-title">Software Engineering Technology Student</p>
      </div>

      <div class="alert-box">
        Note: LinkedIn blocks its pages from being displayed within other web applications (iframes) for security reasons (X-Frame-Options).
      </div>

      <a href="https://www.linkedin.com/in/firman-ardiansyah-492637237/" target="_blank" class="linkedin-btn">
        Open LinkedIn Profile
        <v-icon size="small" class="ml-2">mdi-open-in-new</v-icon>
      </a>
    </div>
  </div>
</template>

<style scoped>
.linkedin-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 24px;
}

.linkedin-card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  padding: 48px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.linkedin-logo {
  background-color: #0a66c2;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 4px 12px rgba(10, 102, 194, 0.3);
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
}

.profile-title {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 32px;
}

.alert-box {
  background-color: #f0f7ff;
  border: 1px solid #d0e2f5;
  color: #1c5b9e;
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 32px;
  text-align: left;
}

.linkedin-btn {
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  padding: 12px 32px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s, transform 0.1s;
}

.linkedin-btn:hover {
  background-color: #1d4ed8;
}

.linkedin-btn:active {
  transform: scale(0.98);
}

/* Dark mode support */
:global(body.dark-theme) .linkedin-card {
  background-color: #1e1e20;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

:global(body.dark-theme) .profile-name {
  color: #f1f5f9;
}

:global(body.dark-theme) .profile-title {
  color: #94a3b8;
}

:global(body.dark-theme) .alert-box {
  background-color: rgba(37, 99, 235, 0.1);
  border-color: rgba(37, 99, 235, 0.2);
  color: #60a5fa;
}
</style>

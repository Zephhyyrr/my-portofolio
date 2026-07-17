<template>
  <div class="weather-widget">
    <div class="weather-icon">
      <v-icon size="40" :color="weatherData.color">{{ weatherData.icon }}</v-icon>
    </div>
    <div class="weather-info">
      <div class="temp" v-if="!loading">{{ weatherData.temp }}°C</div>
      <div class="temp" v-else>--°C</div>
      <div class="desc" v-if="!loading">{{ weatherData.text }}</div>
      <div class="desc" v-else>Loading...</div>
      <div class="location">
        <v-icon size="x-small">mdi-map-marker-outline</v-icon>
        {{ weatherData.location }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const weatherData = ref({
  temp: '--',
  text: 'Loading...',
  icon: 'mdi-weather-cloudy',
  color: '#95a5a6',
  location: 'Finding location...'
});

const weatherCodes = {
  0: { text: 'Sunny', icon: 'mdi-weather-sunny', color: '#f1c40f' },
  1: { text: 'Partly Cloudy', icon: 'mdi-weather-partly-cloudy', color: '#f39c12' },
  2: { text: 'Cloudy', icon: 'mdi-weather-cloudy', color: '#95a5a6' },
  3: { text: 'Overcast', icon: 'mdi-weather-cloudy', color: '#7f8c8d' },
  45: { text: 'Fog', icon: 'mdi-weather-fog', color: '#bdc3c7' },
  48: { text: 'Freezing Fog', icon: 'mdi-weather-fog', color: '#bdc3c7' },
  51: { text: 'Light Drizzle', icon: 'mdi-weather-rainy', color: '#3498db' },
  53: { text: 'Drizzle', icon: 'mdi-weather-rainy', color: '#3498db' },
  55: { text: 'Heavy Drizzle', icon: 'mdi-weather-pouring', color: '#2980b9' },
  61: { text: 'Light Rain', icon: 'mdi-weather-rainy', color: '#3498db' },
  63: { text: 'Moderate Rain', icon: 'mdi-weather-pouring', color: '#2980b9' },
  65: { text: 'Heavy Rain', icon: 'mdi-weather-pouring', color: '#2980b9' },
  71: { text: 'Light Snow', icon: 'mdi-weather-snowy', color: '#ecf0f1' },
  73: { text: 'Moderate Snow', icon: 'mdi-weather-snowy', color: '#ecf0f1' },
  75: { text: 'Heavy Snow', icon: 'mdi-weather-snowy-heavy', color: '#ecf0f1' },
  80: { text: 'Light Rain Showers', icon: 'mdi-weather-pouring', color: '#2c3e50' },
  81: { text: 'Rain Showers', icon: 'mdi-weather-pouring', color: '#2c3e50' },
  82: { text: 'Heavy Rain Showers', icon: 'mdi-weather-lightning-rainy', color: '#2c3e50' },
  95: { text: 'Thunderstorm', icon: 'mdi-weather-lightning', color: '#f39c12' },
  96: { text: 'Light Thunderstorm', icon: 'mdi-weather-lightning-rainy', color: '#f39c12' },
  99: { text: 'Heavy Thunderstorm', icon: 'mdi-weather-lightning-rainy', color: '#f39c12' }
};

const fetchWeather = async (lat, lon) => {
  try {
    // 1. Fetch weather data
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherJson = await weatherRes.json();
    const current = weatherJson.current_weather;
    
    // 2. Fetch location name (Reverse Geocoding)
    let locName = 'Your Location';
    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
      const geoJson = await geoRes.json();
      locName = geoJson.address.city || geoJson.address.town || geoJson.address.village || geoJson.address.county || geoJson.address.state || 'Your Location';
    } catch (e) {
      console.warn("Failed to get city name", e);
    }

    const info = weatherCodes[current.weathercode] || { text: 'Unknown', icon: 'mdi-weather-cloudy', color: '#95a5a6' };
    
    weatherData.value = {
      temp: current.temperature,
      text: info.text,
      icon: info.icon,
      color: info.color,
      location: locName
    };
    loading.value = false;
  } catch (error) {
    console.error("Failed to load weather:", error);
    weatherData.value.location = 'Failed to load';
    weatherData.value.text = 'Error';
    loading.value = false;
  }
};

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.warn("Geolocation ditolak atau error", error);
        // Fallback to default (Padang) if denied
        fetchWeather(-0.9492, 100.3543);
        weatherData.value.location = 'Padang (Default)';
      }
    );
  } else {
    // Fallback if geolocation is not supported
    fetchWeather(-0.9492, 100.3543);
  }
});
</script>

<style scoped>
.weather-widget {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #333;
}
.temp {
  font-size: 1.5rem;
  font-weight: bold;
}
.desc {
  font-size: 0.8rem;
  color: #555;
}
.location {
  font-size: 0.75rem;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
}

@media (max-width: 768px) {
  .weather-widget {
    top: 15px;
    right: 15px;
    padding: 10px 16px;
    gap: 12px;
    transform: scale(0.85);
    transform-origin: top right;
  }
}
</style>

<style>
/* Dark Mode Overrides for Weather Widget */
body.dark-theme .weather-widget {
  background-color: rgba(30, 30, 32, 0.6) !important;
  color: #f1f5f9 !important;
}
body.dark-theme .weather-widget .desc,
body.dark-theme .weather-widget .location {
  color: #cbd5e1 !important;
}
</style>

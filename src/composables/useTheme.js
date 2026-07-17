import { ref } from 'vue';

const isDarkMode = ref(false);

export function useTheme() {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  return {
    isDarkMode,
    toggleDarkMode
  };
}

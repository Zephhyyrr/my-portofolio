import { reactive } from 'vue';

export const musicState = reactive({
  isVisible: true,
  volume: 50,
  isPlaying: false
});

export function useMusicState() {
  const toggleVisibility = () => {
    musicState.isVisible = !musicState.isVisible;
  };
  
  const setVolume = (val) => {
    musicState.volume = val;
  };

  return {
    musicState,
    toggleVisibility,
    setVolume
  };
}

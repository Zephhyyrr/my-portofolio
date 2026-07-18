import { reactive, toRefs } from 'vue';

const state = reactive({
  isLocked: false,
  isShuttingDown: false,
  isPoweredOff: false,
});

export function useSystemState() {
  const lockSystem = () => {
    state.isLocked = true;
  };
  
  const unlockSystem = () => {
    state.isLocked = false;
  };
  
  const requestShutdown = () => {
    state.isShuttingDown = true;
  };
  
  const confirmShutdown = () => {
    state.isShuttingDown = false;
    state.isPoweredOff = true;
  };
  
  const cancelShutdown = () => {
    state.isShuttingDown = false;
  };

  return {
    ...toRefs(state),
    lockSystem,
    unlockSystem,
    requestShutdown,
    confirmShutdown,
    cancelShutdown
  };
}

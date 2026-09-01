import { create } from 'zustand';

interface TrainState {
  position: number;
  velocity: number;
  acceleration: number;
  throttle: number; // 0 to 1
  brake: number; // 0 to 1
  mass: number;
  maxTraction: number;
  maxBrake: number;
}

export type HUDVisibility = 'FULL' | 'REDUCED' | 'OFF';
export type ActiveMenu = 'NONE' | 'PAUSE' | 'MAP' | 'JOURNEY' | 'TIMETABLE';

interface GameStore {
  train: TrainState;
  cameraView: 'cab' | 'front' | 'rear' | 'chase';
  hudVisibility: HUDVisibility;
  activeMenu: ActiveMenu;
  setTrainState: (state: Partial<TrainState>) => void;
  setThrottle: (val: number) => void;
  setBrake: (val: number) => void;
  setCameraView: (view: 'cab' | 'front' | 'rear' | 'chase') => void;
  setHudVisibility: (visibility: HUDVisibility) => void;
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  train: {
    position: 0,
    velocity: 0,
    acceleration: 0,
    throttle: 0,
    brake: 0,
    mass: 300000,
    maxTraction: 300000,
    maxBrake: 250000,
  },
  cameraView: 'cab',
  hudVisibility: 'FULL',
  activeMenu: 'NONE',
  setTrainState: (state) => set((prev) => ({ train: { ...prev.train, ...state } })),
  setThrottle: (val) => set((prev) => ({ train: { ...prev.train, throttle: Math.max(0, Math.min(1, val)) } })),
  setBrake: (val) => set((prev) => ({ train: { ...prev.train, brake: Math.max(0, Math.min(1, val)) } })),
  setCameraView: (view) => set({ cameraView: view }),
  setHudVisibility: (visibility) => set({ hudVisibility: visibility }),
  setActiveMenu: (menu) => set({ activeMenu: menu }),
}));

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

interface GameStore {
  train: TrainState;
  setTrainState: (state: Partial<TrainState>) => void;
  setThrottle: (val: number) => void;
  setBrake: (val: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  train: {
    position: 0,
    velocity: 0,
    acceleration: 0,
    throttle: 0,
    brake: 0,
    mass: 50000, // 50 tons
    maxTraction: 100000, // Newtons
    maxBrake: 80000, // Newtons
  },
  setTrainState: (state) => set((prev) => ({ train: { ...prev.train, ...state } })),
  setThrottle: (val) => set((prev) => ({ train: { ...prev.train, throttle: Math.max(0, Math.min(1, val)) } })),
  setBrake: (val) => set((prev) => ({ train: { ...prev.train, brake: Math.max(0, Math.min(1, val)) } })),
}));

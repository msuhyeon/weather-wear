import { create } from "zustand";

interface LocationState {
  lat: number;
  lon: number;
  setLocation: (lat: number, lon: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lat: 0,
  lon: 0,
  setLocation: (lat, lon) => set({ lat, lon }),
}));

import { University } from "@/types";
import { create } from "zustand";

type UniversitiesState = {
  universities: University[];
  setUniversities: (universities: University[]) => void;
  searchDurations: number[];
  addSearchDuration: (duration: number) => void;
  getAverageSearchDuration: () => number;
};

export const useUniversitiesStore = create<UniversitiesState>((set, get) => ({
  universities: [],
  setUniversities: (universities) => set({ universities }),
  searchDurations: [],
  addSearchDuration: (duration) =>
    set((state) => ({ searchDurations: [...state.searchDurations, duration] })),
  getAverageSearchDuration: () => {
    const durations = get().searchDurations;
    return durations.reduce((acc, cur) => acc + cur, 0) / durations.length || 0;
  },
}));

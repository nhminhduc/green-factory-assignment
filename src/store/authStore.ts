import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const getInitialAuthState = (): boolean => {
  const isAuth = localStorage.getItem("isAuthenticated");
  return isAuth === "true";
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: getInitialAuthState(),
  login: () => {
    set({ isAuthenticated: true });
    localStorage.setItem("isAuthenticated", "true");
  },
  logout: () => {
    set({ isAuthenticated: false });
    localStorage.setItem("isAuthenticated", "false");
  },
}));

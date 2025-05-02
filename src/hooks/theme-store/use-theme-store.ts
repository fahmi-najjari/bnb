import { create } from 'zustand';

type ThemeStore = {
  theme: 'dark' | 'light';
  setTheme: (_: { theme: ThemeStore['theme'] }) => void;
};

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';
const userTheme = localStorage.getItem('theme') as ThemeStore['theme'];

const useThemeStore = create<ThemeStore>()((set) => ({
  theme: userTheme || systemTheme || 'light',
  setTheme: ({ theme }: { theme: ThemeStore['theme'] }) => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the new theme class
    root.classList.add(theme);
    
    // Update localStorage
    localStorage.setItem('theme', theme);
    
    set({ theme });
  },
}));

export default useThemeStore;

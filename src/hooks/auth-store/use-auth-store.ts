import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthResponse } from '../../features/auth/services/type';

// 🔐 Define the shape of your auth store state and actions
interface AuthState {
  user: AuthResponse | null;             // Currently logged-in user
  setUser: (user: AuthResponse) => void; // Set user on login/register
  logout: () => void;  
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

// ✅ Create Zustand store with persistence in localStorage
const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      user: null, // Initial state: no user logged in
      setUser: (user) => set({ user }), // Store user after login/register
      logout: () => set({ user: null }), // Clear user data on logout
      toggleFavorite: (propertyId) => set((state) => ({ 
        user: state.user ? {
          ...state.user,
          favorites: state.user.favorites.includes(propertyId)
            ? state.user.favorites.filter((id) => id !== propertyId)
            : [...state.user.favorites, propertyId],
        } : null,
      })),
      isFavorite: (propertyId) => {
        const user = get().user;
        return user?.favorites.includes(propertyId) || false;
      },

    }),
    {
      name: 'auth-storage', // Key for localStorage entry
      storage: createJSONStorage(() => localStorage), // Use localStorage as backend
    }
  )
);

export default useAuthStore;
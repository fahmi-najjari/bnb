import { createQueryKeys } from '@lukemorales/query-key-factory';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import authApi from '../services/auth.api';
import {
  AuthResponse,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from '../services/type';

import { QueryOptions } from '@/ts/types';
import useAuthStore from '@/hooks/auth-store/use-auth-store';
import { useToast } from '@/hooks'; // Reusable toast context (e.g. based on react-hot-toast)

// --------------------------------------------------
// 🔑 Define consistent and reusable query keys
// --------------------------------------------------
export const authKeys = createQueryKeys('auth', {
  currentUser: () => ({
    queryKey: ['auth', 'current-user'],
    queryFn: async () => {
      const { data } = await authApi.getCurrentUser(); // API call to fetch authenticated user
      return data;
    },
  }),
});

// --------------------------------------------------
// ✅ 1. useCurrentUserQuery
// --------------------------------------------------
export const useCurrentUserQuery = <T = AuthResponse>(
    // Correct the order of generics: T (final data), AuthResponse (queryFn data)
    options: QueryOptions<T, AuthResponse> = {}
  ) => {
    const setUser = useAuthStore((s) => s.setUser);

    // Use the single options object signature for useQuery
    return useQuery<AuthResponse, Error, T>({ // Keep type args for TData control
      queryKey: authKeys.currentUser().queryKey, // Get only the key from the factory
      queryFn: async () => {                    // Define queryFn inline here
        const { data } = await authApi.getCurrentUser();
        return data; // This matches AuthResponse (TQueryData)
      },
      onSuccess: (user) => setUser(user as AuthResponse), // Cast needed because T might differ from AuthResponse
      retry: false,
      ...options, // Spread the correctly typed options
    });
  };
// --------------------------------------------------
// ✅ 2. useLoginMutation
// Purpose: Log in a user and store their session (Zustand + Query Invalidation)
// --------------------------------------------------
export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const { toast } = useToast();

  return useMutation<AuthResponse, Error, LoginInput>({
    mutationFn: async (body: LoginInput) => {
      const { data } = await authApi.login(body);
      return data;
    },
    onSuccess: (user) => {
      setUser(user); // Persist user state
      toast.success('Login successful');
      void queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] }); // Refresh cached user data
    },
    onError: (error) => {
      toast.error(`Login failed: ${error.message || 'Please check credentials'}`);
    },
  });
};

// --------------------------------------------------
// ✅ 3. useRegisterMutation
// Purpose: Register a new user and optionally log them in
// --------------------------------------------------
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  const { toast } = useToast();

  return useMutation<AuthResponse, Error, RegisterInput>({
    mutationFn: async (body: RegisterInput) => {
      const { data } = await authApi.register(body);
      return data;
    },
    onSuccess: (user) => {
      setUser(user); // Optional: Register logs the user in
      toast.success('Registration successful');
      void queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
    },
    onError: (error) => {
      toast.error(`Registration failed: ${error.message || 'Please try again'}`);
    },
  });
};

// --------------------------------------------------
// ✅ 4. useResetPasswordMutation
// Purpose: Reset the user's password using a token
// --------------------------------------------------
export const useResetPasswordMutation = () => {
  const { toast } = useToast();

  return useMutation<void, Error, ResetPasswordInput>({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successful. You can now log in with your new password.');
    },
    onError: (error) => {
      toast.error(`Password reset failed: ${error.message || 'Please try again'}`);
    },
  });
};

// --------------------------------------------------
// ✅ 5. useLogoutMutation
// Purpose: Log out the current user and clear their session
// --------------------------------------------------
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const logout = useAuthStore((s) => s.logout);
  const { toast } = useToast();

  return useMutation<{ code: number; message: string }, Error, void>({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout(); // Clear Zustand user session
      toast.success('Logout successful');
      void queryClient.invalidateQueries({ queryKey: ['auth', 'current-user'] });
      queryClient.setQueryData(['auth', 'current-user'], null); // Optional: clear cached user immediately
    },
    onError: (error) => {
      toast.error(`Logout failed: ${error.message || 'An error occurred'}`);
    },
  });
};
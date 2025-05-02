import {
    LoginInput,
    RegisterInput,
    ResetPasswordInput,
    AuthResponse,
  } from './type';
  
  const MOCK_TOKEN = 'mock-jwt-token';
  
  // Helper: Simulate network delay
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  
  // Helper: Validation
  const validateCredentials = (email: string, password: string) => {
    if (!email || !password) throw new Error('Email and password are required');
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
  };
  
  // Helper: Get all users from localStorage
  const getUsers = (): any[] => {
    const stored = localStorage.getItem('mock-users');
    return stored ? JSON.parse(stored) : [];
  };
  
  // Helper: Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem('mock-users', JSON.stringify(users));
  };
  
  // ✅ API Object
  const authApi = {
    login: async (body: LoginInput): Promise<{ code: number; data: AuthResponse }> => {
      await delay(500);
  
      try {
        validateCredentials(body.email, body.password);
  
        const users = getUsers();
        const user = users.find(
          (u) => u.email === body.email && u.password === body.password
        );
  
        if (!user) throw new Error('Invalid credentials');
  
        localStorage.setItem('mock-token', MOCK_TOKEN);
  
        return {
          code: 200,
          data: {
            token: MOCK_TOKEN,
            name: user.name,
            email: user.email,
            role: user.role,
            _id: user.id.toString(),
          },
        };
      } catch (error) {
        throw {
          code: 401,
          message: error instanceof Error ? error.message : 'Login failed',
        };
      }
    },
  
    register: async (body: RegisterInput): Promise<{ code: number; data: AuthResponse }> => {
      await delay(500);
  
      try {
        validateCredentials(body.email, body.password);
        if (!body.name) throw new Error('Name is required');
  
        const users = getUsers();
  
        if (users.some((u) => u.email === body.email)) {
          throw new Error('Email already exists');
        }
  
        const newUser = {
          id: users.length + 1,
          email: body.email,
          password: body.password, // important for login validation
          name: body.name,
          role: body.role,
        };
  
        users.push(newUser);
        saveUsers(users);
        localStorage.setItem('mock-token', MOCK_TOKEN);
  
        return {
          code: 200,
          data: {
            token: MOCK_TOKEN,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            _id: newUser.id.toString(),
          },
        };
      } catch (error) {
        throw {
          code: 400,
          message: error instanceof Error ? error.message : 'Registration failed',
        };
      }
    },
  
    getCurrentUser: async (): Promise<{ code: number; data: AuthResponse }> => {
      await delay(300);
  
      const token = localStorage.getItem('mock-token');
      if (!token) throw { code: 401, message: 'Not authenticated' };
  
      const users = getUsers();
      const user = users[0]; // In a real app, you'd find by token
  
      return {
        code: 200,
        data: {
          token,
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user.id.toString(),
        },
      };
    },
  
    logout: async (): Promise<{ code: number; message: string }> => {
      await delay(300);
      localStorage.removeItem('mock-token');
      return {
        code: 200,
        message: 'Logged out successfully',
      };
    },
  
    resetPassword: async (body: ResetPasswordInput): Promise<{ code: number; data: AuthResponse }> => {
      await delay(500);
      throw {
        code: 501,
        message: 'Reset password not implemented in mock',
      };
    },
  };
  
  export default authApi;
  




// once i have the api, i will use it in the auth.api.ts file

/*import axiosClient from '@/apis/axios-client';
import { LoginInput, RegisterInput, ResetPasswordInput, AuthResponse, AuthError } from './type';
const baseUrl = 'auth';
const authApi = {
    login: (body: LoginInput): Promise<{ code: number; data: AuthResponse }> => 
        axiosClient.post(`${baseUrl}/login`, body),
    register: (body: RegisterInput): Promise<{ code: number; data: AuthResponse }> => 
        axiosClient.post(`${baseUrl}/register`, body),
    resetPassword: (body: ResetPasswordInput): Promise<{ code: number; data: AuthResponse }> => 
        axiosClient.post(`${baseUrl}/reset-password`, body),
    logout: (): Promise<{ code: number; message: string }> => 
        axiosClient.post(`${baseUrl}/logout`),
    getCurrentUser: (): Promise<{ code: number; data: AuthResponse }> => 
        axiosClient.get(`${baseUrl}/current-user`),
}

export default authApi;*/


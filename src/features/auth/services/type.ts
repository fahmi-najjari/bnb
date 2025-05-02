export type UserRole = 'admin' | 'host' | 'tenant';

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type ResetPasswordInput = {
  token: string;
  newPassword: string;
};

export type AuthResponse = {
  token: string;
  role: UserRole;
  email: string;
  name: string;
  _id: string;
  favorites: string[];
};

export type AuthError = {
  message: string;
  code?: string;
}

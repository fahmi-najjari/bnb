import React, { useState } from 'react';
import {
  useLoginMutation,
  useRegisterMutation,
  useCurrentUserQuery,
  useLogoutMutation,
} from '@/features/auth/hooks/use-auth-query';
import useAuthStore from '@/hooks/auth-store/use-auth-store';

const AuthTestPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [name, setName] = useState('Admin');
  const [role, setRole] = useState<'admin' | 'tenant' | 'host'>('admin');

  const { mutate: login, isLoading: isLoggingIn } = useLoginMutation();
  const { mutate: register, isLoading: isRegistering } = useRegisterMutation();
  const { data: userData } = useCurrentUserQuery();
  const { mutate: logout, isLoading: isLoggingOut } = useLogoutMutation();

  const user = useAuthStore((s) => s.user);

  const handleSubmit = () => {
    if (mode === 'login') {
      login({ email, password });
    } else {
      register({ email, password, name, role });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white dark:bg-slate-800 text-black dark:text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🧪 Auth Test Page</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Mode</label>
        <select
          className="w-full p-2 border border-gray-300 rounded dark:bg-slate-700 dark:border-gray-600 dark:text-white"
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
        >
          <option value="login">Login</option>
          <option value="register">Register</option>
        </select>
      </div>

      {mode === 'register' && (
        <>
          <input
            className="w-full p-2 mb-3 border border-gray-300 rounded dark:bg-slate-700 dark:border-gray-600 dark:text-white"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className="w-full p-2 mb-3 border border-gray-300 rounded dark:bg-slate-700 dark:border-gray-600 dark:text-white"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="admin">Admin</option>
            <option value="tenant">Tenant</option>
            <option value="host">Host</option>
          </select>
        </>
      )}

      <input
        className="w-full p-2 mb-3 border border-gray-300 rounded dark:bg-slate-700 dark:border-gray-600 dark:text-white"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-slate-700 dark:border-gray-600 dark:text-white"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoggingIn || isRegistering}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>

      <button
        onClick={() => logout()}
        disabled={isLoggingOut}
        className="w-full mt-3 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        Logout
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-1">👤 Zustand user state:</h3>
        <pre className="text-sm bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-auto max-h-52">
          {JSON.stringify(user, null, 2)}
        </pre>

        <h3 className="text-lg font-medium mt-4 mb-1">📦 useCurrentUserQuery result:</h3>
        <pre className="text-sm bg-gray-100 dark:bg-slate-700 p-3 rounded overflow-auto max-h-52">
          {JSON.stringify(userData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AuthTestPage;

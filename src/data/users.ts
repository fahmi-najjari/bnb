import { User } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    favorites: ['1', '3'],
  },
  {
    id: 'u2',
    name: 'Sophia Garcia',
    email: 'sophia@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    favorites: ['2', '5'],
  },
];

// Mock current user for demo purposes
export const currentUser = users[0];
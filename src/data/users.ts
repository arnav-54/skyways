import { User } from '../types';

// Initial users array with one test user
let mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123' // In a real app, this would be hashed
  }
];

// Function to register a new user
export const registerUser = (user: Omit<User, 'id'>): User => {
  const newUser: User = {
    ...user,
    id: (mockUsers.length + 1).toString()
  };
  mockUsers.push(newUser);
  return newUser;
};

// Function to authenticate a user
export const authenticateUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(user => user.email === email && user.password === password);
  return user || null;
};

// Function to get a user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Function to check if an email is already registered
export const isEmailRegistered = (email: string): boolean => {
  return mockUsers.some(user => user.email === email);
};
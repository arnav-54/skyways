import { User } from '../types';


let mockUsers: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123' 
  }
];


export const registerUser = (user: Omit<User, 'id'>): User => {
  const newUser: User = {
    ...user,
    id: (mockUsers.length + 1).toString()
  };
  mockUsers.push(newUser);
  return newUser;
};


export const authenticateUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(user => user.email === email && user.password === password);
  return user || null;
};


export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};


export const isEmailRegistered = (email: string): boolean => {
  return mockUsers.some(user => user.email === email);
};
let mockUsers = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123' 
  }
];

export const registerUser = (user) => {
  const newUser = {
    ...user,
    id: (mockUsers.length + 1).toString()
  };
  mockUsers.push(newUser);
  return newUser;
};

export const authenticateUser = (email, password) => {
  const user = mockUsers.find(user => user.email === email && user.password === password);
  return user || null;
};

export const getUserById = (id) => {
  return mockUsers.find(user => user.id === id);
};

export const isEmailRegistered = (email) => {
  return mockUsers.some(user => user.email === email);
};
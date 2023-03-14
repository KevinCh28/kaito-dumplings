import axios from 'axios';

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const register = async (userData: object) => {
  return await axios.post('/api/users/register', userData);
};

export const login = async (userData: object) => {
  return await axios.post('/api/users/login', userData);
};

export const logout = async () => {
  await axios.post('/api/users/logout');
};

export const getCurrentUser = async () => {
  const response = await axios.get('/api/users/current');
  return response.data;
};
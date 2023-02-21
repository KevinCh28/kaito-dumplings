import axios from 'axios';

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const register = async (userData: any) => {
  return await axios.post('/api/users/register', userData);
};

export const login = async (userData: any) => {
  return await axios.post('/api/users/login', userData);
};

export const logout = async () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/';
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;
  const res = await axios.get('/api/current');
  return res.data;
};
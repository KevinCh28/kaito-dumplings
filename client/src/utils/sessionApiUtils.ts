// import axios from 'axios';
// const baseUrl = "https://kaito-five.vercel.app";

// export const setAuthToken = (token: string) => {
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = token;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// };

// export const register = async (userData: object) => {
//   return await axios.post(`${baseUrl}/api/users/register`, userData);
// };

// export const login = async (userData: object) => {
//   return await axios.post(`${baseUrl}/api/users/login`, userData);
// };

// export const login = async (userData: object) => {
//   try {
//     await fetch('/api/users/login', {
//       method: 'POST',
//       body: JSON.stringify(userData)
//     }).then(res => res.json())
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const logout = async () => {
//   await axios.post(`${baseUrl}/api/users/logout`);
// };

// export const getCurrentUser = async () => {
//   const response = await axios.get(`${baseUrl}/api/users/current`);
//   return response.data;
// };
import axios from 'axios';

export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// export const setAuthToken = async (token: string) => {
//   if (token) {
//     fetch('/', {
//       headers: {
//         'Authorization': token
//       }
//     })
//   } else {
//     delete fetch('/').headers.common['Authorization']
//   }
// };

export const register = async (userData: any) => {
  return await fetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};

export const login = async (userData: any) => {
  return await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
};
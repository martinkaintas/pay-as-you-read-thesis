import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

export default apiInstance;

import axios from 'axios';

export const axiosReq = axios.create({
  baseURL: 'https://targetcoachingserver.vercel.app/api',
  // baseURL: 'http://localhost:5000/api',
  withCredentials: true
});
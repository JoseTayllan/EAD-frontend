import axios, { AxiosInstance } from 'axios';

const environment: string = 'dev';
let api: AxiosInstance;

if (environment === 'dev') {
  /* Dev */
  api = axios.create({
    baseURL: 'http://localhost:3001',
  });
} else if (environment === 'prod') {
  /* Prod */
  api = axios.create({
    baseURL: 'https://coead-backend-sobg.onrender.com',
  });
}

export { api };
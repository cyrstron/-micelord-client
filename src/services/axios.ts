import axios from 'axios';

const axiosService = axios.create();

export function setAuth(token?: string) {
  axios.defaults.headers.common['Authorization'] = token;
} 

export function resetAuth() {
  setAuth(undefined);
} 

export {axiosService as axios};

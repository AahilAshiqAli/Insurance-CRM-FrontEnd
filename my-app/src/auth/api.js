// Inside Final-year-project-new/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace `port` with your backend port number
});

export default api;

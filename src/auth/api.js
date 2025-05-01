// Inside Final-year-project-new/src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://insurance-crm-backend.vercel.app/api/", // Replace `port` with your backend port number
});

export default api;

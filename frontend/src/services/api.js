import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://finance-tracker-7omf.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;

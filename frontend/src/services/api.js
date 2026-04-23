import axios from "axios";

const DEFAULT_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://finance-tracker-7omf.onrender.com/api";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || DEFAULT_API_URL;

const API = axios.create({
  baseURL: API_BASE_URL,
});

const PUBLIC_PATHS = ["/auth/login", "/auth/register", "/health"];
const isPublicPath = (url = "") =>
  PUBLIC_PATHS.some((path) => url.startsWith(path));

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token && !isPublicPath(req.url)) {
    req.headers.Authorization = token;
  }
  return req;
});

export const warmUpAPI = async () => {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      await API.get("/health", { timeout: 30000 });
      return;
    } catch (err) {
      if (attempt === 3) {
        throw err;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
};

export default API;

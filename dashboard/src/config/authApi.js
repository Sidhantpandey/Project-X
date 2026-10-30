import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL || "http://localhost:3000",
  withCredentials: true,
});

export default authApi;

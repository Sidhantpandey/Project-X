import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL || "http://localhost:3000",
});

export default authApi;

import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
    <AppRoutes />
  </div>
);

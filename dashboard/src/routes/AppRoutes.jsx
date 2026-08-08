import React from "react";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext.jsx";
import Layout from "../Layout.jsx";
import Home from "../components/Home/Home.jsx";
import About from "../components/About/About.jsx";
import Contact from "../components/Contact/Contact.jsx";
import User from "../components/User/User.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import LogsDashboard from "../components/LogsDashboard/LogsDashboard.jsx";

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500">
        Checking session...
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<RequireAuth />}>
        <Route path="dashboard" element={<LogsDashboard />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="user/:userid" element={<User />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
);

const AppRoutes = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRoutes;

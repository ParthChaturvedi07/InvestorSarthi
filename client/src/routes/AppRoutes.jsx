import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminRegister } from "../pages/auth/AdminRegister";
import { AdminLogin } from "../pages/auth/AdminLogin";
import { Dashboard } from "../pages/admin/Dashboard";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/@dmin-panel/register" element={<AdminRegister />} />
      <Route path="/@dmin-panel/login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
    </Routes>
  );
}

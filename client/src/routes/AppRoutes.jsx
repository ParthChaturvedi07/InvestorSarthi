import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminRegister } from "../pages/auth/AdminRegister";
import { AdminLogin } from "../pages/auth/AdminLogin";
import { Dashboard } from "../pages/admin/Dashboard";
import { ProjectDetails } from "../pages/admin/ProjectDetails";
import { ProjectEdit } from "../pages/admin/ProjectEdit";
import { ProjectForm } from "../pages/admin/ProjectForm";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/@dmin-panel/register" element={<AdminRegister />} />
      <Route path="/@dmin-panel/login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />

      {/* Project Routes */}
      <Route path="/@dmin-panel/projects/create" element={<ProjectForm />} />
      <Route path="/@dmin-panel/projects/:id" element={<ProjectDetails />} />
      <Route path="/@dmin-panel/projects/:id/edit" element={<ProjectEdit />} />
    </Routes>
  );
}

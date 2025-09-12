import React from "react";
import { Routes, Route } from "react-router-dom";
import { AdminRegister } from "../pages/auth/AdminRegister";
import { AdminLogin } from "../pages/auth/AdminLogin";
import { Dashboard } from "../pages/admin/Dashboard";
import { ProjectDetails } from "../pages/admin/ProjectDetails";
import { ProjectEdit } from "../pages/admin/ProjectEdit";
import { ProjectForm } from "../pages/admin/ProjectForm";
import Home from "../pages/static/Home";
import Properties from "../pages/static/Properties";
import Careers from "../pages/static/Careers";
import LoanAssistance from "../pages/static/LoanAssistance";
import PropertyConsultation from "../pages/static/PropertyConsultation";
import InvestmentAdvisory from "../pages/static/InvestmentAdvisory";
import SiteVisits from "../pages/static/SiteVisits";
export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin Pages */}
      <Route path="/@dmin-panel/register" element={<AdminRegister />} />
      <Route path="/@dmin-panel/login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />

      {/* Project Routes */}
      <Route path="/@dmin-panel/projects/create" element={<ProjectForm />} />
      <Route path="/@dmin-panel/projects/:id" element={<ProjectDetails />} />
      <Route path="/@dmin-panel/projects/:id/edit" element={<ProjectEdit />} />

      {/* Public Static Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/loan-assistance" element={<LoanAssistance />} />
      <Route path="/property-consultation" element={<PropertyConsultation />} />
      <Route path="/investment-advisory" element={<InvestmentAdvisory />} />
      <Route path="/site-visits" element={<SiteVisits />} />
    </Routes>
  );
}

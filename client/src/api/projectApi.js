// src/api/projectApi.js
import api from "./axiosConfig";

// Fetch all projects
export const getProjects = () => api.get("/api/projects");

// Fetch single project by id
export const getProjectById = (id) => api.get(`/api/projects/${id}`);

// Create a new project
export const createProject = (data) => api.post("/api/projects/create", data);

// Update a project
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);

// Delete a project
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);

// Upload multiple images to gallery
export const uploadProjectImages = (id, formData) =>
  api.post(`/api/projects/${id}/gallery`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Remove a specific image from gallery
export const removeProjectImage = (id, body) =>
  api.delete(`/api/projects/${id}/gallery`, { data: body });

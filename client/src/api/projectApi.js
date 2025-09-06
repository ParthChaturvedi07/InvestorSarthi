// src/api/projectApi.js
import api from "./axiosConfig";

// Fetch all projects
export const getProjects = () => api.get("/projects");

// Fetch single project by id
export const getProjectById = (id) => api.get(`/projects/${id}`);

// Create a new project
export const createProject = (data) => api.post("/projects/create", data);

// Update a project
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);

// Delete a project
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Upload multiple images to gallery
export const uploadProjectImages = (id, formData) =>
  api.post(`/projects/${id}/gallery`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Remove a specific image from gallery
export const removeProjectImage = (id, body) =>
  api.delete(`/projects/${id}/gallery`, { data: body });

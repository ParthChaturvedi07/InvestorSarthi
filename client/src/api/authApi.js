import api from "./axiosConfig";

// Register a new user
export const registerUser = (data) => api.post("/api/auth/register", data);

// Login user
export const loginUser = (data) => api.post("/api/auth/login", data);

// Get logged-in user profile
export const getProfile = () => api.get("/api/auth/profile");

// Logout user
export const logoutUser = () => api.post("/api/auth/logout");

import api from "./axiosConfig";

// Register a new user
export const registerUser = (data) => api.post("/auth/register", data);

// Login user
export const loginUser = (data) => api.post("/auth/login", data);

// Get logged-in user profile
export const getProfile = () => api.get("/auth/profile");

// Logout user
export const logoutUser = () => api.post("/auth/logout");

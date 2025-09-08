import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on app load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await getProfile();
        setUser(data);
        console.log(data);
      } catch {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginUser(credentials);
    localStorage.setItem("token", data.token);

    // If API does not return user, fetch profile
    let userData;
    if (data.user) {
      userData = data.user;
    } else {
      const profileResponse = await getProfile();
      userData = profileResponse.data;
    }

    setUser(userData);
    return { token: data.token, user: userData };
  };
  const register = async (userData) => {
    const { data } = await registerUser(userData);
    localStorage.setItem("token", data.token);

    let registeredUserData;
    if (data.user) {
      registeredUserData = data.user;
    }
    setUser(registeredUserData);
    return data;
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

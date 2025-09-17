import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import ScrollToTop from "../utils/ScrollToTop";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-800">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* <HelmetProvider> */}
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
      {/* </HelmetProvider> */}
    </>
  );
}

export default App;

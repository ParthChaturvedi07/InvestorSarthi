import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { HelmetProvider } from "react-helmet-async";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import ScrollToTop from "../utils/ScrollToTop";

function App() {
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

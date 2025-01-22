import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import "./App.css";

import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/admin/Dashboard"
import BrandsPage from "./pages/admin/BrandsPage";

// const RedirectToExternal = () => {
//   window.location.href = "https://blogs.krishivikas.com/";
//   return <Navigate to={`/${BASE_URL}`} replace />;;
// };

const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        {/* ADMIN ROUTES START */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/:category/brands" element={<BrandsPage />} />
        {/* ADMIN ROUTES END */}
      </Routes>
    </>
  );
};

export default App;

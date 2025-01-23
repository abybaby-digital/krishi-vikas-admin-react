import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Lazy-loaded components
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const BrandsPage = React.lazy(() => import("./pages/admin/BrandsPage"));
const ModelsPage = React.lazy(() => import("./pages/admin/ModelsPage"));

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop />
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:category/brands" element={<BrandsPage />} />
          <Route path="/:category/models" element={<ModelsPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

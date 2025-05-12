import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Loader from "./components/Loader";

// Lazy-loaded components
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const BrandsPage = React.lazy(() => import("./pages/admin/BrandsPage"));
const ModelsPage = React.lazy(() => import("./pages/admin/ModelsPage"));
const AddComboPlan = React.lazy(() => import("./pages/admin/Combo-Plan/AddComboPlan"));

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);  // Scrolls to top of the page on every navigation
  }, [location]);

  return null;
};

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Use the key prop with dynamic category to ensure full component reset on navigation */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/:category/brands" element={<BrandsPage />} />
          <Route path="/:category/models" element={<ModelsPage />} />
          <Route path="/combo-plan/add-combo-plan" element={<AddComboPlan />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;

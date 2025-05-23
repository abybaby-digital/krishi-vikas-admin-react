import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Loader from "./components/Loader";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import { setToken, setUsers } from "./redux/features/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";


// Lazy-loaded components
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const BrandsPage = React.lazy(() => import("./pages/admin/BrandsPage"));
const ModelsPage = React.lazy(() => import("./pages/admin/ModelsPage"));
const AddComboPlan = React.lazy(() => import("./pages/admin/Combo-Plan/AddComboPlan"));
const ComboPlanList = React.lazy(() => import("./pages/admin/Combo-Plan/ComboPlanList"));
const ComboBannerList = React.lazy(() => import("./pages/admin/Combo-Plan/ComboBannerList"));
const EditComboPlan = React.lazy(() => import("./pages/admin/Combo-Plan/EditComboPlan"));
const ComboPlanPurchase = React.lazy(() => import("./pages/admin/Combo-Plan/ComboPlanPurchase"));
const ComboPlanPurchaseList = React.lazy(() => import("./pages/admin/Combo-Plan/ComboPlanPurchaseList"));
const AddNotificationContent = React.lazy(() => import("./pages/admin/Notifications/AddNotificationContent"));
const NotificationContentList = React.lazy(() => import("./pages/admin/Notifications/NotificationContentList"));
const EditNotificationContent = React.lazy(() => import("./pages/admin/Notifications/EditNotificationContent"));
const PushNotification = React.lazy(() => import("./pages/admin/Notifications/PushNotification"));
const EditPushNotification = React.lazy(() => import("./pages/admin/Notifications/EditPushNotification"));
const NotificationScheduleList = React.lazy(() => import("./pages/admin/Notifications/NotificationScheduleList"));
const AddTractor = React.lazy(() => import("./pages/admin/Tractor/AddTractor"));
const TractorPostList = React.lazy(() => import("./pages/admin/Tractor/TractorPostList"));
const AddComboBanner = React.lazy(() => import("./pages/admin/Combo-Plan/AddComboBanner"));


const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);  // Scrolls to top of the page on every navigation
  }, [location]);

  return null;
};

const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SECRET_KEY = "login-secret-key";
  const encryptedToken = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  // console.log(encryptedToken);
  useEffect(() => {
    if (user) {
      // console.log(JSON.parse(user));
      dispatch(setUsers(JSON.parse(user)));
    }
    if (!encryptedToken) {
      navigate("/login");
    } else {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      dispatch(setToken(decryptedToken));
    }
  }, [encryptedToken, dispatch, navigate]);

  const userInfo = useSelector(state => state.auth);
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={<LoginAdmin />} />

          {/* Use the key prop with dynamic category to ensure full component reset on navigation */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:category/brands" element={<BrandsPage />} />
            <Route path="/:category/models" element={<ModelsPage />} />
            <Route path="/combo-plan/add-combo-plan" element={<AddComboPlan />} />
            <Route path="/combo-plan/combo-plan-list" element={<ComboPlanList />} />
            <Route path="/combo-plan/combo-banner-list" element={<ComboBannerList />} />
            <Route path="/combo-plan/edit/:id" element={<EditComboPlan />} />
            <Route path="/combo-plan/combo-plan-purchase" element={<ComboPlanPurchase />} />
            <Route path="/combo-plan/combo-plan-purchase-list" element={<ComboPlanPurchaseList />} />
            <Route path="/combo-plan/add-combo-banner" element={<AddComboBanner />} />
            <Route path="/notification/add-notification-content" element={<AddNotificationContent />} />
            <Route path="/notification/edit/:id" element={<EditNotificationContent />} />
            <Route path="/notification/notification-content-list" element={<NotificationContentList />} />
            <Route path="/notification/notification-schedule" element={<PushNotification />} />
            <Route path="/notification/notification-schedule/edit/:id" element={<EditPushNotification />} />
            <Route path="/notification/notification-schedule-list" element={<NotificationScheduleList />} />
            <Route path="/tractor/add-post" element={<AddTractor />} />
            <Route path="/tractor/tractor-post-list" element={<TractorPostList />} />
          </Route>

        </Routes>
      </Suspense>
    </>
  );
};

export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Academics from "./pages/Academics";
import Campuses from "./pages/Campuses";
import Activities from "./pages/Activities";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import EnquiryDetail from "./pages/admin/EnquiryDetail";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site with Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="academics" element={<Academics />} />
            <Route path="campuses" element={<Campuses />} />
            <Route path="activities" element={<Activities />} />
            <Route path="news" element={<News />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin — no public layout */}
          <Route path="admin">
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<AdminLogin />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="enquiries/:id"
              element={
                <ProtectedRoute>
                  <EnquiryDetail />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

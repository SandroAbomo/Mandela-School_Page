import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

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
import Overview from "./pages/admin/Overview";
import Enquiries from "./pages/admin/Enquiries";
import EnquiryDetail from "./pages/admin/EnquiryDetail";
import Students from "./pages/admin/Students";
import NewsAdmin from "./pages/admin/NewsAdmin";
import EventsAdmin from "./pages/admin/EventsAdmin";
import Staff from "./pages/admin/Staff";

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

          {/* Staff dashboard — its own layout, every route behind the guard */}
          <Route path="admin">
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="login" element={<AdminLogin />} />
            {/* Kept so old links and bookmarks still land somewhere useful */}
            <Route path="dashboard" element={<Navigate to="/admin/overview" replace />} />

            <Route path="overview" element={<ProtectedRoute><Overview /></ProtectedRoute>} />
            <Route path="enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
            <Route path="enquiries/:id" element={<ProtectedRoute><EnquiryDetail /></ProtectedRoute>} />
            <Route path="students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="news" element={<ProtectedRoute><NewsAdmin /></ProtectedRoute>} />
            <Route path="events" element={<ProtectedRoute><EventsAdmin /></ProtectedRoute>} />
            <Route path="staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

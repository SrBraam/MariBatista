import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Biography from "./pages/Biography";
import { Analytics } from "@vercel/analytics/react";
import Training from "./pages/Training";
import Registration from "./pages/Registration";
import Lectures from "./pages/Lectures";
import Publications from "./pages/Publications";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import WhatsAppButton from "./components/WhatsAppButton";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AdminLectures from "./pages/admin/Lectures";
import AdminPublications from "./pages/admin/Publications";
import Clients from "./pages/admin/Clients";
import { SpeedInsights } from "@vercel/speed-insights/react"; // Add this import

const routes = [
  { path: "/", element: <Home /> },
  { path: "/biografia", element: <Biography /> },
  { path: "/treinamentos", element: <Training /> },
  { path: "/inscricoes", element: <Registration /> },
  { path: "/palestras", element: <Lectures /> },
  { path: "/publicacoes", element: <Publications /> },
  { path: "/politica-de-privacidade", element: <PrivacyPolicy /> },
  { path: "/termos-de-servico", element: <Terms /> },
  { path: "/admin/login", element: <Login /> },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "clients", element: <Clients /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "lectures", element: <AdminLectures /> },
      { path: "publications", element: <AdminPublications /> },
    ],
  },
];

function AppRoutes() {
  return (
    <div
      className="font-[Montserrat] relative min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(13, 13, 16, 1) 0%, rgba(26, 26, 32, 1) 25%, rgba(19, 19, 26, 1) 50%, rgba(32, 32, 38, 1) 75%, rgba(16, 16, 22, 1) 100%), radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0) 70%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.1)_0%,_transparent_70%)] mix-blend-overlay"></div>
      <div className="relative z-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biografia" element={<Biography />} />
          <Route path="/treinamentos" element={<Training />} />
          <Route path="/inscricoes" element={<Registration />} />
          <Route path="/palestras" element={<Lectures />} />
          <Route path="/publicacoes" element={<Publications />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-servico" element={<Terms />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Clients />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="lectures" element={<AdminLectures />} />
            <Route path="publications" element={<AdminPublications />} />
          </Route>
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
      <Analytics />
      <SpeedInsights /> {/* Add this component */}
    </Router>
  );
}

export default App;

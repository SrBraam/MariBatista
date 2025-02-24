import React, { useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  LogOut,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/admin/login");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Clientes", path: "/admin/clients" },
    { icon: BookOpen, label: "Cursos", path: "/admin/courses" },
    { icon: Calendar, label: "Palestras", path: "/admin/lectures" },
    { icon: FileText, label: "Publicações", path: "/admin/publications" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navigation and Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Horizontal Navigation */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="border-b border-[#1D1E22] px-2 py-2 xs:px-4 sm:px-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-1 xs:gap-2 sm:gap-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-1 xs:space-x-2 px-2 py-1 xs:px-3 xs:py-2 rounded-md transition-colors duration-200 text-xs xs:text-sm md:text-base ${
                        isActive
                          ? "bg-[#D4AF37] text-gray-900"
                          : "text-gray-300 hover:bg-[#D4AF37] hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 xs:space-x-2 px-2 py-1 xs:px-3 xs:py-2 rounded-md text-gray-300 hover:bg-red-500 hover:text-white transition-colors duration-200 text-xs xs:text-sm md:text-base"
              >
                <LogOut className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                <span>Sair</span>
              </button>
            </motion.div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 p-2 xs:p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Card } from "../../components/ui/card";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  Mail,
  UserPlus,
  ArrowUpDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Clipboard,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  course_ids: string[];
  message?: string;
  status: string;
  created_at: string;
}

interface NewsletterSubscriber {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface Course {
  id: string;
  title: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalPublications: 0,
    totalRegistrations: 0,
    totalNewsletterSubscribers: 0,
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [registrationSort, setRegistrationSort] = useState<{ field: keyof Registration; asc: boolean } | null>(null);
  const [subscriberSort, setSubscriberSort] = useState<{ field: keyof NewsletterSubscriber; asc: boolean } | null>(null);
  const [currentPageRegistrations, setCurrentPageRegistrations] = useState(1);
  const [currentPageSubscribers, setCurrentPageSubscribers] = useState(1);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSubscriber | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [coursesRes, lectures, publications, regs, subs] = await Promise.all([
        supabase.from("courses").select("id, title"),
        supabase.from("lectures").select("*", { count: "exact" }),
        supabase.from("publications").select("*", { count: "exact" }),
        supabase.from("registrations").select("*"),
        supabase.from("newsletter_subscribers").select("*"),
      ]);

      setStats({
        totalCourses: coursesRes.data?.length || 0,
        totalLectures: lectures.count || 0,
        totalPublications: publications.count || 0,
        totalRegistrations: regs.data?.length || 0,
        totalNewsletterSubscribers: subs.data?.length || 0,
      });

      setCourses(coursesRes.data || []);
      setRegistrations(regs.data || []);
      setSubscribers(subs.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statsCards = [
    { title: "Cursos", value: stats.totalCourses, icon: BookOpen },
    { title: "Palestras", value: stats.totalLectures, icon: Calendar },
    { title: "Publicações", value: stats.totalPublications, icon: FileText },
    { title: "Inscrições", value: stats.totalRegistrations, icon: UserPlus },
    { title: "Assinantes", value: stats.totalNewsletterSubscribers, icon: Mail },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortTable = <T,>(data: T[], field: keyof T, asc: boolean) => {
    return [...data].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (typeof aValue === "string" && typeof bValue === "string") {
        return asc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return asc ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });
  };

  const handleSortRegistrations = (field: keyof Registration) => {
    setRegistrationSort((prev) => ({
      field,
      asc: prev && prev.field === field ? !prev.asc : true,
    }));
    setCurrentPageRegistrations(1);
  };

  const handleSortSubscribers = (field: keyof NewsletterSubscriber) => {
    setSubscriberSort((prev) => ({
      field,
      asc: prev && prev.field === field ? !prev.asc : true,
    }));
    setCurrentPageSubscribers(1);
  };

  const sortedRegistrations = registrationSort
    ? sortTable(registrations, registrationSort.field, registrationSort.asc)
    : registrations;

  const sortedSubscribers = subscriberSort
    ? sortTable(subscribers, subscriberSort.field, subscriberSort.asc)
    : subscribers;

  const totalPagesRegistrations = Math.ceil(sortedRegistrations.length / itemsPerPage);
  const totalPagesSubscribers = Math.ceil(sortedSubscribers.length / itemsPerPage);

  const paginatedRegistrations = sortedRegistrations.slice(
    (currentPageRegistrations - 1) * itemsPerPage,
    currentPageRegistrations * itemsPerPage
  );

  const paginatedSubscribers = sortedSubscribers.slice(
    (currentPageSubscribers - 1) * itemsPerPage,
    currentPageSubscribers * itemsPerPage
  );

  const handlePageChange = (type: "registrations" | "subscribers", direction: "prev" | "next") => {
    if (type === "registrations") {
      setCurrentPageRegistrations((prev) =>
        direction === "prev" ? Math.max(1, prev - 1) : Math.min(totalPagesRegistrations, prev + 1)
      );
    } else {
      setCurrentPageSubscribers((prev) =>
        direction === "prev" ? Math.max(1, prev - 1) : Math.min(totalPagesSubscribers, prev + 1)
      );
    }
  };

  const openRegistrationModal = (reg: Registration) => setSelectedRegistration(reg);
  const closeRegistrationModal = () => setSelectedRegistration(null);

  const openSubscriberModal = (sub: NewsletterSubscriber) => setSelectedSubscriber(sub);
  const closeSubscriberModal = () => setSelectedSubscriber(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`${text} copiado para a área de transferência!`);
  };

  const getCourseTitles = (courseIds: string[]) => {
    return courseIds
      .map((id) => {
        const course = courses.find((c) => c.id === id);
        return course ? course.title : id;
      })
      .join(", ");
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-screen" id="dashboard">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Dashboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-between items-center mb-16"
        >
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-lg text-gray-300">Gerencie seus cursos, inscrições e assinantes</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchData}
            className="bg-[#D4AF37] text-[#1D1E22] px-6 py-2 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22] flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Atualizar</span>
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {statsCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group relative bg-[#1D1E22] rounded-xl shadow-md hover:shadow-lg border border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1D1E22]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="p-6 bg-transparent border-0 flex items-center justify-between w-full relative z-10">
                <div className="flex items-center space-x-4">
                  <stat.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300" />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#1D1E22] transition-colors duration-300">
                      {stat.title}
                    </h3>
                    <span className="text-2xl font-semibold text-[#D4AF37] group-hover:text-[#1D1E22] transition-colors duration-300">
                      {stat.value}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Registrations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-[#1D1E22] rounded-xl shadow-md border border-[#D4AF37]/20 p-6 mb-16"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-[#D4AF37]" /> Inscrições
            </h2>
            <motion.a
              href="/inscricoes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D4AF37] text-[#1D1E22] px-6 py-2 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
            >
              Ver Todas
            </motion.a>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-4">
                  <div className="h-6 bg-[#2F3036] rounded w-1/6"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/4"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/6"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/4"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/6"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/6"></div>
                </div>
              ))}
            </div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-300 mb-4">
                Nenhuma inscrição registrada. Promova seus cursos para começar!
              </p>
              <motion.a
                href="/inscricoes"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-2 bg-[#D4AF37] text-[#1D1E22] rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
              >
                Promover Cursos
              </motion.a>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-[#2F3036] text-gray-300 border-b border-[#D4AF37]/20 sticky top-0 z-10">
                    <tr>
                      <th
                        scope="col"
                        className={`px-4 py-3 cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 ${
                          registrationSort?.field === "name" ? "text-[#D4AF37]" : ""
                        }`}
                        onClick={() => handleSortRegistrations("name")}
                        aria-sort={
                          registrationSort?.field === "name"
                            ? registrationSort.asc
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        Nome{" "}
                        {registrationSort?.field === "name" && (
                          <ArrowUpDown
                            className={`inline w-4 h-4 ml-1 ${registrationSort.asc ? "rotate-180" : ""}`}
                          />
                        )}
                      </th>
                      <th
                        scope="col"
                        className={`px-4 py-3 cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 ${
                          registrationSort?.field === "email" ? "text-[#D4AF37]" : ""
                        }`}
                        onClick={() => handleSortRegistrations("email")}
                        aria-sort={
                          registrationSort?.field === "email"
                            ? registrationSort.asc
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        E-mail{" "}
                        {registrationSort?.field === "email" && (
                          <ArrowUpDown
                            className={`inline w-4 h-4 ml-1 ${registrationSort.asc ? "rotate-180" : ""}`}
                          />
                        )}
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Telefone
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Cursos
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Mensagem
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Status
                      </th>
                      <th
                        scope="col"
                        className={`px-4 py-3 cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 ${
                          registrationSort?.field === "created_at" ? "text-[#D4AF37]" : ""
                        }`}
                        onClick={() => handleSortRegistrations("created_at")}
                        aria-sort={
                          registrationSort?.field === "created_at"
                            ? registrationSort.asc
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        Data{" "}
                        {registrationSort?.field === "created_at" && (
                          <ArrowUpDown
                            className={`inline w-4 h-4 ml-1 ${registrationSort.asc ? "rotate-180" : ""}`}
                          />
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRegistrations.map((reg, index) => (
                      <motion.tr
                        key={reg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`${
                          index % 2 === 0 ? "bg-[#1D1E22]/50" : "bg-[#1D1E22]/70"
                        } hover:bg-[#D4AF37]/20 transition-all duration-300 cursor-pointer`}
                        onClick={() => openRegistrationModal(reg)}
                      >
                        <td className="px-4 py-3 font-medium text-white">{reg.name}</td>
                        <td className="px-4 py-3 truncate max-w-[150px]" title={reg.email}>
                          {reg.email}
                        </td>
                        <td className="px-4 py-3">{reg.phone}</td>
                        <td className="px-4 py-3 truncate max-w-[120px]" title={getCourseTitles(reg.course_ids)}>
                          {getCourseTitles(reg.course_ids)}
                        </td>
                        <td className="px-4 py-3 truncate max-w-[150px]" title={reg.message || "N/A"}>
                          {reg.message || "N/A"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              reg.status === "approved"
                                ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                                : "bg-yellow-500/20 text-yellow-500"
                            } transition-colors duration-300`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{formatDate(reg.created_at)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls for Registrations */}
              {totalPagesRegistrations > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange("registrations", "prev")}
                    disabled={currentPageRegistrations === 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2F3036] text-gray-300 rounded-lg hover:bg-[#D4AF37] hover:text-[#1D1E22] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </motion.button>
                  <span className="text-gray-300">
                    Página {currentPageRegistrations} de {totalPagesRegistrations}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange("registrations", "next")}
                    disabled={currentPageRegistrations === totalPagesRegistrations}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2F3036] text-gray-300 rounded-lg hover:bg-[#D4AF37] hover:text-[#1D1E22] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Próxima</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Newsletter Subscribers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-[#1D1E22] rounded-xl shadow-md border border-[#D4AF37]/20 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Mail className="w-6 h-6 mr-2 text-[#D4AF37]" /> Assinantes da Newsletter
            </h2>
            <motion.a
              href="/newsletter"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D4AF37] text-[#1D1E22] px-6 py-2 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
            >
              Ver Todos
            </motion.a>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-4">
                  <div className="h-6 bg-[#2F3036] rounded w-1/4"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/3"></div>
                  <div className="h-6 bg-[#2F3036] rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : subscribers.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-300 mb-4">
                Nenhum assinante registrado. Incentive seus visitantes agora!
              </p>
              <motion.a
                href="/newsletter"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-2 bg-[#D4AF37] text-[#1D1E22] rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
              >
                Convidar Assinantes
              </motion.a>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                  <thead className="text-xs uppercase bg-[#2F3036] text-gray-300 border-b border-[#D4AF37]/20 sticky top-0 z-10">
                    <tr>
                      <th
                        scope="col"
                        className={`px-4 py-3 cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 ${
                          subscriberSort?.field === "name" ? "text-[#D4AF37]" : ""
                        }`}
                        onClick={() => handleSortSubscribers("name")}
                        aria-sort={
                          subscriberSort?.field === "name"
                            ? subscriberSort.asc
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        Nome{" "}
                        {subscriberSort?.field === "name" && (
                          <ArrowUpDown
                            className={`inline w-4 h-4 ml-1 ${subscriberSort.asc ? "rotate-180" : ""}`}
                          />
                        )}
                      </th>
                      <th
                        scope="col"
                        className={`px-4 py-3 cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 ${
                          subscriberSort?.field === "email" ? "text-[#D4AF37]" : ""
                        }`}
                        onClick={() => handleSortSubscribers("email")}
                        aria-sort={
                          subscriberSort?.field === "email"
                            ? subscriberSort.asc
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        E-mail{" "}
                        {subscriberSort?.field === "email" && (
                          <ArrowUpDown
                            className={`inline w-4 h-4 ml-1 ${subscriberSort.asc ? "rotate-180" : ""}`}
                          />
                        )}
                      </th>
                      <th
                        scope="col"
                        className={`px-4 py-3 cursor-pointer hover:text-[#D4AF37] transition-colors duration-300 ${
                          subscriberSort?.field === "created_at" ? "text-[#D4AF37]" : ""
                        }`}
                        onClick={() => handleSortSubscribers("created_at")}
                        aria-sort={
                          subscriberSort?.field === "created_at"
                            ? subscriberSort.asc
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                      >
                        Data{" "}
                        {subscriberSort?.field === "created_at" && (
                          <ArrowUpDown
                            className={`inline w-4 h-4 ml-1 ${subscriberSort.asc ? "rotate-180" : ""}`}
                          />
                        )}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSubscribers.map((sub, index) => (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`${
                          index % 2 === 0 ? "bg-[#1D1E22]/50" : "bg-[#1D1E22]/70"
                        } hover:bg-[#D4AF37]/20 transition-all duration-300 cursor-pointer`}
                        onClick={() => openSubscriberModal(sub)}
                      >
                        <td className="px-4 py-3 font-medium text-white">{sub.name}</td>
                        <td className="px-4 py-3 truncate max-w-[200px]" title={sub.email}>
                          {sub.email}
                        </td>
                        <td className="px-4 py-3">{formatDate(sub.created_at)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls for Subscribers */}
              {totalPagesSubscribers > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange("subscribers", "prev")}
                    disabled={currentPageSubscribers === 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2F3036] text-gray-300 rounded-lg hover:bg-[#D4AF37] hover:text-[#1D1E22] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Anterior</span>
                  </motion.button>
                  <span className="text-gray-300">
                    Página {currentPageSubscribers} de {totalPagesSubscribers}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange("subscribers", "next")}
                    disabled={currentPageSubscribers === totalPagesSubscribers}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#2F3036] text-gray-300 rounded-lg hover:bg-[#D4AF37] hover:text-[#1D1E22] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Próxima</span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Enhanced Registration Details Modal */}
        <Dialog open={!!selectedRegistration} onOpenChange={closeRegistrationModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DialogContent className="bg-[#1D1E22] text-white border border-[#D4AF37]/20 rounded-xl w-full max-w-md p-6 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center">
                  <UserPlus className="w-6 h-6 mr-3 text-[#D4AF37]" /> Detalhes da Inscrição
                </DialogTitle>
              </DialogHeader>
              {selectedRegistration && (
                <div className="space-y-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <User className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 min-h-[48px]">
                      <span className="text-gray-300 text-sm font-medium">Nome</span>
                      <p className="text-base text-white">{selectedRegistration.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <Mail className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 flex items-center space-x-2 min-h-[48px]">
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm font-medium">E-mail</span>
                        <p className="text-base text-white truncate">{selectedRegistration.email}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(selectedRegistration.email)}
                        className="text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300"
                        title="Copiar e-mail"
                      >
                        <Clipboard className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <Phone className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 flex items-center space-x-2 min-h-[48px]">
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm font-medium">Telefone</span>
                        <p className="text-base text-white">{selectedRegistration.phone}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(selectedRegistration.phone)}
                        className="text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300"
                        title="Copiar telefone"
                      >
                        <Clipboard className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 flex justify-center">
                        <BookOpen className="w-5 h-5 text-[#D4AF37] mt-1" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm font-medium">Cursos</span>
                        <p className="text-base text-white bg-[#2F3036] p-2 rounded-lg h-16 overflow-y-auto">
                          {getCourseTitles(selectedRegistration.course_ids)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 flex justify-center">
                        <FileText className="w-5 h-5 text-[#D4AF37] mt-1" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm font-medium">Mensagem</span>
                        <p className="text-base text-white bg-[#2F3036] p-2 rounded-lg h-16 overflow-y-auto">
                          {selectedRegistration.message || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      {/* Placeholder */}
                    </div>
                    <div className="flex-1 min-h-[48px] flex items-center">
                      <span className="text-gray-300 text-sm font-medium">Status</span>
                      <span
                        className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ml-2 ${
                          selectedRegistration.status === "approved"
                            ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {selectedRegistration.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <Calendar className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 min-h-[48px]">
                      <span className="text-gray-300 text-sm font-medium">Data</span>
                      <p className="text-base text-white">{formatDate(selectedRegistration.created_at)}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeRegistrationModal}
                    className="mt-6 w-full bg-[#D4AF37] text-[#1D1E22] px-6 py-3 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
                  >
                    Fechar
                  </motion.button>
                </div>
              )}
            </DialogContent>
          </motion.div>
        </Dialog>

        {/* Enhanced Subscriber Details Modal */}
        <Dialog open={!!selectedSubscriber} onOpenChange={closeSubscriberModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DialogContent className="bg-[#1D1E22] text-white border border-[#D4AF37]/20 rounded-xl w-full max-w-md p-6 shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-[#D4AF37]" /> Detalhes do Assinante
                </DialogTitle>
              </DialogHeader>
              {selectedSubscriber && (
                <div className="space-y-4 mt-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <User className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 min-h-[48px]">
                      <span className="text-gray-300 text-sm font-medium">Nome</span>
                      <p className="text-base text-white">{selectedSubscriber.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <Mail className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 flex items-center space-x-2 min-h-[48px]">
                      <div className="flex-1">
                        <span className="text-gray-300 text-sm font-medium">E-mail</span>
                        <p className="text-base text-white truncate">{selectedSubscriber.email}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(selectedSubscriber.email)}
                        className="text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300"
                        title="Copiar e-mail"
                      >
                        <Clipboard className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 flex justify-center">
                      <Calendar className="w-5 h-5 text-[#D4AF37] mt-1" />
                    </div>
                    <div className="flex-1 min-h-[48px]">
                      <span className="text-gray-300 text-sm font-medium">Data</span>
                      <p className="text-base text-white">{formatDate(selectedSubscriber.created_at)}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeSubscriberModal}
                    className="mt-6 w-full bg-[#D4AF37] text-[#1D1E22] px-6 py-3 rounded-lg hover:bg-[#C09B30] transition-all duration-300 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
                  >
                    Fechar
                  </motion.button>
                </div>
              )}
            </DialogContent>
          </motion.div>
        </Dialog>
      </div>
    </section>
  );
}
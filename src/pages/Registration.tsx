import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square, AlertCircle, CheckCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  format: string;
  price: number;
  image_url: string;
}

interface Toast {
  id: string;
  type: "success" | "error" | "payment";
  message: string;
  totalPrice?: string;
}

export default function Registration() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length <= 2) {
      return `(${phoneNumber}`;
    } else if (phoneNumber.length <= 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    } else if (phoneNumber.length <= 11) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    } else {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 3)} ${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) console.error("Error fetching courses:", error);
      else setCourses(data || []);
      setIsLoading(false);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (toast) {
      timer = setTimeout(() => {
        setToast(null);
      }, 120000); // 120 seconds = 2 minutes
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [toast]);

  const handleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
    setIsDropdownOpen(false);
  };

  const calculatePrice = () => {
    let price = 0;
    switch (selectedCourses.length) {
      case 0:
        price = 0;
        break;
      case 1:
      case 2:
        price = selectedCourses.length * 50;
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        price = selectedCourses.length * 45;
        break;
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
        price = selectedCourses.length * 42.5;
        break;
      default:
        price = selectedCourses.length * 40;
    }
    return `R$ ${price.toFixed(2)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const totalPrice = calculatePrice();

    try {
      const { error } = await supabase.from("registrations").insert([
        {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          course_ids: selectedCourses,
          message: formData.get("message"),
        },
      ]);
      if (error) throw error;
      setToast({
        id: Date.now().toString(),
        type: "payment",
        message: "Inscrição realizada com sucesso! Efetue o pagamento via Pix.",
        totalPrice,
      });
      form.reset();
      setSelectedCourses([]);
      setTermsAccepted(false);
    } catch (error) {
      setToast({
        id: Date.now().toString(),
        type: "error",
        message: "Erro ao realizar inscrição. Tente novamente.",
      });
    }
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <section className="py-12 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1D1E22] rounded-xl p-6 sm:p-8 shadow-lg border border-[#D4AF37]/20"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 text-center">
            Inscrições
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base font-medium text-gray-300">
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Digite seu nome completo"
                className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-300">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Digite seu e-mail"
                className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] focus:outline-none transition-all duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm sm:text-base font-medium text-gray-300">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(XX) X XXXX-XXXX"
                className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] focus:outline-none transition-all duration-300"
                required
                onChange={(e) => {
                  e.target.value = formatPhoneNumber(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                Cursos de Interesse
              </label>
              <div className="relative">
                <div
                  className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus-within:border-[#D4AF37] focus-within:ring-[#D4AF37] transition-all duration-300 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{isLoading ? "Carregando cursos..." : "Selecione um curso"}</span>
                  {isDropdownOpen ? (
                    <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                  ) : (
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                  )}
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-md bg-[#1D1E22] border border-[#1D1E22] text-white shadow-lg custom-scrollbar"
                      style={{
                        scrollbarWidth: "thin",
                        scrollbarColor: "#D4AF37 #1D1E22",
                      }}
                    >
                      {isLoading ? (
                        <li className="px-4 py-2 text-gray-300">Carregando cursos...</li>
                      ) : (
                        courses
                          .filter((course) => !selectedCourses.includes(course.id))
                          .map((course) => (
                            <li
                              key={course.id}
                              onClick={() => handleCourseSelection(course.id)}
                              className="px-4 py-2 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] cursor-pointer transition-colors duration-200"
                            >
                              {course.title}
                            </li>
                          ))
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-4">
                <AnimatePresence>
                  {selectedCourses.map((courseId) => {
                    const course = courses.find((c) => c.id === courseId);
                    return course ? (
                      <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between bg-[#D4AF37]/10 border border-[#D4AF37] rounded-md px-4 py-2 mb-2"
                      >
                        <span className="text-white">{course.title}</span>
                        <button
                          type="button"
                          onClick={() => handleCourseSelection(course.id)}
                          className="text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            <X className="w-4 h-4" />
                          </motion.div>
                        </button>
                      </motion.div>
                    ) : null;
                  })}
                </AnimatePresence>
              </div>
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-300">
                Preço Total:
              </label>
              <p className="text-[#D4AF37] text-lg font-bold">{calculatePrice()}</p>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm sm:text-base font-medium text-gray-300">
                Mensagem (opcional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Digite sua mensagem aqui..."
                className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] focus:outline-none transition-all duration-300 resize-none"
              ></textarea>
            </div>
            <div className="flex items-center cursor-pointer">
              <div onClick={() => setTermsAccepted(!termsAccepted)} className="flex items-center">
                {termsAccepted ? (
                  <CheckSquare className="text-[#D4AF37] flex-shrink-0 w-4 h-4" />
                ) : (
                  <Square className="text-gray-300 flex-shrink-0 w-4 h-4" />
                )}
                <span className="ml-2 text-sm sm:text-base text-gray-300">
                  Concordo com os{" "}
                  <Link
                    to="/termos-de-servico"
                    className="inline text-[#D4AF37] hover:text-[#C09B30] underline transition-colors duration-200"
                  >
                    termos e condições
                  </Link>
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!termsAccepted || selectedCourses.length === 0}
              className="w-full py-3 px-4 bg-[#D4AF37] text-[#1D1E22] rounded-lg font-semibold hover:bg-[#C09B30] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enviar Inscrição
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Enhanced Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-6 right-6 max-w-md w-full p-4 rounded-xl shadow-2xl border ${
              toast.type === "success"
                ? "bg-green-600/95 border-green-500/50"
                : toast.type === "error"
                ? "bg-red-600/95 border-red-500/50"
                : "bg-[#1D1E22]/95 border-[#D4AF37]/30"
            } backdrop-blur-sm`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {toast.type === "success" ? (
                  <CheckCircle className="w-6 h-6 text-white" />
                ) : toast.type === "error" ? (
                  <AlertCircle className="w-6 h-6 text-white" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium text-sm sm:text-base">
                    {toast.message}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeToast}
                    className="text-gray-300 hover:text-white focus:outline-none"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
                
                {toast.type === "payment" && (
                  <div className="mt-3 space-y-3">
                    <div className="flex justify-center">
                      <img
                        src="https://i.imgur.com/byq6bsI.png"
                        alt="Pix QR Code"
                        className="w-32 h-32 rounded-lg border border-[#1D1E22]"
                      />
                    </div>
                    <div className="text-sm text-gray-200 space-y-2">
                      <p>1. Escaneie o QR code acima com o app do seu banco</p>
                      <p>
                        2. Valor total a pagar:{" "}
                        <span className="font-bold text-[#D4AF37]">{toast.totalPrice || "R$ 0.00"}</span>
                      </p>
                      <p>3. Envie o comprovante para:</p>
                      <div className="ml-4">
                        <p>
                          WhatsApp:{" "}
                          <a
                            href="https://wa.me/5571987835827"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300"
                          >
                            (71) 9 8783-5827
                          </a>
                        </p>
                        <p>
                          Email:{" "}
                          <a
                            href="mailto:equipe@maribatista.com.br"
                            className="text-[#D4AF37] hover:text-[#C09B30] transition-colors duration-300"
                          >
                            equipe@maribatista.com.br
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/30"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 120, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Updated CSS styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #1D1E22;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #D4AF37;
    border-radius: 9999px;
  }

  .toast-container {
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Add this to your CSS file (e.g., globals.css) or within a <style> tag:
<style>{styles}</style>
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Credenciais inválidas. Tente novamente.");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">Área Administrativa</h1>
          <p className="text-gray-300 mt-2 text-lg">Faça login para acessar o painel</p>
        </div>

        <div className="bg-[#1D1E22] p-8 rounded-xl shadow-lg border border-[#D4AF37]/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] focus:outline-none transition-all duration-300 placeholder-gray-400"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="mt-1 block w-full px-4 py-3 rounded-md bg-[#2F3036] border border-[#1D1E22] text-white shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] focus:outline-none transition-all duration-300 placeholder-gray-400"
                required
              />
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-2 bg-red-500/10 text-red-500 text-sm p-3 rounded-md border border-red-500/20"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-[#D4AF37] text-[#1D1E22] rounded-xl font-semibold hover:bg-[#C09B30] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1D1E22]"
            >
              Entrar
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

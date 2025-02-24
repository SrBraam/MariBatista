import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckSquare, Square } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) {
      setError("Você deve concordar com a Política de Privacidade.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const { error } = await supabase.from("newsletter_subscribers").insert([
      {
        name: formData.get("name"),
        email: formData.get("email"),
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        setError("Este e-mail já está cadastrado.");
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    } else {
      setSuccess(true);
      form.reset();
    }

    setIsSubmitting(false);
  };

  return (
    <section className="bg-[#D4AF37] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1D1E22] mb-8">
            Receba Oportunidades Exclusivas
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <input
              type="text"
              name="name"
              placeholder="Seu nome completo"
              className="px-6 py-3 rounded-lg flex-1 bg-white/90"
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              className="px-6 py-3 rounded-lg flex-1 bg-white/90"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 rounded-lg font-semibold text-[#D4AF37] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, rgba(17, 24, 39, 1) 0%, rgba(31, 41, 55, 1) 30%, rgba(15, 23, 42, 1) 60%, rgba(17, 24, 39, 1) 100%), radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0) 70%)",
              }}
            >
              {isSubmitting ? "Enviando..." : "Inscrever-se"}
            </button>
          </form>
          {error && <p className="mt-2 text-red-800 text-sm">{error}</p>}
          {success && (
            <p className="mt-2 text-[#1D1E22] text-sm">
              Inscrição realizada com sucesso!
            </p>
          )}
          <div className="mt-4 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsChecked(!isChecked)}
              className="mr-2 cursor-pointer outline-none focus:outline-none hover:bg-white/20 rounded-sm transition-colors duration-200 p-1"
            >
              {isChecked ? (
                <CheckSquare
                  size={20}
                  className="text-[#1D1E22] transition-colors duration-200"
                  style={{ opacity: 1 }}
                />
              ) : (
                <Square
                  size={20}
                  className="text-[#1D1E22] transition-colors duration-200"
                  style={{ opacity: 1 }}
                />
              )}
            </button>
            <label htmlFor="politica" className="text-[#1D1E22] text-sm">
              Concordo com a{" "}
              <a 
                href="/politica-de-privacidade" 
                className="underline hover:text-white transition-colors duration-200"
              >
                Política de Privacidade
              </a>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/+5571987835827"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full flex items-center justify-center"
      style={{
        boxShadow: "0 4px 14px -3px rgba(37, 211, 102, 0.4)",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "#4EEA7D",
        boxShadow: "0 0 25px 8px rgba(78, 234, 125, 0.4)",
        transition: { duration: 0.3 },
      }}
      whileTap={{
        scale: 0.9,
        boxShadow: "0 0 15px 3px rgba(78, 234, 125, 0.3)",
      }}
      initial={{ opacity: 0, y: 20, rotate: -45 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 15,
        },
      }}
      transition={{
        default: { type: "spring", stiffness: 300, damping: 15 },
        boxShadow: { duration: 0.3, ease: "easeInOut" },
        backgroundColor: { duration: 0.3, ease: "easeInOut" },
      }}
      aria-label="Contact via WhatsApp"
    >
      {/* Pulsating Glow Animation */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(37, 211, 102, 0.4)",
        }}
        animate={{
          scale: [1, 1.2, 1], // Scale up and down for pulsating effect
          opacity: [0.6, 0.8, 0.6], // Alternate opacity for glowing effect
        }}
        transition={{
          duration: 2,
          repeat: Infinity, // Infinite loop
          ease: "easeInOut",
        }}
      />
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="w-6 h-6 relative z-10"
        viewBox="0 0 16 16"
        whileHover={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.6 }}
      >
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </motion.svg>
    </motion.a>
  );
}
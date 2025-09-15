import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import heroImage from "../assets/team-eric.jpg";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background animé */}

      {/* Particules flottantes */}
      <div className="absolute inset-0 -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/40 shadow-md"
            initial={{ y: Math.random() * 600, x: Math.random() * 1200, opacity: 0 }}
            animate={{
              y: [null, Math.random() * -800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 py-24 flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
        {/* Texte + CTA */}
        <motion.div
          className="flex-1 text-center md:text-left bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Hello ! Je suis Dona Eric KOULODJI, {" "}
            <span className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  "Data Scientist & Machine Learning Engineer,", 800,
                  "Passionné de l'Intelligence Artificielle et de l'espace,", 800,
                  "Titulaire d'une licence en Physique Fondamentale,", 800,
                  "Ambassadeur 10000Codeurs ."
                ]}
                wrapper="span"
                repeat={Infinity}
              />
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ delay: 0.2 }}>
              <Link
                to="/about"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-transform duration-300"
              >
                About-me
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} transition={{ delay: 0.4 }}>
              <Link
                to="/about"
                className="px-6 py-3 border-2 border-indigo-600 text-purple-600 rounded-lg hover:bg-indigo-50 transition-transform duration-300"
              >
                Mon CV
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Image flottante */}
        <motion.div
          className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.6)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={heroImage}
            alt="Eric"
            className="w-100 h-100 object-cover object-center transform hover:scale-110 transition duration-700"
          />
        </motion.div>
      </div>

      {/* Background gradient animation CSS */}
      <style>
        {`
          @keyframes gradientBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradientBackground {
            background-size: 400% 400%;
            animation: gradientBackground 15s ease infinite;
          }
        `}
      </style>
    </section>
  );
}

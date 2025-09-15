import React from "react";
import { motion } from "framer-motion";
import SignupForm from "../components/SignupForm";
import { Code, Cpu, BookOpen, Layers } from "lucide-react";

export default function Signup() {
  const programs = [
    {
      title: "Développement Web",
      icon: <Code size={28} className="text-sky-400 animate-bounce" />,
      description: "Sites vitrines, e-commerce et applications web sur-mesure.",
    },
    {
      title: "Data & IA",
      icon: <Cpu size={28} className="text-green-400 animate-pulse" />,
      description: "Analyse de données, Machine Learning et solutions IA sur-mesure.",
    },
    {
      title: "Formations & Mentorat",
      icon: <BookOpen size={28} className="text-purple-400 animate-bounce" />,
      description: "Bootcamps, cours pratiques et mentorat professionnel.",
    },
    {
      title: "Solutions d'entreprise",
      icon: <Layers size={28} className="text-indigo-400 animate-pulse" />,
      description: "ERP, CRM, chatbots et intégrations métiers.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 py-16 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 opacity-30 animate-gradient-slow"></div>

      {/* Header */}
      <header className="text-center mb-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
        >
          Inscrivez-vous à une formation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-slate-300 max-w-2xl mx-auto"
        >
          Choisissez votre programme et rejoignez nos formations pratiques et
          professionnelles pour booster vos compétences digitales.
        </motion.p>
      </header>

      {/* Programs & Form */}
      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Programs */}
        <div className="space-y-6">
          {programs.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-slate-900/70 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:shadow-indigo-900/50 flex items-start gap-4 cursor-pointer transition-transform hover:scale-105"
            >
              <div>{p.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-white">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-indigo-900/50"
        >
          <SignupForm />
        </motion.div>
      </section>

      {/* Footer Note */}
      <motion.section
        className="text-center mt-16 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-slate-400 max-w-xl mx-auto">
          Après votre inscription, notre équipe vous contactera pour confirmer
          votre place et vous fournir toutes les informations nécessaires.
        </p>
      </motion.section>

      {/* Animated gradient background */}
      <style>
        {`
          @keyframes gradientSlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-slow {
            background: linear-gradient(135deg, #312e81, #5b21b6, #7e22ce, #db2777);
            background-size: 400% 400%;
            animation: gradientSlow 25s ease infinite;
          }
        `}
      </style>
    </main>
  );
}

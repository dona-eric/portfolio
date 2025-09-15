import React from "react";
import { motion } from "framer-motion";
import { Code, Cpu, BookOpen, Layers } from "lucide-react";

const services = [
  {
    title: "Développement Web",
    description: "Sites vitrines, e-commerce et applications web sur-mesure.",
    icon: <Code size={28} className="text-sky-400 animate-bounce" />,
    label: "Populaire",
  },
  {
    title: "Data & IA",
    description: "Analyse de données, Machine Learning et solutions IA sur-mesure.",
    icon: <Cpu size={28} className="text-green-400 animate-pulse" />,
  },
  {
    title: "Formations & Mentorat",
    description: "Bootcamps, cours pratiques et mentorat professionnel.",
    icon: <BookOpen size={28} className="text-purple-400 animate-bounce" />,
    label: "Nouveau",
  },
  {
    title: "Solutions d'entreprise",
    description: "ERP, CRM, chatbots et intégrations métiers.",
    icon: <Layers size={28} className="text-indigo-400 animate-pulse" />,
  },
];

const ServiceCard = ({ icon, title, description, label }) => (
  <motion.div
    className="bg-slate-900/80 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-indigo-900/50 transition-transform duration-300 relative cursor-pointer"
    whileHover={{ scale: 1.05, rotate: 1 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {label && (
      <span className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold shadow-md">
        {label}
      </span>
    )}
    <div className="mb-4">{icon}</div>
    <h3 className="font-semibold text-lg text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-300">{description}</p>
  </motion.div>
);

export default function Services() {
  return (
    <section
      id="services"
      className="relative container mx-auto px-6 py-20 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white"
    >
      {/* Intro */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          🚀 Mes Services
        </h2>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Mes offres pour les entreprises, les étudiants et les institutions,
          avec des solutions digitales et numériques innovantes.
        </p>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((s, idx) => (
          <ServiceCard
            key={idx}
            icon={s.icon}
            title={s.title}
            description={s.description}
            label={s.label}
          />
        ))}
      </div>

      {/* Animation de fond */}
      <div className="absolute inset-0 -z-10 opacity-20 animate-gradient-slow"></div>

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
    </section>
  );
}

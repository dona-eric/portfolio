import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Cpu, BookOpen } from "lucide-react";

const services = [
  {
    title: "Analyse de données",
    description: "Aider les entreprises à comprendre leurs données, à identifier des tendances et à prendre des décisions éclairées.",
    icon: <Code className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Data & IA",
    description: "Développement de modèles de Machine Learning personalisés pour répondre à des problèmes spécifiques. Aider les entreprises à intégrer l'IA dans leurs processus métier pour améliorer l'éfficacité et la productivité",
    icon: <Database className="w-8 h-8 text-indigo-600" />,
  },
  {
    title: "Formations & Ateliers",
    description: "Organiser des formations et des ateliers pour les étudiants et employés des entreprises sur les concepts de base de la science des données et l'intelligence artificielle.",
    icon: <BookOpen className="w-8 h-8 from-purple-500 to-pink-600" />,
  },
  {
    title: "Conseil & Mentorat",
    description: "Offrir du mentorat à des étudiants ou à des professionnels qui souhaitent se lancer dans une carrière de la science des données, du Machine Learning et de l'Intelligence Artificielle.",
    icon: <Cpu className="w-8 h-8 text-indigo-600" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-16">
      {/* Background animé léger */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-purple-500 via-purple-100 to-pink-600 animate-gradient-slow opacity-40"></div>
      </div>

      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800">Mes Catalogues</h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">
            Découvrez mes offres pour entreprises et apprenants, adaptées à vos besoins numériques.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-2 transition-transform duration-300 cursor-pointer relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-slate-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS pour l’animation de gradient */}
      <style>
        {`
          @keyframes gradientSlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-slow {
            background-size: 400% 400%;
            animation: gradientSlow 25s ease infinite;
          }
        `}
      </style>
    </section>
  );
}

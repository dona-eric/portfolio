import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import partnerImg from "../assets/meta.jpg";

const TestimonialCard = ({ quote, author, role }) => (
  <motion.div
    key={quote}
    className="p-8 rounded-2xl 
               bg-slate-900/80 backdrop-blur-md 
               border border-white/10 
               shadow-xl text-center"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-slate-200 italic text-lg leading-relaxed">“{quote}”</p>
    <div className="mt-4 text-sm text-slate-400">
      — {author}, <span className="font-medium text-indigo-400">{role}</span>
    </div>
  </motion.div>
);

export default function Testimonials() {
  const items = [
    { quote: "La formation m’a permis d’obtenir un premier contrat en tant que data analyste.", author: "Fatou", role: "Ancienne stagiaire" },
    { quote: "Excellent accompagnement et projets concrets.", author: "Agence X", role: "Client" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 to-slate-900 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Témoignages & partenaires
        </h2>
        <p className="text-slate-300 mt-3 max-w-2xl mx-auto">
          Ce que nos étudiants et clients disent de nous.
        </p>
      </div>

      {/* Carousel témoignages */}
      <div className="max-w-2xl mx-auto relative">
        <AnimatePresence mode="wait">
          <TestimonialCard key={index} {...items[index]} />
        </AnimatePresence>
        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            className="flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white shadow hover:from-indigo-700 hover:to-purple-700 transition"
          >
            <ChevronLeft size={20} /> Précédent
          </button>
          <button
            onClick={next}
            className="flex items-center gap-2 px-5 py-2 rounded-lg 
                       bg-gradient-to-r from-indigo-600 to-purple-600 
                       text-white shadow hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Suivant <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Partenaires */}
      <div className="mt-16 text-center">
        <h4 className="font-semibold text-lg text-slate-200 mb-6">Nos partenaires</h4>
        <motion.div
          className="flex items-center justify-center w-36 h-36 mx-auto 
                     rounded-full bg-slate-900/80 backdrop-blur-md 
                     border border-white/10 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={partnerImg}
            alt="partner"
            className="w-24 h-24 object-contain"
            whileHover={{ scale: 1.1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}

import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <main className="scroll-smooth bg-slate-950 text-white">
      {/* Hero interactif avec CTA */}
      <Hero />

      {/* About */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        <About />
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative"
      >
        <Testimonials />
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            📩 Contact-me
          </h2>
          <p className="text-slate-300 mb-12">
            Une question ? Un projet ? Je suis à votre écoute.
          </p>

          {/* Carte coordonnées */}
          <div className="max-w-xl mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 backdrop-blur-lg border border-purple-700/30 p-8 rounded-2xl shadow-2xl hover:shadow-purple-900/40 transition">
            <h3 className="font-semibold mb-6 text-2xl text-white">
              Nos coordonnées
            </h3>
            <ul className="space-y-4 text-slate-200">
              <li>
                📧 Email :{" "}
                <a
                  href="mailto:donaerickoulodji@gmail.com"
                  className="text-purple-400 hover:underline"
                >
                  donaerickoulodji@gmail.com
                </a>
              </li>
              <li>
                💬 WhatsApp :{" "}
                <a
                  href="https://wa.me/+2290141730240"
                  className="text-green-400 hover:underline"
                >
                  +229 01 41 73 02 40
                </a>
              </li>
              <li>
                🔗 LinkedIn :{" "}
                <a
                  href="https://linkedin.com/in/dona-erick"
                  className="text-blue-400 hover:underline"
                >
                  @dona-erick
                </a>
              </li>
              <li className="mt-4">📍 Bénin, Abomey-Calavi</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

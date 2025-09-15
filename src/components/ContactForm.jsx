import React, { useState } from "react";
import { Loader2, CheckCircle, XCircle, Mail, User, MessageSquare, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/api";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("missing");
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      await api.postContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Formulaire */}
        <motion.div
          className="bg-slate-900/80 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Contactez-me</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Nom</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-slate-800/70 border border-white/10 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-slate-800/70 border border-white/10 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-300">Message</label>
              <div className="relative mt-1">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full pl-10 pr-3 py-2 bg-slate-800/70 border border-white/10 text-white placeholder-slate-400 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Écrivez votre message ici..."
                />
              </div>
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full px-6 py-3 rounded-xl text-white font-medium shadow-lg flex items-center justify-center gap-2 transition ${
                status === "sending"
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-pink-600 hover:scale-105"
              }`}
            >
              {status === "sending" && <Loader2 className="animate-spin w-5 h-5" />}
              {status === "sending" ? "Envoi..." : "Envoyer"}
            </button>

            {/* Statuts */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p
                  className="text-green-400 flex items-center gap-2 text-sm mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle className="w-4 h-4" /> Message envoyé — merci !
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  className="text-red-400 flex items-center gap-2 text-sm mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <XCircle className="w-4 h-4" /> Erreur, réessayez.
                </motion.p>
              )}
              {status === "invalid" && (
                <p className="text-orange-400 text-sm">Email invalide.</p>
              )}
              {status === "missing" && (
                <p className="text-orange-400 text-sm">Tous les champs sont requis.</p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

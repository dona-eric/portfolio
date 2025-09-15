import React, { useState } from "react";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Mail,
  User,
  MessageSquare,
  Phone,
  MapPin,
} from "lucide-react";
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
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Formulaire */}
        <motion.div
          className="bg-slate-900/80 backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl p-10 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Nom
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Message
              </label>
              <div className="relative mt-1">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
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
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105"
              }`}
            >
              {status === "sending" && (
                <Loader2 className="animate-spin w-5 h-5" />
              )}
              {status === "sending" ? "Envoi..." : "Envoyer"}
            </button>

            {/* Statuts */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.p
                  className="text-green-500 flex items-center gap-2 text-sm mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle className="w-4 h-4" /> Message envoyé — merci !
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  className="text-red-500 flex items-center gap-2 text-sm mt-2"
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
                <p className="text-orange-400 text-sm">
                  Tous les champs sont requis.
                </p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Coordonnées */}
        <motion.div
          className="space-y-6 text-slate-300"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-white">Mes coordonnées</h3>
          <p className="text-slate-400">
            Vous pouvez m'écrire ou me contacter.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-400" />
              <span>Atlantique, Abomey-Calavi, Bénin</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-indigo-400" />
              <span>+229 01 51 34 42 89 | +229 01 41 73 02 40 </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span>donaerickoulodji@gmail.com</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

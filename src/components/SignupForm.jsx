import React, { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../api/api";


export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", programme: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.postSignup(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", programme: "" });
    } catch (err) {
      setStatus("error");
    }
  };
  const programmes = [
    "Développement Web",
    "Data & IA",
    "Formations & Mentorat",
    "Solutions d'entreprise",
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Nom complet</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Jean Dupont"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemple@email.com"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Téléphone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+229 6X XX XX XX"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Programme</label>
        <select
          name="programme"
          value={form.programme}
          onChange={handleChange}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          required
        >
          <option value="">-- Sélectionnez un programme --</option>
          {programmes.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <button className="w-full md:w-auto px-6 py-2 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition">
          S'inscrire
        </button>
        {status && (
          <motion.div
            className={`text-sm text-center text-slate-600`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {status}
          </motion.div>
        )}
      </div>
    </motion.form>
  );
}

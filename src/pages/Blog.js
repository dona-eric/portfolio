import React, { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";

const articles = [
  { 
    title: "Introduction au Machine Learning", 
    date: "2025-01-15", 
    category: "IA/ML",
    status: "Publié",
    link: "#" 
  },
  { 
    title: "Applications IA dans l'industrie spatiale", 
    date: "2025-03-10", 
    category: "Spatial",
    status: "Publié",
    link: "#" 
  },
  { 
    title: "Détection de Fake News avec BERT", 
    date: "2025-06-05", 
    category: "NLP",
    status: "Brouillon",
    link: "#" 
  }
];

const categories = ["Tous", "IA/ML", "Spatial", "NLP"];
const statusOptions = ["Tous", "Publié", "Brouillon"];

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  // Filtrage des articles
  const filteredArticles = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || art.category === selectedCategory;
    const matchesStatus = selectedStatus === "Tous" || art.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Articles & Recherches
        </h2>

        {/* Barre de recherche et filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Catégorie */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Statut */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
            >
              {statusOptions.map((st) => (
                <option key={st} value={st} className="bg-slate-800">
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Liste des articles */}
        <ul className="space-y-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art, idx) => (
              <li
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
              >
                <a
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold text-purple-300 hover:text-pink-300 transition"
                >
                  {art.title}
                </a>
                <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-2">
                  <span>📅 {art.date}</span>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs">
                    {art.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      art.status === "Publié"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {art.status}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-400 py-20">Aucun article trouvé 🔍</p>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Blog;

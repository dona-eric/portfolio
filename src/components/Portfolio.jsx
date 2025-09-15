import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

const categories = ['Tous', 'Web', 'Data & IA', 'Mobile']

const allProjects = [
  { img: '/portfolio-ecommerce.jpg', title: 'E-commerce pour PME', desc: 'Site e-commerce et intégration paiement.', category: 'Web' },
  { img: '/portfolio-dashboard.jpg', title: 'Dashboard data', desc: 'Tableau de bord interactif pour prise de décision.', category: 'Data & IA' },
  { img: '/portfolio-chatbot.jpg', title: 'Chatbot éducatif', desc: 'Assistant IA pour supports pédagogiques.', category: 'Data & IA' },
  { img: '/portfolio-ml.jpg', title: 'Projet Machine Learning', desc: 'Prédictions et analyses avancées.', category: 'Data & IA' },
  { img: '/portfolio-webapp.jpg', title: 'Application Web sur-mesure', desc: 'Solution complète pour startup.', category: 'Web' },
  { img: '/portfolio-mobileapp.jpg', title: 'Application Mobile', desc: 'App Android & iOS pour gestion clients.', category: 'Mobile' },
]

export default function Portfolio() {
  const [filter, setFilter] = useState('Tous')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const filteredProjects = filter === 'Tous' ? allProjects : allProjects.filter(p => p.category === filter)

  const openLightbox = index => {
    setCurrentImage(index)
    setLightboxOpen(true)
  }

  return (
    <section id="portfolio" className="relative px-6 py-20 bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Mes réalisations</h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
            Découvrez mes projets et mon savoir-faire par catégorie.
          </p>

          {/* Filtres */}
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full font-medium shadow-sm transition ${
                  filter === c
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white/70 backdrop-blur-lg border border-white/30 hover:shadow-2xl transition-transform transform hover:scale-105">
                <img src={p.img} alt={p.title} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <h4 className="font-semibold text-lg text-slate-800">{p.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition bg-black/40">
                  <span className="text-white font-semibold px-4 py-2 bg-sky-600 rounded-lg shadow">
                    Voir projet
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            mainSrc={filteredProjects[currentImage].img}
            onCloseRequest={() => setLightboxOpen(false)}
            imageTitle={filteredProjects[currentImage].title}
            imageCaption={filteredProjects[currentImage].desc}
            nextSrc={filteredProjects[(currentImage + 1) % filteredProjects.length].img}
            prevSrc={filteredProjects[(currentImage + filteredProjects.length - 1) % filteredProjects.length].img}
            onMovePrevRequest={() =>
              setCurrentImage((currentImage + filteredProjects.length - 1) % filteredProjects.length)
            }
            onMoveNextRequest={() =>
              setCurrentImage((currentImage + 1) % filteredProjects.length)
            }
          />
        )}
      </div>
    </section>
  )
}

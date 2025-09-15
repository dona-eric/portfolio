import { BookOpenText, Handshake, Lightbulb, SquareKanban } from "lucide-react"
import { motion } from "framer-motion"
import React from "react"

const About = () => {
  const items = [
    {
      icon: <Lightbulb className="w-10 h-10 text-yellow-400" />,
      title: "Innovation Digitale",
      desc: "Solutions modernes pour transformer les activités.",
    },
    {
      icon: <BookOpenText className="w-10 h-10 text-indigo-400" />,
      title: "Formation & Mentorat",
      desc: "Bootcamps, Ateliers et Accompagnement personnalisé.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-green-400" />,
      title: "Partenariats",
      desc: "Collaborations avec entreprises et institutions locales.",
    },
    {
      icon: <SquareKanban className="w-10 h-10 text-pink-400" />,
      title: "Impact",
      desc: "Projets orientés vers l'impact social en Afrique.",
    },
  ]

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="container mx-auto px-6">
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
          <p className="mt-6 text-slate-300 leading-relaxed">
            Je suis <span className="font-semibold text-indigo-400">Dona Eric KOULODJI</span>,
            Data Scientist & Machine Learning Engineer.
            Je crée des solutions digitales innovantes pour accompagner les entreprises, 
            étudiants et institutions. Mes expertises couvrent le développement web, 
            la data science et l’intelligence artificielle. J'oeuvre pour
            la prochaine génération de talents africains du numérique.
          </p>
        </div>

        {/* Cartes */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-900/80 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-6 text-center cursor-pointer hover:shadow-2xl transition transform hover:-translate-y-2"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-slate-300 mt-2 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

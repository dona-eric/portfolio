import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GraduationCap, Briefcase, Code, Brain, Rocket, Award, Target, 
  Heart, Star, CheckCircle, Calendar, MapPin, Users, Code2, BookOpen, GanttChartIcon
} from 'lucide-react';
import { color } from 'framer-motion';
import llm_rag from "../certifs/certificat_llm.png";
import ibm_data from "../certifs/ibm_digital.png";
import python from "../certifs/intermediate.png";

// Constantes pour éviter les re-créations
const SECTIONS = [
  { id: 'parcours', label: 'Graduation', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'competences', label: 'Skills', icon: Code },
  {id: "certificats", label: 'Certificates', icon: Code2},
  { id: 'valeurs', label: 'Values & Committment', icon: Heart }
];

const PARCOURS_DATA = [
  {
    id: 1,
    diplome: "Licence en Physique Fondamentale",
    institution: "Université d'Abomey-Calavi",
    year: "2020-2024",
    icon: GraduationCap,
    color: "text-blue-400",
    bgColor: "from-blue-500/10 to-cyan-500/10",
    description: "Fondements théoriques en physique moderne, mathématiques appliquées et méthodes numériques."
  },
  {
    id: 2,
    diplome: "Certification Data Scientist",
    institution: "AfricaTechUp-Tour & Isheero",
    year: "Avril ~ Septembre 2024",
    icon: Award,
    color: "text-green-400",
    bgColor: "from-green-500/10 to-emerald-500/10",
    description: "Formation intensive en analyse de données, visualisation et premiers modèles ML."
  },
  {
    id: 3,
    diplome: "Certification Data Scientist et Machine Learning",
    institution: "IBM & Coursera",
    year: "2025",
    icon: Brain,
    color: "text-purple-400",
    bgColor: "from-purple-500/10 to-pink-500/10",
    description: "Spécialisation avancée en ML, deep learning et déploiement de modèles en production."
  }
];

const EXPERIENCES_DATA = [
  {
    id: 1,
    title: "Data Engineer",
    company: "Datum Africa",
    period: "Sept 2025 ~ Maintenant",
    location: "Remote - Nigeria",
    description:"Contribute their skills and time in good faith, Maintain confidentiality of data, research, and partner information,Communicate availability and challenges promptly and Respect community guidelines and code of conduct.",
    skills: ["Pipeline data", "Data Collect", "Python", "Apache Airflow", "GCP"],
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
    achievement:[]
  },
  
  
  {
    id: 2,
    title: "Volunteering Data Developer",
    company: "Agence Spatiale Française",
    period: "Juillet 2025 ~ Maintenant",
    location: "Remote",
    description: "Conception et mise en place de pipelines de collecte, ingestion et traitement de données spatiales. Développement de modèles prédictifs pour l'analyse d'images satellitaires et optimisation des trajectoires.",
    skills: ["Pipeline de données", "Traitement d'images", "Modélisation spatiale", "Python", "Apache Airflow"],
    icon: Rocket,
    color: "from-blue-500 to-cyan-500",
    achievements: ["Réduction de 40% du temps de traitement", "3 modèles déployés en production"]
  },
  {
    id: 3,
    title: "Stagiaire Data Analyst / Machine Learning",
    company: "British Airways",
    period: "2023-2024",
    location: "Remote",
    description: "Analyse approfondie des données opérationnelles et création de modèles prédictifs pour optimiser la logistique, prédire les retards et améliorer la satisfaction client.",
    skills: ["Analyse prédictive", "Optimisation", "Logistique aéronautique", "SQL", "Tableau"],
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    achievements: ["Amélioration de 25% de la prédiction des retards", "Dashboard utilisé par 50+ employés"]
  }
];

const COMPETENCES_DATA = [
  {
    category: "Data Science & ML",
    skills: [
      "Machine Learning avancé", 
      "Deep Learning (CNN, RNN, Transformers)", 
      "NLP (BERT, GPT, RAG)", 
      "Computer Vision",
      "Time Series Analysis",
      "Reinforcement Learning"
    ],
    icon: Brain,
    color: "text-purple-400",
    bgColor: "hover:bg-purple-500/10"
  },
  {
    category: "Langages & Frameworks",
    skills: [
      "Python (Expert)", 
      "SQL (Avancé)", 
      "R (Intermédiaire)",
      "Pandas, NumPy, Matplotlib", 
      "Scikit-Learn, TensorFlow, PyTorch",
      "Hugging Face, LangChain"
    ],
    icon: Code,
    color: "text-green-400",
    bgColor: "hover:bg-green-500/10"
  },
  {
    category: "Data Engineering & MLOps",
    skills: [
      "Pipelines de données (Apache Airflow)", 
      "MLOps (MLflow, DVC)", 
      "Déploiement de modèles (Docker, FastAPI)", 
      "Cloud Computing (AWS, GCP)",
      "CI/CD pour ML",
      "Monitoring de modèles"
    ],
    icon: Target,
    color: "text-blue-400",
    bgColor: "hover:bg-blue-500/10"
  },
  {
    category: "Visualisation & Communication",
    skills: [
      "Dashboards interactifs (Streamlit, Dash)", 
      "Matplotlib, Seaborn, Plotly", 
      "Tableau, Power BI", 
      "Storytelling data",
      "Présentation technique",
      "Documentation technique"
    ],
    icon: Star,
    color: "text-yellow-400",
    bgColor: "hover:bg-yellow-500/10"
  }
];

const VALUES_DATA = [
  {
    id: 1,
    title: "Innovation",
    description: "Créer des solutions qui transforment vraiment les données en valeur business mesurable",
    icon: Rocket,
    color: "text-blue-400",
    bgGradient: "from-blue-600/20 to-cyan-600/20"
  },
  {
    id: 2,
    title: "Partage",
    description: "Démocratiser l'IA par l'enseignement, le mentorat et la contribution open-source",
    icon: Users,
    color: "text-green-400",
    bgGradient: "from-green-600/20 to-emerald-600/20"
  },
  {
    id: 3,
    title: "Excellence",
    description: "Livrer des modèles robustes, explicables et éthiques en production",
    icon: Star,
    color: "text-purple-400",
    bgGradient: "from-purple-600/20 to-pink-600/20"
  }
];

const CERTIFICATS_DATA = [
  {
    id: 1,
    title: "IBM Data Science Professional Certificate",
    image: ibm_data,
    platform: "Coursera",
    link: "https://coursera.org"
  },
  {
    id: 2,
    title: "Building LLM Applications with Prompt Engineering",
    image: llm_rag,
    platform: "NVIDIA-DLI",
    link: "https://learn.nvidia.com/certificates?id=obSjywnjSLG_iDn5ddpLag"
  },
  {
    id: 3,
    title: "Intermediate Python Developper",
    image: python,
    platform: "DataCamp",
    link: "https://app.datacamp.com"
  }
];


// Composants optimisés
const NavigationTab = ({ section, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-6 py-3 rounded-xl font-medium 
      transition-all duration-300 transform hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-purple-400/50
      ${isActive
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
      }
    `}
    aria-pressed={isActive}
  >
    <section.icon className="w-5 h-5" />
    {section.label}
  </button>
);

const ParcoursCard = ({ item, index }) => (
  <div 
    className={`
      bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
      transition-all duration-300 hover:bg-white/10 hover:scale-105 
      hover:border-white/20 group
    `}
    style={{ animationDelay: `${index * 3.15}s` }}
  >
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.bgColor} group-hover:scale-110 transition-transform duration-300`}>
        <item.icon className={`w-6 h-6 ${item.color}`} />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {item.diplome}
        </h3>
        <p className="text-purple-300 font-medium mb-2">{item.institution}</p>
        {item.description && (
          <p className="text-gray-400 text-sm mb-3 leading-relaxed">{item.description}</p>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          {item.year}
        </div>
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ exp, index }) => (
  <div 
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:border-white/20 group"
    style={{ animationDelay: `${index * 3.15}s` }}
  >
    <div className="flex items-start gap-6">
      <div className={`p-4 rounded-2xl bg-gradient-to-br ${exp.color} group-hover:scale-110 transition-transform duration-300`}>
        <exp.icon className="w-8 h-8 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {exp.title}
            </h3>
            <p className="text-lg text-purple-300 font-medium">{exp.company}</p>
          </div>
          <div className="text-sm text-gray-400 space-y-1 lg:text-right">
            <div className="flex items-center gap-1 lg:justify-end">
              <Calendar className="w-4 h-4" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-1 lg:justify-end">
              <MapPin className="w-4 h-4" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>
        
        {exp.achievements && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-purple-300 mb-2">🎯 Réalisations clés</h4>
            <ul className="space-y-1">
              {exp.achievements.map((achievement, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((skill, skillIndex) => (
            <span 
              key={skillIndex}
              className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-sm text-purple-300 hover:bg-purple-600/30 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CompetenceCard = ({ comp, index }) => (
  <div 
    className={`
      bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
      transition-all duration-300 hover:scale-105 group
      ${comp.bgColor} hover:border-white/20
    `}
    style={{ animationDelay: `${index * 3.15}s` }}
  >
    <div className="flex items-center gap-4 mb-6">
      <comp.icon className={`w-8 h-8 ${comp.color} group-hover:scale-110 transition-transform duration-300`} />
      <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
        {comp.category}
      </h3>
    </div>
    <div className="space-y-3">
      {comp.skills.map((skill, skillIndex) => (
        <div key={skillIndex} className="flex items-center gap-3 hover:translate-x-1 transition-transform duration-200">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-gray-300 group-hover:text-white transition-colors">{skill}</span>
        </div>
      ))}
    </div>
  </div>
);

const CertificationCard = ({ cert, index }) => (
  <div
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
               transition-all duration-300 hover:scale-105 hover:border-white/20 group"
    style={{ animationDelay: `${index * 3.15}s` }}
  >
    <img
      src={cert.image}
      alt={cert.title}
      className="w-100 h-100 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
    />
    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
      {cert.title}
    </h3>
    <p className="text-sm text-gray-400 mb-4">Plateforme : {cert.platform}</p>
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r 
                 from-purple-600 to-pink-600 rounded-lg shadow hover:from-purple-700 
                 hover:to-pink-700 transition-colors"
    >
      View
    </a>
  </div>
);


const ValueCard = ({ value, index }) => (
  <div 
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center group hover:border-white/20"
    style={{ animationDelay: `${index * 3.15}s` }}
  >
    <div className={`w-16 h-16 bg-gradient-to-br ${value.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <value.icon className={`w-8 h-8 ${value.color}`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
      {value.title}
    </h3>
    <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
      {value.description}
    </p>
  </div>
);

const SectionContent = ({ activeSection }) => {
  const content = useMemo(() => {
    switch (activeSection) {
      case 'parcours':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
              🎓 Graduation Academic & Professional
            </h2>
            <div className="grid gap-6 max-w-4xl mx-auto">
              {PARCOURS_DATA.map((item, index) => (
                <ParcoursCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
              💼 Professional Experience
            </h2>
            <div className="grid gap-8 max-w-5xl mx-auto">
              {EXPERIENCES_DATA.map((exp, index) => (
                <ExperienceCard key={exp.id} exp={exp} index={index} />
              ))}
            </div>
          </div>
        );

      case 'competences':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
              🚀 Technicals Skills
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {COMPETENCES_DATA.map((comp, index) => (
                <CompetenceCard key={comp.category} comp={comp} index={index} />
              ))}
            </div>
          </div>
        );
      
      case 'certificats':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
              📜 Certifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {CERTIFICATS_DATA.map((cert, index) => (
                <CertificationCard key={cert.id} cert={cert} index={index} />
              ))}
            </div>
          </div>
       );
      case 'valeurs':
        return (
          <div className="space-y-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
              💝 Values & Commitment
            </h2>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
              {VALUES_DATA.map((value, index) => (
                <ValueCard key={value.id} value={value} index={index} />
              ))}
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto hover:bg-white/10 transition-all duration-300 hover:border-white/20">
              <h3 className="text-2xl font-bold text-center text-purple-300 mb-6 flex items-center justify-center gap-2">
                <BookOpen className="w-6 h-6" />
                Mon Engagement
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                Je m'engage à <span className="text-purple-400 font-semibold">partager mes connaissances</span> via des articles techniques, 
                des projets open-source, du bénévolats et du mentorat. Mon objectif est de 
                <span className="text-pink-400 font-semibold"> démocratiser l'accès à l'IA</span> et de contribuer activement 
                à une communauté tech inclusive et bienveillante.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [activeSection]);

  return content;
};

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('parcours');

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = useCallback((sectionId) => {
    setActiveSection(sectionId);
  }, []);

  const memoizedTabs = useMemo(() => 
    SECTIONS.map((section) => (
      <NavigationTab
        key={section.id}
        section={section}
        isActive={activeSection === section.id}
        onClick={() => handleSectionChange(section.id)}
      />
    )), [activeSection, handleSectionChange]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background effects optimisés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }} 
        />
      </div>

      <div className={`
        relative z-10 transition-all duration-1000 ease-out
        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        
        {/* Header optimisé */}
        <header className="container mx-auto px-6 lg:px-12 pt-20 pb-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 leading-tight">
              About me
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Je suis <span className="text-purple-400 font-semibold">Éric KOULODJI</span>, Data Scientist et Machine Learning Engineer.
              Passionné de la data et l'IA, je crée des solutions innovantes qui transforment les données en décisions concrètes avec impact réel.
              J’accompagne entreprises et projets à tirer parti de l’intelligence artificielle pour innover et créer de la valeur.
            </p>
          </div>

          {/* Navigation tabs optimisée */}
          <nav className="flex flex-wrap justify-center gap-4 mb-12" role="tablist">
            {memoizedTabs}
          </nav>
        </header>

        {/* Content sections */}
        <main className="container mx-auto px-6 lg:px-12 pb-20">
          <SectionContent activeSection={activeSection} />
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(10px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 2.5s ease-out forwards;
          will-change: transform, opacity;
        }
        
        /* Optimisation des performances d'animation */
        .animate-pulse {
          will-change: opacity;
        }
        
        /* Amélioration de l'accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-fade-in-up,
          .transition-all,
          .transition-transform,
          .transition-colors {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
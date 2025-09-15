import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Github, 
  Shield, 
  Car, 
  Zap, 
  Search, 
  Star, 
  Filter,
  Calendar,
  Code,
  Eye,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// Constantes pour éviter les re-créations
const PROJECTS_DATA = [
  {
    id: 1,
    title: "VeritaAI",
    description: "Système intelligent de détection de fake news utilisant des modèles de NLP avancés pour analyser et vérifier l'authenticité des informations en temps réel.",
    longDescription: "VeritaAI combine BERT, analyse de sentiment et fact-checking automatisé pour une détection précise des fausses informations. Le système utilise des techniques d'apprentissage profond pour analyser le contenu textuel et fournir un score de fiabilité.",
    technologies: ["Python", "BERT", "Transformers", "FastAPI", "Streamlit", "Supabase/PostgreSQL"],
    category: "AI/ML",
    status: "Terminé",
    icon: Shield,
    color: "from-green-500 to-emerald-600",
    features: ["NLP avancé", "Analyse temps réel", "API REST", "Interface Streamlit", "Scoring fiabilité", "Export rapports"],
    github: "https://github.com/dona-eric/veritaai",
    demo: "https://verita-ai.streamlit.app",
    image: "🛡️",
    difficulty: "Intermédiaire",
    impact: "90% précision détection"
  },
  {
    id: 2,
    title: "SafeRoute Bénin",
    description: "Application mobile de sensibilisation à la sécurité routière avec géolocalisation, alertes communautaires et analyse des données d'accidents.",
    longDescription: "Solution complète combinant données officielles, crowdsourcing et ML pour améliorer la sécurité routière. L'app utilise la géolocalisation pour alerter les conducteurs des zones dangereuses et collecte des données pour améliorer la sécurité.",
    technologies: ["React Native", "Node.js", "MongoDB", "Maps API", "Python", "ML Models", "Firebase"],
    category: "Mobile",
    status: "En cours",
    icon: Car,
    color: "from-blue-500 to-cyan-600",
    features: ["Géolocalisation", "Alertes temps réel", "Communauté", "Analytics", "Notifications push", "Mode offline"],
    github: "https://github.com/dona-eric/saferoute-benin",
    demo: "Non disponible",
    image: "🚗",
    difficulty: "Avancé",
    duration: "en estimation",
  },
  {
    id: 3,
    title: "Dashboard VE",
    description: "Tableau de bord interactif pour l'analyse avancée des données de recharge de véhicules électriques avec prédictions de consommation.",
    longDescription: "Dashboard interactif pour analyser les patterns de recharge et optimiser les coûts énergétiques.",
    technologies: ["Python", "Streamlit", "Plotly", "Pandas", "", "TimeSeries"],
    category: "Data Viz",
    status: "Terminé",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    features: ["Viz interactives", "Prédictions ML", "Optimisation coûts", "Rapports auto", "Alertes seuils", "API intégration"],
    github: "https://github.com/dona-eric/dashboard-ve",
    demo: "non deployé",
    image: "⚡",
    difficulty: "Apprentissage",
    duration: "4 mois",
    impact: "30% réduction coûts"
  },
  {
    id: 4,
    title: "CoachAI",
    description: "CoachAI est une application qui permet aux professionnels sportifs, professeur ou enseignant, aux usagers et au coach de planifier des entrainements, proposer des series d'exercices sur mesures..",
    longDescription: "Une application complète de génération des plans d'entrainement, proposer des series d'exercices sur mesure et meme des plans de récupération et de bien etre santé. Elle utilise l'IA pour créer automatiquement des contenus sportifs optimisés pour les professionnels sportifs",
    technologies: ["Python", "OpenAI API", "Streamlit", "GroqCloud","LLMs"],
    category: "AI/ML",
    status: "Terminé",
    icon: Code,
    color: "from-purple-500 to-pink-600",
    features: ["Prompt Engineering", "Optimisation", "RAG", "Personnalisation", "Planning contenu", "Analytics"],
    github: "https://github.com/dona-eric/CoachAI",
    demo: "https://coach-ai.streamlit.app",
    image: "🤖",
    difficulty: "Expert",
    duration: "01 Semaine",
    impact: "20% temps économisé"
  },

  {
    id: 5,
    title: "Scoring Risk",
    description: "Scoring Risk est un système qui permet de determiner la probabilité ou le risque de payer vos crédits à la banque ou non..",
    longDescription: " C'est juste un système qui se base sur les données bancaires d'une personne pour prédire le risque de score que cette personne paie ses crédits bancaires ou non en utilisant le modèle de régression logistique",
    technologies: ["Python", "FastAPi", "StreamlitCloud", "Pandas","Seaborn"],
    category: "AI/ML",
    status: "Terminé",
    icon: Code,
    color: "from-blue-500 to-pink-600",
    features: ["Personnalisation","Analytics"],
    github: "https://github.com/dona-eric/Hack2Hire",
    demo: "https://risk-score.streamlit.app",
    image: "🤖",
    difficulty: "Tous",
    duration: "Hackaton(01 Semaine)",
  },
];

const CATEGORIES = ["Tous", "AI/ML", "Web/Mobile", "Data Viz"];
const STATUS_OPTIONS = ["Tous", "Terminé", "En cours"];
const DIFFICULTY_LEVELS = ["Tous", "Intermédiaire", "Avancé", "Expert"];

// Composants optimisés
const FilterButton = ({ isActive, onClick, children, variant = 'default' }) => {
  const variants = {
    default: isActive 
      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
      : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white",
    status: isActive
      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
      : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white",
    difficulty: isActive
      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105"
      : "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-purple-400/50
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
};

const SearchBar = ({ value, onChange, placeholder = "Rechercher un projet..." }) => (
  <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 w-full lg:w-1/3 hover:bg-white/15 transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-400/50">
    <Search className="w-5 h-5 text-gray-400" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="bg-transparent outline-none text-sm text-white w-full ml-3 placeholder-gray-400"
    />
  </div>
);

const TechBadge = ({ tech }) => (
  <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full text-xs text-purple-300 hover:bg-purple-600/30 transition-all duration-200 cursor-default">
    {tech}
  </span>
);

const FeatureItem = ({ feature }) => (
  <div className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
    <Star className="w-3 h-3 text-yellow-400 flex-shrink-0" />
    <span className="text-xs text-gray-300">{feature}</span>
  </div>
);

const ActionButton = ({ href, icon: Icon, children, variant = 'secondary' }) => {
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white",
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        flex-1 text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 
        flex items-center justify-center gap-2 hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-purple-400/50
        ${variants[variant]}
      `}
    >
      <Icon className="w-4 h-4" />
      {children}
    </a>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    'Terminé': {
      icon: CheckCircle2,
      className: "bg-green-500/20 text-green-300 border border-green-500/30"
    },
    'En cours': {
      icon: AlertCircle,
      className: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
    }
  };

  const StatusIcon = statusConfig[project.status]?.icon || CheckCircle2;

  return (
    <div
      className={`
        group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden 
        transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl 
        hover:shadow-purple-500/20 hover:border-white/20 cursor-pointer
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec gradient et info */}
      <div className={`h-36 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Icône et emoji */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className={`p-2 bg-white/20 rounded-lg backdrop-blur-sm transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <project.icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl">{project.image}</div>
        </div>

        {/* Status et difficulté */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 backdrop-blur-sm ${statusConfig[project.status]?.className}`}>
            <StatusIcon className="w-3 h-3" />
            {project.status}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
            {project.difficulty}
          </div>
        </div>

        {/* Métriques en bas */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between text-xs text-white/80">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.duration}
          </div>
          <div className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
            {project.impact}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="p-6">
        {/* Titre et catégorie */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs text-gray-400 bg-white/10 px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {isHovered ? project.longDescription : project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 mb-2 font-medium">Technologies :</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, isHovered ? project.technologies.length : 4).map((tech, i) => (
              <TechBadge key={i} tech={tech} />
            ))}
            {!isHovered && project.technologies.length > 4 && (
              <span className="text-xs text-gray-400">+{project.technologies.length - 4}</span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-2 font-medium">Fonctionnalités clés :</p>
          <div className="grid grid-cols-2 gap-2">
            {project.features.slice(0, 4).map((feature, i) => (
              <FeatureItem key={i} feature={feature} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <ActionButton href={project.github} icon={Github} variant="secondary">
            Code
          </ActionButton>
          <ActionButton href={project.demo} icon={Eye} variant="primary">
            Demo
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

const ProjectStats = ({ projects, filteredProjects }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    {[
      { label: "Total Projets", value: projects.length, icon: Code },
      { label: "Projets Affichés", value: filteredProjects.length, icon: Filter },
      { label: "Terminés", value: projects.filter(p => p.status === 'Terminé').length, icon: CheckCircle2 },
      { label: "En Cours", value: projects.filter(p => p.status === 'En cours').length, icon: AlertCircle }
    ].map((stat, index) => (
      <div key={stat.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300">
        <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
        <div className="text-sm text-gray-400">{stat.label}</div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-20">
    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
      <Search className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
    <p className="text-gray-400 text-center">Essayez de modifier vos critères de recherche ou filtres</p>
  </div>
);

const Projects = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedStatus, setSelectedStatus] = useState("Tous");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      const matchesCategory = selectedCategory === "Tous" || project.category === selectedCategory;
      const matchesStatus = selectedStatus === "Tous" || project.status === selectedStatus;
      const matchesDifficulty = selectedDifficulty === "Tous" || project.difficulty === selectedDifficulty;
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesStatus && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedStatus, selectedDifficulty, searchTerm]);

  const memoizedProjectCards = useMemo(() =>
    filteredProjects.map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    )), [filteredProjects]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
      {/* Background effects optimisés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div 
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '2s' }} 
        />
        <div 
          className="absolute top-1/2 left-3/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" 
          style={{ animationDelay: '4s' }} 
        />
      </div>

      <div className={`
        relative z-10 container mx-auto px-6 lg:px-12 pt-20 pb-20 
        transition-all duration-1000 ease-out
        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 leading-tight">
            Mes Projets
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez mes réalisations en Data Science, IA et développement d'applications
          </p>
        </header>

        {/* Statistiques */}
        <ProjectStats projects={PROJECTS_DATA} filteredProjects={filteredProjects} />

        {/* Panneau de filtres optimisé */}
        <div className="space-y-6 mb-10">
          {/* Barre de recherche */}
          <div className="flex justify-center">
            <SearchBar 
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Rechercher par nom, description ou technologie..."
            />
          </div>

          {/* Filtres */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
            {/* Catégories */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-400 mr-2 self-center">Catégorie :</span>
              {CATEGORIES.map((cat) => (
                <FilterButton
                  key={cat}
                  isActive={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </FilterButton>
              ))}
            </div>

            {/* Statuts */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-400 mr-2 self-center">Statut :</span>
              {STATUS_OPTIONS.map((status) => (
                <FilterButton
                  key={status}
                  isActive={selectedStatus === status}
                  onClick={() => setSelectedStatus(status)}
                  variant="status"
                >
                  {status}
                </FilterButton>
              ))}
            </div>

            {/* Difficulté */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-400 mr-2 self-center">Niveau :</span>
              {DIFFICULTY_LEVELS.map((difficulty) => (
                <FilterButton
                  key={difficulty}
                  isActive={selectedDifficulty === difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  variant="difficulty"
                >
                  {difficulty}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>

        {/* Grille des projets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto animate-fade-in-up">
          {filteredProjects.length > 0 ? memoizedProjectCards : <EmptyState />}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          will-change: transform, opacity;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

export default Projects;
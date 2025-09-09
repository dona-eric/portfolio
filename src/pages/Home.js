import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Sparkles, Brain, BarChart3, Zap } from 'lucide-react';

const TYPEWRITER_TEXTS = [
  "Transformateur de données en décisions concrètes.",
  "Industrialisation de modèles robustes et fiables.",
  "Mentorat et partage des connaissances pour démocratiser l'IA."
];

const SKILLS = [
  { icon: Brain, label: "Machine Learning", color: "text-purple-400", bgColor: "hover:bg-purple-500/10" },
  { icon: BarChart3, label: "Data Science", color: "text-blue-400", bgColor: "hover:bg-blue-500/10" },
  { icon: Zap, label: "Deep Learning", color: "text-yellow-400", bgColor: "hover:bg-yellow-500/10" },
  { icon: Sparkles, label: "IA Générative", color: "text-pink-400", bgColor: "hover:bg-pink-500/10" }
];

const SOCIAL_LINKS = [
  { Icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-gray-300" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
  { Icon: Mail, href: "mailto:contact@example.com", label: "Email", color: "hover:text-green-400" }
];

const FLOATING_ELEMENTS = [
  { emoji: "🤖", delay: 0, position: "top-10 left-10" },
  { emoji: "📊", delay: 1, position: "top-20 right-20" },
  { emoji: "🧠", delay: 2, position: "bottom-32 left-16" },
  { emoji: "⚡", delay: 3, position: "bottom-10 right-10" }
];

// Components optimisés
const TypewriterText = ({ texts, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className="h-16 flex items-center">
      <p className={`text-lg text-gray-400 leading-relaxed transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}>
        {texts[currentIndex]}
      </p>
    </div>
  );
};

const SkillCard = ({ skill, index }) => (
  <div 
    className={`
      bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 
      transition-all duration-300 hover:scale-105 group cursor-pointer
      ${skill.bgColor} hover:border-white/20
    `}
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    <skill.icon className={`
      w-8 h-8 ${skill.color} mb-2 
      transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
    `} />
    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
      {skill.label}
    </p>
  </div>
);

const FloatingIcon = ({ emoji, delay, position }) => (
  <div 
    className={`absolute ${position} text-4xl opacity-20 hover:opacity-60 
    transition-all duration-500 transform hover:scale-125 cursor-pointer
    animate-bounce select-none`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: '3s'
    }}
  >
    {emoji}
  </div>
);

const SocialLink = ({ Icon, href, label, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 
      rounded-full flex items-center justify-center 
      transition-all duration-300 hover:scale-110 hover:bg-white/20 
      group focus:outline-none focus:ring-2 focus:ring-purple-400/50
    `}
    aria-label={label}
  >
    <Icon className={`w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-300 ${color}`} />
  </a>
);

const ActionButton = ({ variant = 'primary', children, onClick, className = '' }) => {
  const baseClasses = `
    group font-medium py-4 px-8 rounded-xl transition-all duration-300 
    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 
    focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variants = {
    primary: `
      bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 
      text-white hover:shadow-xl hover:shadow-purple-500/25 focus:ring-purple-400
    `,
    secondary: `
      bg-white/10 backdrop-blur-sm border border-white/20 text-white 
      hover:bg-white/20 focus:ring-white/50
    `
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectsClick = useCallback(() => {
    // Scroll vers la section projets ou navigation
    console.log('Navigate to projects');
  }, []);

  const handleContactClick = useCallback(() => {
    // Scroll vers la section contact ou modal
    console.log('Open contact');
  }, []);

  const memoizedSkills = useMemo(() => 
    SKILLS.map((skill, index) => (
      <SkillCard key={skill.label} skill={skill} index={index} />
    )), []
  );

  const memoizedSocialLinks = useMemo(() => 
    SOCIAL_LINKS.map((link) => (
      <SocialLink key={link.label} {...link} />
    )), []
  );

  const memoizedFloatingElements = useMemo(() =>
    FLOATING_ELEMENTS.map((element, index) => (
      <FloatingIcon key={index} {...element} />
    )), []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Background optimisé avec CSS pures */}
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

      {/* Contenu principal */}
      <main className={`
        relative z-10 min-h-screen flex items-center 
        transition-all duration-1000 ease-out
        ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Contenu principal */}
            <div className="space-y-8">
              
              {/* Photo de profil améliorée */}
              <div className="relative group">
                <div className="w-32 h-32 mx-auto lg:mx-0 relative">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-1 animate-spin-slow">
                    <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center relative overflow-hidden">
                      <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                        👨‍💻
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Introduction */}
              <header className="text-center lg:text-left space-y-6">
                <div className="space-y-2">
                  <p className="text-purple-300 font-medium tracking-wide text-sm uppercase">
                    Bonjour, je suis
                  </p>
                  <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight">
                    Éric KOULODJI
                  </h1>
                  <h2 className="text-xl lg:text-2xl text-gray-300 font-light">
                    Data Scientist & Machine Learning Engineer
                  </h2>
                </div>

                <TypewriterText texts={TYPEWRITER_TEXTS} />
              </header>

              {/* Compétences */}
              <section className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Compétences">
                {memoizedSkills}
              </section>

              {/* Mission - Version condensée */}
              <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  🎯 Ma Mission
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                  <div>
                    <span className="text-purple-400 font-medium">Vision :</span> 
                    <p className="mt-1">Démocratiser l'IA responsable</p>
                  </div>
                  <div>
                    <span className="text-blue-400 font-medium">Objectif :</span> 
                    <p className="mt-1">Solutions innovantes concrètes</p>
                  </div>
                  <div>
                    <span className="text-pink-400 font-medium">Engagement :</span> 
                    <p className="mt-1">Partage et contribution</p>
                  </div>
                </div>
              </section>

              {/* Boutons d'action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ActionButton variant="primary" onClick={handleProjectsClick}>
                  <span className="flex items-center justify-center gap-2">
                    Voir mes projets
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </ActionButton>
                <ActionButton variant="secondary" onClick={handleContactClick}>
                  <span className="flex items-center justify-center gap-2">
                    Me contacter
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </ActionButton>
              </div>

              {/* Liens sociaux */}
              <div className="flex justify-center lg:justify-start gap-4">
                {memoizedSocialLinks}
              </div>
            </div>

            {/* Éléments visuels optimisés */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96">
                {memoizedFloatingElements}
                
                {/* Glow central optimisé */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse" />
                
                {/* Orbites */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-48 h-48 border border-purple-500/30 rounded-full animate-spin-slow">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-pink-500/30 rounded-full animate-reverse-spin">
                    <div 
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-500 rounded-full animate-pulse" 
                      style={{ animationDelay: '0.5s' }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Indicateur de scroll amélioré */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
        <p className="text-sm text-gray-400 mb-2">Découvrir la suite</p>
        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce mx-auto hover:text-white transition-colors" />
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
        
        /* Optimisation des performances d'animation */
        .animate-pulse,
        .animate-bounce,
        .animate-spin-slow,
        .animate-reverse-spin {
          will-change: transform;
        }
        
        /* Amélioration de l'accessibilité */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce,
          .animate-spin-slow,
          .animate-reverse-spin {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
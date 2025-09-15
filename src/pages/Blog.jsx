import React, { useEffect, useState } from "react"
// import { api } from "../api/api"; // Désactivé tant que l'API n'est pas prête
import book from "../assets/1.png";
import data from "../assets/data.jpg";
import portf from "../assets/portf.webp";
import machine from "../assets/machine.png";


export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données fictives (mock)
  const mockPosts = [
    {
      id: 1,
      title: "Introduction à l’IA et Machine Learning",
      excerpt: "Découvrez les bases de l’intelligence artificielle et ses applications dans le monde moderne.",
      image: machine,
      created_at: "2025-09-01",
    },
    {
      id: 2,
      title: "Data Science pour débutants",
      excerpt: "Un guide pratique pour comprendre la data science et comment commencer un projet étape par étape.",
      image: data,
      link: "https://medium.com/koulodjiric",
      created_at: "2025-08-20",
    },
    {
      id: 3,
      title: "Comment construire un Portfolio en tant que Data Scientist avec Quarto",
      excerpt: "Apprenez à créer un portfolio professionnel qui met en valeur vos projets et vos compétences avec quarto",
      image: portf,
      created_at: "2025-08-10",
    },
    {
      id: 4,
      title: "Les Cinq (05) meilleures techniques du Prompt Engineering",
      excerpt: "Arretez de deviner ce que l'ia attend de vous ! Vous voulez gagner du temps et de l'argent avec l'ia à l'ère du 21è siècle, apprenez à communiquer efficacement avec l'IA en appliquant les cinq meilleurs techniques infaillibles. Le livre se trouve ici 👇🏻",
      image: book,
      link: "https://cykrhzat.mychariow.com/prompt",
      created_at: "2025-09-13"
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="text-center py-10">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 animate-gradient-x">
          Blog & Actualités
        </h2>
        <p className="text-slate-600 mt-2 text-lg">
          Articles, annonces de cohortes et tutoriels.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-5 flex flex-col"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="rounded-xl mb-4 w-full h-48 object-cover"
              />
            )}
            <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-pink-500">
              {post.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 flex-1">
              {post.excerpt}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <a
                href={post.link ? post.link : `/blog/${post.id}`}
                target={post.link ? "_blank" : "_self"}
                rel={post.link ? "noopener noreferrer" : ""}
                className="px-3 py-1 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 text-white text-xs rounded hover:opacity-90 transition"
              >
                {post.link ? "Voir le contenu" : "Lire la suite"}
              </a>
            </div>
          </article>
        ))}
      </div>

      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease infinite;
          }
        `}
      </style>
    </div>
  );
}

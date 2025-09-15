# 🚀 DTech-Africa Frontend

Ce projet représente le **frontend** de la plateforme **DTech-Africa**, une startup digitale dédiée à la formation, l’accompagnement et la création de solutions numériques innovantes.  
Le site est construit avec **React.js**, stylisé avec **Tailwind CSS**, et enrichi par des composants animés et dynamiques pour offrir une expérience utilisateur moderne.

---

## 📌 Fonctionnalités principales

- 🌐 **Landing Page Moderne** : design responsive et interactif  
- 🎨 **UI/UX avec Tailwind CSS** : dégradés, couleurs et animations fluides  
- 🔄 **Animations dynamiques** : utilisation de librairies comme `framer-motion` et `react-type-animation`  
- 👥 **Section Équipe** : présentation des membres avec images et liens sociaux  
- 💡 **Section Services / À propos** : cartes interactives avec icônes (`lucide-react`)  
- 📱 **Responsive Design** : adapté aux mobiles, tablettes et ordinateurs  
- 🔗 **Préparé pour l’intégration avec backend (API Django DRF)**  

---

## 🛠️ Technologies utilisées

- ⚛️ **React.js** (framework JavaScript principal)  
- 🎨 **Tailwind CSS** (stylisation moderne et responsive)  
- 🎭 **Framer Motion** (animations fluides)  
- ⌨️ **React Type Animation** (texte animé)  
- 🖼️ **Lucide React** (icônes modernes et personnalisables)  
- 📦 **Vite** (bundler rapide et léger)  

---

## 📂 Structure du projet
````bash
frontend
│── public/ # Fichiers statiques (logos, images, favicon, etc.)
│── src/
│ ├── assets/ # Images, icônes et ressources locales
│ ├── components/ # Composants réutilisables (Navbar, Footer, Cards, etc.)
│ ├── pages/ # Pages principales (Accueil, Services, À propos, Contact, Blog, Projets)
│ ├── App.js # Point d'entrée principal de l'application
│ ├── index.js # Bootstrap React
│── package.json # Dépendances et scripts
│── tailwind.config.js # Config Tailwind
│── postcss.config.js # Config PostCSS
│── vite.config.js # Config Vite
│── README.md # Documentation
````


---

## ⚙️ Installation et utilisation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/ton-compte/dtech-frontend.git
cd dtech-frontend
```

### 2 Installer les dépendances
```bash
npm install
# ou
yarn install
```

### 3 Lancer le serveur
```bash
npm run dev
# ou
yarn dev
```
👉 Le projet sera accessible sur : http://localhost:5173

👉 Le site web est disponible ici : [@dtech-africa](https://dtech-africa.alwaysdata.net)

### 🎨 Personnalisation

```bash
    Modifier les couleurs dans tailwind.config.js pour adapter la charte graphique

    Ajouter vos images dans public/assets/ pour qu’elles soient accessibles dans vos composants

    Pour changer les titres animés, éditer la section utilisant react-type-animation dans HeroSection

    Pour ajouter un membre d’équipe :

    Mettre l’image dans public/assets/

    Ajouter ses infos dans le tableau members du composant Team.js
```

### 👨‍💻 Contributeurs

***Eric KOULODJI***: Data Scientist & Ingénieur Machine Learning

***Raymond A. ODOUNHITAN***: Développeur Web Full-Stack & DevSecOps

📜 Licence

Ce projet est protégé sous licence MIT.
Vous pouvez l’utiliser, le modifier et le distribuer en faisant une demande d'accès .
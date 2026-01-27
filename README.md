# 🎬 CineVerse - Movie Discovery App

A modern, responsive movie discovery platform built with React. Browse popular, trending, and top-rated movies powered by The Movie Database (TMDB) API.

## 🌐 Live Demo

**[View Live App →](https://movie-site-dtxe.onrender.com/)**

## ✨ Features

- 🎥 **Browse Movies** - Explore popular, trending, and top-rated films
- 🔍 **Search** - Find any movie instantly
- ❤️ **Favorites** - Save movies to your personal watchlist (stored locally)
- 🎭 **Movie Details** - View cast, ratings, overview, and more in a modal
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark Theme** - Modern, eye-friendly dark UI

## 🛠️ Built With

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool & dev server
- **TMDB API** - Movie data source
- **CSS3** - Custom styling with animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- TMDB API key ([Get one free](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/kushal-kc15/movie-site.git
   cd movie-site
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Add your TMDB API key in `src/services/api.js`
   ```js
   const API_KEY = "your_api_key_here";
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Footer.jsx
│   ├── Loading.jsx
│   ├── MovieCard.jsx
│   ├── MovieModal.jsx
│   └── NavBar.jsx
├── contexts/         # React Context for state management
│   └── MovieContext.jsx
├── css/              # Component styles
├── pages/            # Route pages
│   ├── Home.jsx
│   └── Favorites.jsx
└── services/         # API functions
    └── api.js
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🙏 Acknowledgments

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Icons and emojis for UI elements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Kushal

# CineVerse

A movie discovery app built with React and the TMDB API.

**[Live demo →](https://movie-site-dtxe.onrender.com/)**

## Features

- Browse popular, trending, and top-rated movies
- Filter by genre
- Search any movie
- Trailer playback (YouTube embed)
- Favorites and Watchlist — persisted to localStorage
- Full movie details with cast
- Load More pagination
- Fully responsive

## Stack

- React 18 + React Router v6
- Vite 5
- Plain CSS (no framework)
- TMDB REST API

## Local setup

1. Get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

2. Clone and install
   ```bash
   git clone https://github.com/kushal-kc15/movie-site.git
   cd movie-site
   npm install
   ```

3. Create `.env.local`
   ```
   VITE_TMDB_API_KEY=your_key_here
   ```

4. Run
   ```bash
   npm run dev
   ```

## Deployment

The `public/_redirects` file handles SPA routing on Netlify and Render.

For Render or any static host, set the environment variable `VITE_TMDB_API_KEY` in the dashboard before deploying — Vite bakes it into the build at compile time.

| Command | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview build locally |

---

Data provided by [TMDB](https://www.themoviedb.org/).

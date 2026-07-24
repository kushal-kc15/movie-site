const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Mock data for demo purposes (works without API key)
const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.",
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    release_date: "1994-09-23",
    vote_average: 8.7,
    genre_ids: [18, 80]
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    release_date: "1972-03-14",
    vote_average: 8.7,
    genre_ids: [18, 80]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5ber.jpg",
    release_date: "2008-07-16",
    vote_average: 8.5,
    genre_ids: [28, 80, 18]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    release_date: "1994-09-10",
    vote_average: 8.5,
    genre_ids: [53, 80]
  },
  {
    id: 5,
    title: "Forrest Gump",
    overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do.",
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    release_date: "1994-06-23",
    vote_average: 8.5,
    genre_ids: [35, 18, 10749]
  },
  {
    id: 6,
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.",
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-15",
    vote_average: 8.4,
    genre_ids: [28, 878, 12]
  },
  {
    id: 7,
    title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-30",
    vote_average: 8.2,
    genre_ids: [28, 878]
  },
  {
    id: 8,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    release_date: "2014-11-05",
    vote_average: 8.4,
    genre_ids: [12, 18, 878]
  }
];

// Genre mapping
export const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

export const getPopularMovies = async (page = 1) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY_HERE") {
    return { results: mockMovies, totalPages: 1 };
  }
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return { results: data.results, totalPages: data.total_pages };
};

export const getTrendingMovies = async (page = 1) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY_HERE") {
    return { results: mockMovies.slice(0, 5), totalPages: 1 };
  }
  const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return { results: data.results, totalPages: data.total_pages };
};

export const getTopRatedMovies = async (page = 1) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY_HERE") {
    return { results: mockMovies, totalPages: 1 };
  }
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return { results: data.results, totalPages: data.total_pages };
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY_HERE") {
    const results = mockMovies.filter(m => m.genre_ids?.includes(genreId));
    return { results: results.length ? results : mockMovies, totalPages: 1 };
  }
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return { results: data.results, totalPages: data.total_pages };
};

export const getMovieDetails = async (movieId) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY_HERE") {
    return mockMovies.find(m => m.id === movieId) || mockMovies[0];
  }
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  if (!API_KEY || API_KEY === "YOUR_TMDB_API_KEY_HERE") {
    const results = mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return { results, totalPages: 1 };
  }
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  return { results: data.results, totalPages: data.total_pages };
};

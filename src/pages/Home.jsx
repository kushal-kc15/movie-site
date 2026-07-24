import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getTrendingMovies, getTopRatedMovies, getMoviesByGenre } from "../services/api";

const GENRE_CHIPS = [
  { id: 28,    label: "Action" },
  { id: 35,    label: "Comedy" },
  { id: 27,    label: "Horror" },
  { id: 10749, label: "Romance" },
  { id: 878,   label: "Sci-Fi" },
  { id: 53,    label: "Thriller" },
  { id: 16,    label: "Animation" },
  { id: 18,    label: "Drama" },
  { id: 12,    label: "Adventure" },
  { id: 14,    label: "Fantasy" },
  { id: 80,    label: "Crime" },
  { id: 9648,  label: "Mystery" },
];
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeCategory, setActiveCategory] = useState("popular");
  const [heroIndex, setHeroIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeGenre, setActiveGenre] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popular, trending] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
        ]);
        setMovies(popular.results);
        setTotalPages(popular.totalPages);
        setTrendingMovies(trending.results);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Auto-rotate hero
  useEffect(() => {
    if (trendingMovies.length === 0) return;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % Math.min(trendingMovies.length, 5));
    }, 8000);
    return () => clearInterval(interval);
  }, [trendingMovies]);

  const handleCategoryChange = async (category) => {
    setActiveCategory(category);
    setActiveGenre(null);
    setSearchQuery("");
    setCurrentPage(1);
    setLoading(true);
    setError(null);
    try {
      let data;
      switch (category) {
        case "popular":
          data = await getPopularMovies(1);
          break;
        case "top_rated":
          data = await getTopRatedMovies(1);
          break;
        case "trending":
          data = await getTrendingMovies(1);
          break;
        default:
          data = await getPopularMovies(1);
      }
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    setActiveCategory("search");
    setActiveGenre(null);
    setCurrentPage(1);
    try {
      const data = await searchMovies(searchQuery, 1);
      setMovies(data.results);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = async (genre) => {
    if (activeGenre?.id === genre.id) return;
    setActiveGenre(genre);
    setActiveCategory(null);
    setSearchQuery("");
    setCurrentPage(1);
    setLoading(true);
    setError(null);
    try {
      const data = await getMoviesByGenre(genre.id, 1);
      setMovies(data.results);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
      setError("Failed to load movies...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore) return;
    const nextPage = currentPage + 1;
    setLoadingMore(true);
    try {
      let data;
      if (activeGenre) {
        data = await getMoviesByGenre(activeGenre.id, nextPage);
      } else if (activeCategory === "search") {
        data = await searchMovies(searchQuery, nextPage);
      } else if (activeCategory === "top_rated") {
        data = await getTopRatedMovies(nextPage);
      } else if (activeCategory === "trending") {
        data = await getTrendingMovies(nextPage);
      } else {
        data = await getPopularMovies(nextPage);
      }
      setMovies((prev) => [...prev, ...data.results]);
      setCurrentPage(nextPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const heroMovie = trendingMovies[heroIndex];

  return (
    <div className="home">
      {/* Hero Section */}
      {heroMovie && !loading && (
        <section
          className="hero-section"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <span className="hero-badge">Trending Now</span>
              <h1 className="hero-title">{heroMovie.title}</h1>
              <p className="hero-overview">
                {heroMovie.overview?.slice(0, 200)}
                {heroMovie.overview?.length > 200 ? "..." : ""}
              </p>
              <div className="hero-meta">
                <span className="hero-rating">⭐ {heroMovie.vote_average?.toFixed(1)}</span>
                <span className="hero-year">{heroMovie.release_date?.split("-")[0]}</span>
              </div>
              <div className="hero-actions">
                <button
                  className="hero-btn primary"
                  onClick={() => setSelectedMovie(heroMovie)}
                >
                  View Details
                </button>
              </div>
              <div className="hero-indicators">
                {trendingMovies.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === heroIndex ? "active" : ""}`}
                    onClick={() => setHeroIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search & Categories Section */}
      <section className="browse-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="category-tabs">
          <button
            className={`category-tab ${activeCategory === "popular" ? "active" : ""}`}
            onClick={() => handleCategoryChange("popular")}
          >
            Popular
          </button>
          <button
            className={`category-tab ${activeCategory === "top_rated" ? "active" : ""}`}
            onClick={() => handleCategoryChange("top_rated")}
          >
            Top Rated
          </button>
          <button
            className={`category-tab ${activeCategory === "trending" ? "active" : ""}`}
            onClick={() => handleCategoryChange("trending")}
          >
            Trending
          </button>
        </div>

        <div className="genre-chips">
          {GENRE_CHIPS.map((genre) => (
            <button
              key={genre.id}
              className={`genre-chip ${activeGenre?.id === genre.id ? "active" : ""}`}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </section>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loading />
      ) : (
        <section className="movies-section">
          <h2 className="section-title">
            {activeGenre
              ? `${activeGenre.label} Movies`
              : activeCategory === "search"
              ? `Search Results for "${searchQuery}"`
              : activeCategory === "popular"
              ? "Popular Movies"
              : activeCategory === "top_rated"
              ? "Top Rated Movies"
              : "Trending This Week"}
          </h2>
          {movies.length === 0 ? (
            <div className="no-results">
              <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M8 11h6M11 8v6" />
              </svg>
              <p>No movies found. Try a different search.</p>
            </div>
          ) : (
            <>
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard
                    movie={movie}
                    key={movie.id}
                    onMovieClick={setSelectedMovie}
                  />
                ))}
              </div>
              {currentPage < totalPages && (
                <div className="load-more-wrapper">
                  <button
                    className="load-more-btn"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default Home;

import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getTrendingMovies, getTopRatedMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeCategory, setActiveCategory] = useState("popular");
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popular, trending] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
        ]);
        setMovies(popular);
        setTrendingMovies(trending);
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
    setLoading(true);
    setError(null);
    try {
      let results;
      switch (category) {
        case "popular":
          results = await getPopularMovies();
          break;
        case "top_rated":
          results = await getTopRatedMovies();
          break;
        case "trending":
          results = await getTrendingMovies();
          break;
        default:
          results = await getPopularMovies();
      }
      setMovies(results);
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
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
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
              <span className="hero-badge">🔥 Trending Now</span>
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
            <span className="search-icon">🔍</span>
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
            🎬 Popular
          </button>
          <button
            className={`category-tab ${activeCategory === "top_rated" ? "active" : ""}`}
            onClick={() => handleCategoryChange("top_rated")}
          >
            ⭐ Top Rated
          </button>
          <button
            className={`category-tab ${activeCategory === "trending" ? "active" : ""}`}
            onClick={() => handleCategoryChange("trending")}
          >
            🔥 Trending
          </button>
        </div>
      </section>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loading />
      ) : (
        <section className="movies-section">
          <h2 className="section-title">
            {activeCategory === "search"
              ? `Search Results for "${searchQuery}"`
              : activeCategory === "popular"
              ? "Popular Movies"
              : activeCategory === "top_rated"
              ? "Top Rated Movies"
              : "Trending This Week"}
          </h2>
          {movies.length === 0 ? (
            <div className="no-results">
              <span className="no-results-icon">🎬</span>
              <p>No movies found. Try a different search!</p>
            </div>
          ) : (
            <div className="movies-grid">
              {movies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  onMovieClick={setSelectedMovie}
                />
              ))}
            </div>
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

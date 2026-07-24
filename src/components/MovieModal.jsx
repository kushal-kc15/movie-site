import { useState, useEffect } from "react";
import { getMovieDetails, genres } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieModal.css";

function MovieModal({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites, isInWatchlist, addToWatchlist, removeFromWatchlist } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  useEffect(() => {
    setShowTrailer(false);
    setDetails(null);
    setLoading(true);

    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movie.id);
        setDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movie.id]);

  const handleFavoriteClick = () => {
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  const handleWatchlistClick = () => {
    if (inWatchlist) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds) return [];
    return genreIds.map((id) => genres[id]).filter(Boolean);
  };

  const movieData = details || movie;
  const genreList = movieData.genres
    ? movieData.genres.map((g) => g.name)
    : getGenreNames(movie.genre_ids);

  const trailerKey = details?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  )?.key;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        {loading ? (
          <div className="modal-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div
              className="modal-hero"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
                  movieData.backdrop_path || movie.backdrop_path
                })`,
              }}
            >
              <div className="modal-hero-overlay">
                <div className="modal-hero-content">
                  <h1>{movieData.title}</h1>
                  <div className="modal-meta">
                    <span className="modal-rating">
                      ⭐ {movieData.vote_average?.toFixed(1)}
                    </span>
                    <span className="modal-year">
                      {movieData.release_date?.split("-")[0]}
                    </span>
                    {movieData.runtime && (
                      <span className="modal-runtime">
                        {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}m
                      </span>
                    )}
                  </div>
                  <div className="modal-genres">
                    {genreList.map((genre, index) => (
                      <span key={index} className="genre-tag">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {showTrailer && trailerKey && (
              <div className="modal-trailer">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            )}

            <div className="modal-body">
              <div className="modal-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  alt={movieData.title}
                />
              </div>
              <div className="modal-info">
                <h3>Overview</h3>
                <p className="modal-overview">{movieData.overview}</p>

                {movieData.credits?.cast && (
                  <div className="modal-cast">
                    <h3>Top Cast</h3>
                    <div className="cast-list">
                      {movieData.credits.cast.slice(0, 6).map((person) => (
                        <div key={person.id} className="cast-member">
                          {person.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                              alt={person.name}
                            />
                          ) : (
                            <div className="cast-placeholder">
                              {person.name[0]}
                            </div>
                          )}
                          <span className="cast-name">{person.name}</span>
                          <span className="cast-character">{person.character}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    className={`modal-watchlist-btn ${inWatchlist ? "active" : ""}`}
                    onClick={handleWatchlistClick}
                  >
                    {inWatchlist ? "In Watchlist" : "+ Watchlist"}
                  </button>
                  {trailerKey && (
                    <button
                      className={`modal-trailer-btn ${showTrailer ? "active" : ""}`}
                      onClick={() => setShowTrailer((s) => !s)}
                    >
                      {showTrailer ? "Hide Trailer" : "Watch Trailer"}
                    </button>
                  )}
                  <button
                    className={`modal-favorite-btn ${favorite ? "active" : ""}`}
                    onClick={handleFavoriteClick}
                  >
                    {favorite ? "Remove from Favorites" : "+ Favorites"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieModal;

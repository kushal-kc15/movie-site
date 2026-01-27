import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { genres } from "../services/api";

function MovieCard({ movie, onMovieClick }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  const handleCardClick = () => {
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  const getGenreNames = (genreIds) => {
    if (!genreIds) return [];
    return genreIds.slice(0, 2).map((id) => genres[id]).filter(Boolean);
  };

  const rating = movie.vote_average?.toFixed(1);
  const ratingClass = movie.vote_average >= 7 ? "high" : movie.vote_average >= 5 ? "medium" : "low";

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "♥" : "♡"}
          </button>
          <div className="overlay-content">
            <p className="movie-overview">
              {movie.overview?.slice(0, 150)}
              {movie.overview?.length > 150 ? "..." : ""}
            </p>
            <button className="view-details-btn">View Details</button>
          </div>
        </div>
        {rating && (
          <div className={`movie-rating ${ratingClass}`}>
            <span className="star">★</span>
            <span>{rating}</span>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.release_date?.split("-")[0]}</span>
          <div className="movie-genres">
            {getGenreNames(movie.genre_ids).map((genre, index) => (
              <span key={index} className="genre-badge">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { useState } from "react";

function Favorites() {
  const { favorites } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <div className="favorites-header">
          <h2>Your Favorites</h2>
          <p className="favorites-count">{favorites.length} movie{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.id} 
              onMovieClick={setSelectedMovie}
            />
          ))}
        </div>

        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <div className="empty-icon">
        <span>💔</span>
      </div>
      <h2>No Favorite Movies Yet</h2>
      <p>Start adding movies to your favorites and they will appear here!</p>
      <a href="/" className="browse-btn">
        Browse Movies
      </a>
    </div>
  );
}

export default Favorites;

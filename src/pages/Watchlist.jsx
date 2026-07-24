import "../css/Watchlist.css";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import { useState } from "react";

function Watchlist() {
  const { watchlist } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (watchlist && watchlist.length > 0) {
    return (
      <div className="watchlist">
        <div className="watchlist-header">
          <h2>Your Watchlist</h2>
          <p className="watchlist-count">{watchlist.length} movie{watchlist.length !== 1 ? "s" : ""}</p>
        </div>
        <div className="movies-grid">
          {watchlist.map((movie) => (
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
    <div className="watchlist-empty">
      <div className="empty-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </div>
      <h2>Watchlist is empty</h2>
      <p>Movies you save to watch later will show up here.</p>
      <Link to="/" className="browse-btn">
        Browse Movies
      </Link>
    </div>
  );
}

export default Watchlist;

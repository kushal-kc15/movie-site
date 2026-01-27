import { Link, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const location = useLocation();
  const { favorites } = useMovieContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🎬</span>
          <span className="brand-text">CineVerse</span>
        </Link>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}></span>
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="nav-icon">❤️</span>
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="favorites-badge">{favorites.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
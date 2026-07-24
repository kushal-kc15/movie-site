import { Link, useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { useState } from "react";
import "../css/Navbar.css";

function NavBar() {
  const location = useLocation();
  const { favorites, watchlist } = useMovieContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <svg className="brand-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="9" r="4" fill="#f5f0e8"/>
            <circle cx="16" cy="7" r="4.5" fill="#fff"/>
            <circle cx="22" cy="9" r="4" fill="#f5f0e8"/>
            <circle cx="7"  cy="12" r="3" fill="#f5f0e8"/>
            <circle cx="25" cy="12" r="3" fill="#f5f0e8"/>
            <path d="M7 14 L9 28 H23 L25 14 Z" fill="#e50914"/>
            <path d="M7 14 L9 28 H14 L12 14 Z" fill="#c0070f" opacity="0.5"/>
            <path d="M20 14 L23 28 H19 L17 14 Z" fill="#c0070f" opacity="0.3"/>
            <rect x="6" y="13" width="20" height="3" rx="1.5" fill="#b20710"/>
          </svg>
          <span className="brand-text">PopcornHQ</span>
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
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
            <span>Home</span>
          </Link>
          <Link
            to="/favorites"
            className={`nav-link ${isActive("/favorites") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="favorites-badge">{favorites.length}</span>
            )}
          </Link>
          <Link
            to="/watchlist"
            className={`nav-link ${isActive("/watchlist") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
            <span>Watchlist</span>
            {watchlist.length > 0 && (
              <span className="favorites-badge">{watchlist.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

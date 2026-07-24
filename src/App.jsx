import "./css/App.css";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <MovieProvider>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;

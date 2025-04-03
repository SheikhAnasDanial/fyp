import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import AuthPage from "./pages/AuthPage";
import RecommendationPage from "./pages/RecommendationPage";
import FavoritesPage from "./pages/FavoritesPage";
import LaptopDetailsPage from "./pages/LaptopDetailsPage";
import routes from "tempo-routes";

function App() {
  // Initialize theme from localStorage on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Use system preference if no saved theme
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/laptop/:id" element={<LaptopDetailsPage />} />
          {/* Add a catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;

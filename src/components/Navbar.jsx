import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Laptop,
  Heart,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ theme = "light", onThemeToggle = () => {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Initialize theme from localStorage and check login status
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Get theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setCurrentTheme(savedTheme);
      // Apply theme to document
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // Use system preference if no saved theme
      setCurrentTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, [location]);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    if (onThemeToggle) {
      onThemeToggle();
    }
  };

  const handleGetStarted = () => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).isLoggedIn) {
      navigate("/recommendation");
    } else {
      navigate("/auth");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm dark-transition">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Laptop className="h-8 w-8 text-apple-blue dark:text-apple-darkBlue mr-2" />
            <span className="text-xl font-semibold text-foreground">
              Laptify
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn && !isHomePage ? (
              // Logged in navigation for recommendation and favorites pages
              <>
                <button
                  onClick={() => navigateTo("/recommendation")}
                  className={`text-muted-foreground hover:text-foreground transition-colors ${location.pathname === "/recommendation" ? "text-foreground font-medium" : ""}`}
                >
                  Recommendation
                </button>
                <button
                  onClick={() => navigateTo("/favorites")}
                  className={`text-muted-foreground hover:text-foreground transition-colors ${location.pathname === "/favorites" ? "text-foreground font-medium" : ""}`}
                >
                  Favorites
                </button>
              </>
            ) : isHomePage ? (
              // Home page navigation
              <>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQs
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
              </>
            ) : null}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4 md:space-x-4 justify-end ml-auto md:ml-0">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              className="text-foreground hover:bg-secondary/80 dark-transition"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {isLoggedIn ? (
              // Logged in actions
              <Button
                variant="outline"
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 border-apple-blue dark:border-apple-darkBlue text-apple-blue dark:text-apple-darkBlue hover:bg-apple-blue/10 dark:hover:bg-apple-darkBlue/10 dark-transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              // Not logged in actions
              <Button
                onClick={handleGetStarted}
                className="hidden md:flex bg-apple-blue hover:bg-apple-darkBlue text-white dark-transition"
              >
                Get Started / Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {isLoggedIn && !isHomePage ? (
              // Logged in mobile navigation
              <>
                <button
                  onClick={() => navigateTo("/recommendation")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Recommendation
                </button>
                <button
                  onClick={() => navigateTo("/favorites")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  Favorites
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : isHomePage ? (
              // Home page mobile navigation
              <>
                <button
                  onClick={() => scrollToSection("features")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  FAQs
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block w-full text-left px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  Contact
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

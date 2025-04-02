import React, { useState } from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
}

const Navbar = ({ theme = "light", onThemeToggle = () => {} }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/recommendation");
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Laptop className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-semibold text-foreground">
              Laptify
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
              onClick={() => scrollToSection("about-us")}
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
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Get Started/Login button */}
            <Button
              onClick={handleGetStarted}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started / Login
            </Button>
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
              onClick={() => scrollToSection("about-us")}
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

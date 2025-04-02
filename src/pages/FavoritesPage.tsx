import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Heart, X, ArrowLeft, Laptop, BarChart2 } from "lucide-react";
import Navbar from "@/components/Navbar";

// Create a local LaptopCard component since we're having import issues
interface LaptopCardProps {
  id: string;
  name: string;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  price: number;
}

const LaptopCardComponent = ({
  id = "1",
  name = "Laptop",
  image = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  processor = "Unknown",
  ram = "Unknown",
  storage = "Unknown",
  display = "Unknown",
  price = 0,
}: LaptopCardProps) => {
  return (
    <Card className="h-full bg-card">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-muted-foreground">Processor</div>
          <div className="text-right font-medium">{processor}</div>

          <div className="text-muted-foreground">RAM</div>
          <div className="text-right font-medium">{ram}</div>

          <div className="text-muted-foreground">Storage</div>
          <div className="text-right font-medium">{storage}</div>

          <div className="text-muted-foreground">Display</div>
          <div className="text-right font-medium">{display}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold">${price.toLocaleString()}</span>
          <Button size="sm">View Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

interface Laptop {
  id: string;
  name: string;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  price: number;
  selected?: boolean;
}

const FavoritesPage = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Mock data for favorites
  const [favorites, setFavorites] = useState<Laptop[]>([
    {
      id: "1",
      name: 'MacBook Pro 16"',
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      processor: "Apple M2 Pro",
      ram: "16GB",
      storage: "512GB SSD",
      display: '16" Retina XDR',
      price: 2499,
      selected: false,
    },
    {
      id: "2",
      name: "Dell XPS 15",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80",
      processor: "Intel i9-12900H",
      ram: "32GB",
      storage: "1TB SSD",
      display: '15.6" 4K OLED',
      price: 2199,
      selected: false,
    },
    {
      id: "3",
      name: "Lenovo ThinkPad X1",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      processor: "Intel i7-1165G7",
      ram: "16GB",
      storage: "512GB SSD",
      display: '14" FHD+',
      price: 1699,
      selected: false,
    },
  ]);

  const [compareMode, setCompareMode] = useState(false);
  const [selectedLaptops, setSelectedLaptops] = useState<Laptop[]>([]);

  // Toggle laptop selection for comparison
  const toggleSelect = (id: string) => {
    const updatedFavorites = favorites.map((laptop) => {
      if (laptop.id === id) {
        return { ...laptop, selected: !laptop.selected };
      }
      return laptop;
    });

    setFavorites(updatedFavorites);

    const selected = updatedFavorites.filter((laptop) => laptop.selected);
    setSelectedLaptops(selected);

    // If we have at least 2 laptops selected, enable compare mode
    if (selected.length >= 2 && !compareMode) {
      setCompareMode(true);
    } else if (selected.length < 2 && compareMode) {
      setCompareMode(false);
    }
  };

  // Remove from favorites
  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter((laptop) => laptop.id !== id));
    setSelectedLaptops(selectedLaptops.filter((laptop) => laptop.id !== id));

    // Check if we need to disable compare mode
    if (selectedLaptops.length < 3 && compareMode) {
      setCompareMode(false);
    }
  };

  // Exit compare mode
  const exitCompareMode = () => {
    setCompareMode(false);
    setFavorites(favorites.map((laptop) => ({ ...laptop, selected: false })));
    setSelectedLaptops([]);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Apply theme to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Store theme preference
    localStorage.setItem("theme", newTheme);
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (systemPrefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="bg-background min-h-screen dark-transition">
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <div className="container mx-auto py-8 px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your Favorites
            </h1>
            <p className="text-muted-foreground mt-1">
              Compare and review your saved laptop recommendations
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
            className="border-apple-blue dark:border-apple-darkBlue text-apple-blue dark:text-apple-darkBlue hover:bg-apple-blue/10 dark:hover:bg-apple-darkBlue/10 dark-transition"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Button>
        </div>

        {favorites.length === 0 ? (
          <Card className="w-full p-12 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Laptop className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-xl font-semibold">No favorites yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                You haven't added any laptops to your favorites. Go back to
                recommendations to find your perfect match.
              </p>
              <Button
                onClick={() => (window.location.href = "/recommendation")}
                className="bg-apple-blue hover:bg-apple-darkBlue text-white dark-transition"
              >
                Browse Recommendations
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {compareMode ? (
              <div className="mb-6">
                <div className="flex items-center justify-between bg-muted dark:bg-apple-gray-800 p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    <h2 className="text-lg font-medium">Comparison Mode</h2>
                    <Badge variant="secondary" className="ml-2">
                      {selectedLaptops.length} selected
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exitCompareMode}
                    className="border-apple-blue dark:border-apple-darkBlue text-apple-blue dark:text-apple-darkBlue hover:bg-apple-blue/10 dark:hover:bg-apple-darkBlue/10 dark-transition"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Exit Comparison
                  </Button>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Side-by-Side Comparison</CardTitle>
                    <CardDescription>
                      Compare specifications of your selected laptops
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[180px]">
                            Specification
                          </TableHead>
                          {selectedLaptops.map((laptop) => (
                            <TableHead key={laptop.id}>{laptop.name}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Image</TableCell>
                          {selectedLaptops.map((laptop) => (
                            <TableCell key={`${laptop.id}-img`}>
                              <div className="h-24 w-32 relative rounded-md overflow-hidden">
                                <img
                                  src={laptop.image}
                                  alt={laptop.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Processor
                          </TableCell>
                          {selectedLaptops.map((laptop) => (
                            <TableCell key={`${laptop.id}-proc`}>
                              {laptop.processor}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">RAM</TableCell>
                          {selectedLaptops.map((laptop) => (
                            <TableCell key={`${laptop.id}-ram`}>
                              {laptop.ram}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Storage</TableCell>
                          {selectedLaptops.map((laptop) => (
                            <TableCell key={`${laptop.id}-storage`}>
                              {laptop.storage}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Display</TableCell>
                          {selectedLaptops.map((laptop) => (
                            <TableCell key={`${laptop.id}-display`}>
                              {laptop.display}
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Price</TableCell>
                          {selectedLaptops.map((laptop) => (
                            <TableCell key={`${laptop.id}-price`}>
                              ${laptop.price.toLocaleString()}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={exitCompareMode}
                      className="border-apple-blue dark:border-apple-darkBlue text-apple-blue dark:text-apple-darkBlue hover:bg-apple-blue/10 dark:hover:bg-apple-darkBlue/10 dark-transition"
                    >
                      Cancel
                    </Button>
                    <Button className="bg-apple-blue hover:bg-apple-darkBlue text-white dark-transition">
                      Make Final Selection
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Saved Laptops ({favorites.length})
                  </h2>
                  {favorites.length >= 2 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        // Select the first two laptops by default
                        const updatedFavorites = favorites.map(
                          (laptop, index) => ({
                            ...laptop,
                            selected: index < 2,
                          }),
                        );
                        setFavorites(updatedFavorites);
                        setSelectedLaptops(
                          updatedFavorites.filter((l) => l.selected),
                        );
                        setCompareMode(true);
                      }}
                      className="border-apple-blue dark:border-apple-darkBlue text-apple-blue dark:text-apple-darkBlue hover:bg-apple-blue/10 dark:hover:bg-apple-darkBlue/10 dark-transition"
                    >
                      <BarChart2 className="mr-2 h-4 w-4" />
                      Compare Laptops
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">
                  Select laptops to compare or click on a card to view more
                  details.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((laptop) => (
                <div key={laptop.id} className="relative">
                  <div
                    className={`absolute top-2 right-2 z-10 flex space-x-2 ${compareMode ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm dark:bg-apple-gray-800/80"
                      onClick={() => toggleSelect(laptop.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${laptop.selected ? "fill-apple-blue text-apple-blue dark:fill-apple-darkBlue dark:text-apple-darkBlue" : ""}`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-background/80 backdrop-blur-sm dark:bg-apple-gray-800/80"
                      onClick={() => removeFromFavorites(laptop.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div
                    className={`group ${laptop.selected ? "ring-2 ring-apple-blue dark:ring-apple-darkBlue" : ""} rounded-lg overflow-hidden`}
                  >
                    <LaptopCardComponent
                      id={laptop.id}
                      name={laptop.name}
                      image={laptop.image}
                      processor={laptop.processor}
                      ram={laptop.ram}
                      storage={laptop.storage}
                      display={laptop.display}
                      price={laptop.price}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;

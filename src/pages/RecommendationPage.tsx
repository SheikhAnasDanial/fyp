import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Laptop, SlidersHorizontal, Search, Filter, Heart } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider as SliderComponent } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import LaptopCard from "@/components/LaptopCard";
import Navbar from "@/components/Navbar";

interface PreferenceFormState {
  budget: number;
  purpose: string;
  portability: number;
  performance: number;
  batteryLife: number;
  displayQuality: number;
  gaming: boolean;
  videoEditing: boolean;
  programming: boolean;
  officeWork: boolean;
}

interface Laptop {
  id: string;
  name: string;
  brand: string;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  price: number;
  rating: number;
}

const RecommendationPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("preferences");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBrand, setFilterBrand] = useState("all");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Default preferences
  const [preferences, setPreferences] = useState<PreferenceFormState>({
    budget: 1500,
    purpose: "general",
    portability: 50,
    performance: 50,
    batteryLife: 50,
    displayQuality: 50,
    gaming: false,
    videoEditing: false,
    programming: false,
    officeWork: true,
  });

  // Mock laptop data
  const [laptops, setLaptops] = useState<Laptop[]>([
    {
      id: "1",
      name: 'MacBook Pro 14"',
      brand: "Apple",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      processor: "M2 Pro",
      ram: "16GB",
      storage: "512GB SSD",
      display: '14" Retina XDR',
      price: 1999,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Dell XPS 15",
      brand: "Dell",
      image:
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80",
      processor: "Intel i7-12700H",
      ram: "16GB",
      storage: "1TB SSD",
      display: '15.6" 4K OLED',
      price: 1799,
      rating: 4.6,
    },
    {
      id: "3",
      name: "HP Spectre x360",
      brand: "HP",
      image:
        "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=800&q=80",
      processor: "Intel i7-1165G7",
      ram: "16GB",
      storage: "512GB SSD",
      display: '13.5" OLED Touch',
      price: 1399,
      rating: 4.5,
    },
    {
      id: "4",
      name: "Lenovo ThinkPad X1 Carbon",
      brand: "Lenovo",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80",
      processor: "Intel i7-1165G7",
      ram: "16GB",
      storage: "1TB SSD",
      display: '14" FHD+',
      price: 1649,
      rating: 4.7,
    },
    {
      id: "5",
      name: "ASUS ROG Zephyrus G14",
      brand: "ASUS",
      image:
        "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
      processor: "AMD Ryzen 9 5900HS",
      ram: "32GB",
      storage: "1TB SSD",
      display: '14" QHD 120Hz',
      price: 1799,
      rating: 4.7,
    },
    {
      id: "6",
      name: "Microsoft Surface Laptop 4",
      brand: "Microsoft",
      image:
        "https://images.unsplash.com/photo-1625242662167-a1cfa3737f95?w=800&q=80",
      processor: "AMD Ryzen 7",
      ram: "16GB",
      storage: "512GB SSD",
      display: '13.5" PixelSense',
      price: 1299,
      rating: 4.5,
    },
  ]);

  const handlePreferenceChange = (
    key: keyof PreferenceFormState,
    value: any,
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmitPreferences = () => {
    // In a real app, this would call an API with the clustering algorithm
    // For now, we'll just switch to the results tab
    setActiveTab("results");
  };

  const handleAddToFavorites = (laptopId: string) => {
    // In a real app, this would add the laptop to the user's favorites
    console.log(`Added laptop ${laptopId} to favorites`);
  };

  const handleViewDetails = (laptopId: string) => {
    // In a real app, this would show detailed specs
    console.log(`Viewing details for laptop ${laptopId}`);
  };

  const handleGoToFavorites = () => {
    navigate("/favorites");
  };

  const filteredLaptops = laptops
    .filter(
      (laptop) =>
        laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((laptop) => filterBrand === "all" || laptop.brand === filterBrand);

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
    <div className="min-h-screen bg-background text-foreground dark-transition">
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Find Your Perfect Laptop</h1>
          <p className="text-muted-foreground text-lg">
            Personalized recommendations based on your needs
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/50 dark:bg-secondary/30">
            <TabsTrigger
              value="preferences"
              className="text-lg py-3 data-[state=active]:bg-apple-blue data-[state=active]:text-white dark:data-[state=active]:bg-apple-darkBlue"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <span>Preferences</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="text-lg py-3 data-[state=active]:bg-apple-blue data-[state=active]:text-white dark:data-[state=active]:bg-apple-darkBlue"
            >
              <div className="flex items-center gap-2">
                <Laptop className="h-5 w-5" />
                <span>Recommendations</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="mt-6">
            <Card className="border-none shadow-lg dark:shadow-apple-gray-900/20 dark:bg-apple-gray-800">
              <CardContent className="pt-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitPreferences();
                  }}
                >
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Budget</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>
                              Price Range (up to ${preferences.budget})
                            </Label>
                            <span className="text-muted-foreground">
                              ${preferences.budget}
                            </span>
                          </div>
                          <SliderComponent
                            value={[preferences.budget]}
                            min={500}
                            max={5000}
                            step={100}
                            onValueChange={(value) =>
                              handlePreferenceChange("budget", value[0])
                            }
                            className="py-4"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>$500</span>
                            <span>$5000</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Primary Use
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="purpose" className="mb-2 block">
                            Main Purpose
                          </Label>
                          <Select
                            value={preferences.purpose}
                            onValueChange={(value) =>
                              handlePreferenceChange("purpose", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">
                                General Use
                              </SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="creative">
                                Creative Work
                              </SelectItem>
                              <SelectItem value="gaming">Gaming</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="gaming" className="cursor-pointer">
                              Gaming
                            </Label>
                            <Switch
                              id="gaming"
                              checked={preferences.gaming}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("gaming", checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="videoEditing"
                              className="cursor-pointer"
                            >
                              Video Editing
                            </Label>
                            <Switch
                              id="videoEditing"
                              checked={preferences.videoEditing}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("videoEditing", checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="programming"
                              className="cursor-pointer"
                            >
                              Programming
                            </Label>
                            <Switch
                              id="programming"
                              checked={preferences.programming}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("programming", checked)
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="officeWork"
                              className="cursor-pointer"
                            >
                              Office Work
                            </Label>
                            <Switch
                              id="officeWork"
                              checked={preferences.officeWork}
                              onCheckedChange={(checked) =>
                                handlePreferenceChange("officeWork", checked)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Performance Priorities
                      </h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Portability</Label>
                            <span className="text-muted-foreground">
                              {preferences.portability}%
                            </span>
                          </div>
                          <SliderComponent
                            value={[preferences.portability]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) =>
                              handlePreferenceChange("portability", value[0])
                            }
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Performance</Label>
                            <span className="text-muted-foreground">
                              {preferences.performance}%
                            </span>
                          </div>
                          <SliderComponent
                            value={[preferences.performance]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) =>
                              handlePreferenceChange("performance", value[0])
                            }
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Battery Life</Label>
                            <span className="text-muted-foreground">
                              {preferences.batteryLife}%
                            </span>
                          </div>
                          <SliderComponent
                            value={[preferences.batteryLife]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) =>
                              handlePreferenceChange("batteryLife", value[0])
                            }
                          />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label>Display Quality</Label>
                            <span className="text-muted-foreground">
                              {preferences.displayQuality}%
                            </span>
                          </div>
                          <SliderComponent
                            value={[preferences.displayQuality]}
                            min={0}
                            max={100}
                            step={5}
                            onValueChange={(value) =>
                              handlePreferenceChange("displayQuality", value[0])
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="px-8 bg-apple-blue hover:bg-apple-darkBlue text-white dark-transition"
                      >
                        Get Recommendations
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search laptops..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-4 w-full md:w-auto">
                <div className="flex-1 md:flex-none">
                  <Select value={filterBrand} onValueChange={setFilterBrand}>
                    <SelectTrigger className="w-full md:w-[180px] dark:border-apple-gray-600">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by brand" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="dark:bg-apple-gray-800 dark:border-apple-gray-700">
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="Dell">Dell</SelectItem>
                      <SelectItem value="HP">HP</SelectItem>
                      <SelectItem value="Lenovo">Lenovo</SelectItem>
                      <SelectItem value="ASUS">ASUS</SelectItem>
                      <SelectItem value="Microsoft">Microsoft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  onClick={handleGoToFavorites}
                  className="flex-1 md:flex-none border-apple-blue dark:border-apple-darkBlue text-apple-blue dark:text-apple-darkBlue hover:bg-apple-blue/10 dark:hover:bg-apple-darkBlue/10 dark-transition"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
              </div>
            </div>

            {filteredLaptops.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No laptops match your search criteria.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterBrand("all");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLaptops.map((laptop) => (
                  <motion.div
                    key={laptop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <LaptopCard
                      id={laptop.id}
                      name={laptop.name}
                      image={laptop.image}
                      processor={laptop.processor}
                      ram={laptop.ram}
                      storage={laptop.storage}
                      display={laptop.display}
                      price={laptop.price}
                      rating={laptop.rating}
                      onAddToFavorites={handleAddToFavorites}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecommendationPage;

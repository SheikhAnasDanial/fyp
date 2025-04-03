import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SoftwareSuggestionCard from "@/components/SoftwareSuggestionCard";

// Mock data for laptop details
const laptopData = {
  "1": {
    id: "1",
    name: 'MacBook Pro 16"',
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    processor: "Apple M2 Pro",
    ram: "16GB",
    storage: "512GB SSD",
    display: '16" Retina XDR',
    price: 1999.99,
    rating: 4.8,
    description:
      "The MacBook Pro is a line of Macintosh notebook computers introduced in January 2006 by Apple Inc. It is the higher-end model of the MacBook family, sitting above the consumer-focused MacBook Air, and is sold with 13-inch and 16-inch screens.",
    specifications: {
      graphics: "Apple M2 Pro 16-core GPU",
      battery: "Up to 22 hours",
      camera: "1080p FaceTime HD camera",
      wireless: "Wi-Fi 6E (802.11ax), Bluetooth 5.3",
      ports: "3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3",
      weight: "2.15 kg (4.7 pounds)",
      dimensions: "35.57 x 24.81 x 1.68 cm",
      os: "macOS Ventura",
    },
    shopUrl: "https://www.apple.com/shop/buy-mac/macbook-pro",
  },
  "2": {
    id: "2",
    name: "Dell XPS 15",
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80",
    processor: "Intel Core i7-12700H",
    ram: "32GB",
    storage: "1TB SSD",
    display: '15.6" 4K OLED',
    price: 1899.99,
    rating: 4.6,
    description:
      "The Dell XPS 15 is a premium Windows laptop with a stunning 4K OLED display, powerful performance, and excellent build quality. It's perfect for creative professionals and power users.",
    specifications: {
      graphics: "NVIDIA GeForce RTX 3050 Ti",
      battery: "Up to 12 hours",
      camera: "720p HD camera",
      wireless: "Wi-Fi 6 (802.11ax), Bluetooth 5.2",
      ports:
        "2x Thunderbolt 4, USB-C 3.2, SD card reader, 3.5mm headphone jack",
      weight: "1.96 kg (4.31 pounds)",
      dimensions: "34.4 x 23.0 x 1.8 cm",
      os: "Windows 11 Pro",
    },
    shopUrl:
      "https://www.dell.com/en-us/shop/dell-laptops/xps-15-laptop/spd/xps-15-laptop",
  },
  "3": {
    id: "3",
    name: "Lenovo ThinkPad X1 Carbon",
    image:
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=800&q=80",
    processor: "Intel Core i7-1270P",
    ram: "16GB",
    storage: "512GB SSD",
    display: '14" WUXGA IPS',
    price: 1499.99,
    rating: 4.7,
    description:
      "The ThinkPad X1 Carbon is a premium business laptop known for its durability, excellent keyboard, and business-focused features. It's lightweight yet powerful, making it perfect for professionals on the go.",
    specifications: {
      graphics: "Intel Iris Xe Graphics",
      battery: "Up to 16 hours",
      camera: "1080p FHD camera with privacy shutter",
      wireless: "Wi-Fi 6E (802.11ax), Bluetooth 5.2",
      ports: "2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.0, 3.5mm headphone jack",
      weight: "1.12 kg (2.48 pounds)",
      dimensions: "31.5 x 22.1 x 1.49 cm",
      os: "Windows 11 Pro",
    },
    shopUrl:
      "https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadx1/x1-carbon-gen10/len101t0009",
  },
};

// Mock data for software suggestions
const softwareSuggestions = {
  "1": [
    {
      id: "s1",
      name: "Final Cut Pro",
      description: "Professional video editing software designed for macOS.",
      category: "Video Editing",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1574717024453-e599f3984a48?w=800&q=80",
      url: "https://www.apple.com/final-cut-pro/",
    },
    {
      id: "s2",
      name: "Logic Pro",
      description: "Professional music production software for macOS.",
      category: "Audio Production",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
      url: "https://www.apple.com/logic-pro/",
    },
    {
      id: "s3",
      name: "Adobe Creative Cloud",
      description:
        "Suite of creative applications including Photoshop, Illustrator, and more.",
      category: "Creative Suite",
      price: 52.99,
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
      url: "https://www.adobe.com/creativecloud.html",
    },
  ],
  "2": [
    {
      id: "s4",
      name: "Adobe Premiere Pro",
      description: "Professional video editing software for Windows and macOS.",
      category: "Video Editing",
      price: 20.99,
      image:
        "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&q=80",
      url: "https://www.adobe.com/products/premiere.html",
    },
    {
      id: "s5",
      name: "AutoCAD",
      description:
        "Professional 2D and 3D design software for engineers and architects.",
      category: "Design & Engineering",
      price: 215.0,
      image:
        "https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&q=80",
      url: "https://www.autodesk.com/products/autocad/overview",
    },
    {
      id: "s6",
      name: "Microsoft Office 365",
      description:
        "Productivity suite including Word, Excel, PowerPoint, and more.",
      category: "Productivity",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
      url: "https://www.microsoft.com/en-us/microsoft-365",
    },
  ],
  "3": [
    {
      id: "s7",
      name: "Microsoft Office 365",
      description:
        "Productivity suite including Word, Excel, PowerPoint, and more.",
      category: "Productivity",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
      url: "https://www.microsoft.com/en-us/microsoft-365",
    },
    {
      id: "s8",
      name: "Slack",
      description: "Business communication platform for team collaboration.",
      category: "Communication",
      price: 8.0,
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
      url: "https://slack.com/",
    },
    {
      id: "s9",
      name: "Zoom",
      description: "Video conferencing and virtual meeting platform.",
      category: "Communication",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
      url: "https://zoom.us/",
    },
  ],
};

const LaptopDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const laptop = id ? laptopData[id as keyof typeof laptopData] : null;
  const suggestions = id
    ? softwareSuggestions[id as keyof typeof softwareSuggestions]
    : [];

  if (!laptop) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Laptop not found</h1>
        <Button asChild>
          <Link to="/recommendation">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recommendations
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 bg-background">
      <Button variant="outline" asChild className="mb-6">
        <Link to="/recommendation">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recommendations
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <img
            src={laptop.image}
            alt={laptop.name}
            className="w-full h-auto object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{laptop.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm">
              {laptop.processor}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {laptop.ram}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {laptop.storage}
            </Badge>
          </div>

          <div className="text-2xl font-bold text-primary mb-4">
            ${laptop.price.toLocaleString()}
          </div>

          <p className="text-muted-foreground mb-6">{laptop.description}</p>

          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <a
                href={laptop.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Now
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  laptop.name + " review",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                More Information
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <Tabs defaultValue="specs" className="mb-8">
        <TabsList>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="software">Recommended Software</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Processor:</span>{" "}
                    {laptop.processor}
                  </div>
                  <div>
                    <span className="font-semibold">RAM:</span> {laptop.ram}
                  </div>
                  <div>
                    <span className="font-semibold">Storage:</span>{" "}
                    {laptop.storage}
                  </div>
                  <div>
                    <span className="font-semibold">Display:</span>{" "}
                    {laptop.display}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Graphics:</span>{" "}
                    {laptop.specifications.graphics}
                  </div>
                  <div>
                    <span className="font-semibold">Battery:</span>{" "}
                    {laptop.specifications.battery}
                  </div>
                  <div>
                    <span className="font-semibold">Weight:</span>{" "}
                    {laptop.specifications.weight}
                  </div>
                  <div>
                    <span className="font-semibold">OS:</span>{" "}
                    {laptop.specifications.os}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Camera:</span>{" "}
                  {laptop.specifications.camera}
                </div>
                <div>
                  <span className="font-semibold">Wireless:</span>{" "}
                  {laptop.specifications.wireless}
                </div>
                <div>
                  <span className="font-semibold">Ports:</span>{" "}
                  {laptop.specifications.ports}
                </div>
                <div>
                  <span className="font-semibold">Dimensions:</span>{" "}
                  {laptop.specifications.dimensions}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="software" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((software) => (
              <SoftwareSuggestionCard key={software.id} {...software} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaptopDetailsPage;

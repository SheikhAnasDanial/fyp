import React from "react";
import { Heart, Info, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LaptopCardProps {
  id: string;
  name: string;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  price: number;
  rating?: number;
  isFavorite?: boolean;
  onAddToFavorites?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const LaptopCard = ({
  id = "1",
  name = 'MacBook Pro 16"',
  image = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  processor = "Apple M2 Pro",
  ram = "16GB",
  storage = "512GB SSD",
  display = '16" Retina XDR',
  price = 1999.99,
  rating = 4.8,
  isFavorite = false,
  onAddToFavorites = () => {},
  onViewDetails = () => {},
}: LaptopCardProps) => {
  return (
    <Card className="w-full max-w-[350px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-background">
      <CardHeader className="p-0">
        <div className="relative h-[200px] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {rating && (
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="mb-2 text-xl font-semibold">{name}</h3>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <Badge variant="outline" className="justify-start">
            {processor}
          </Badge>
          <Badge variant="outline" className="justify-start">
            {ram}
          </Badge>
          <Badge variant="outline" className="justify-start">
            {storage}
          </Badge>
          <Badge variant="outline" className="justify-start">
            {display}
          </Badge>
        </div>
        <div className="text-xl font-bold text-primary">
          ${price.toLocaleString()}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 p-4 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={isFavorite ? "text-red-500" : ""}
                onClick={() => onAddToFavorites(id)}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button className="flex-1" onClick={() => onViewDetails(id)} asChild>
          <a href={`/laptop/${id}`}>
            <Info className="mr-2 h-4 w-4" />
            View Details
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LaptopCard;

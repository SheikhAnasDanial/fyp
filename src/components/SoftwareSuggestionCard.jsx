import React from "react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SoftwareSuggestionCard = ({
  id = "s1",
  name = "Software Name",
  description = "Software description goes here.",
  category = "Category",
  price = 9.99,
  image = "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80",
  url = "https://example.com",
}) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-background">
      <div className="relative h-[140px] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <Badge className="absolute top-2 right-2">{category}</Badge>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="text-primary font-bold">RM{price.toLocaleString()}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Learn More
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SoftwareSuggestionCard;

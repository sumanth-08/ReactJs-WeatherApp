import { Star } from "lucide-react";
import { WeatherData } from "../api/types";
import { useFavorite } from "../hooks/use-favorite";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface FavoriteInterface {
  data: WeatherData;
}

const FvaoriteButton = ({ data }: FavoriteInterface) => {
  const { addToFavorite, removeFav, isFav } = useFavorite();

  const isCurrentFavoritte = isFav(data.coord.lat, data.coord.lon);

  const handleToggleFav = () => {
    if (isCurrentFavoritte) {
      removeFav.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`${data.name} has removed from favorite`);
    } else {
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`${data.name} has added to Favorite`);
    }
  };

  return (
    <Button variant={isCurrentFavoritte ? "default" : "outline"} size="sm" className={isCurrentFavoritte ? "bg-amber-400 hover:bg-amber-500" : ""} onClick={handleToggleFav}>
      <Star className={`h-4 w-4 ${isCurrentFavoritte ? "fill-current" : ""}`} />
    </Button>
  );
};
export default FvaoriteButton;

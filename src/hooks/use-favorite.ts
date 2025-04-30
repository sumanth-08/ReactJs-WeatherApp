import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localstorage";

interface FavoriteCity {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorite() {
  const [favorite, setFavorite] = useLocalStorage<FavoriteCity[]>("favorites", []);
  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorite,
    initialData: favorite,
    staleTime: Infinity,
  });

  const addToFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFavrorite: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const isExists = favorite.some((itm) => itm.id === newFavrorite.id);
      if (isExists) {
        return favorite;
      }
      const newFavrorites = [...favorite, newFavrorite].slice(0, 10);

      setFavorite(newFavrorites);
      return newFavrorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  const removeFav = useMutation({
    mutationFn: async (cityId: string) => {
      const fav = favorite.filter((itm) => itm.id !== cityId);
      setFavorite(fav);
      return fav;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  const isFav = (lat: number, lon: number) => favorite.some((itm) => itm.lat === lat && itm.lon === lon);

  return {
    favorite: favoriteQuery.data,
    addToFavorite,
    removeFav,
    isFav,
  };
}

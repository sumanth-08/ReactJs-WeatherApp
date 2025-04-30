import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";
import { Button } from "./ui/button";
import { useState } from "react";
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "../hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "../hooks/use-search-history";
import { format } from "date-fns";
import { useFavorite } from "../hooks/use-favorite";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: location, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const { favorite } = useFavorite();

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-64 lg:w64">
        <Search className="mr-1 h-4 w-4" />
        Search Cities
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search Cities" value={query} onValueChange={setQuery} />
        <CommandList>
          {query.length > 2 && !isLoading && <CommandEmpty>No results found.</CommandEmpty>}

          {favorite.length > 0 && (
            <CommandGroup>
              {favorite.map((itm) => {
                return (
                  <CommandItem key={`${itm.id}`} value={`${itm.lat}|${itm.lon}|${itm.name}|${itm.country}`} onSelect={handleSelect}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>{itm.name},</span>
                    {itm.state && <span className="text-sm text-muted-foreground">{itm.state},</span>}
                    <span className="text-sm text-muted-foreground">{itm.country},</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground font-medium">Recent Searches</p>
                  <Button variant="ghost" size="sm" onClick={() => clearHistory.mutate()}>
                    <span className="flex items-center justify-between text-muted-foreground">
                      <XCircle className="h-4 w-4 " />
                    </span>
                  </Button>
                </div>
                {history.map((itm) => {
                  return (
                    <CommandItem key={`${itm.lat}-${itm.lon}`} value={`${itm.lat}|${itm.lon}|${itm.name}|${itm.country}`} onSelect={handleSelect}>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{itm.name},</span>
                      {itm.state && <span className="text-sm text-muted-foreground">{itm.state},</span>}
                      <span className="text-sm text-muted-foreground">{itm.country},</span>
                      <span className="text-sm text-muted-foreground">{format(itm.searchedAt, "MM d, h:mm a")}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {location && location.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex item-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {location.map((itm) => {
                return (
                  <CommandItem key={`${itm.lat}-${itm.lon}`} value={`${itm.lat}|${itm.lon}|${itm.name}|${itm.country}`} onSelect={handleSelect}>
                    <Search className="mr-2 h-4 w-4" />
                    <span>{itm.name},</span>
                    {itm.state && <span className="text-sm text-muted-foreground">{itm.state},</span>}
                    <span className="text-sm text-muted-foreground">{itm.country}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;

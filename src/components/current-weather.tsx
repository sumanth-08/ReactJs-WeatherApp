import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import type { GeocodingResponse, WeatherData } from "../api/types";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}
const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  const {
    weather: [CurrentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  function formatTemp(temp: number): string {
    return `${Math.ceil(temp)}°`;
  }

  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-end">
                  <h2 className="text-xl font-bold">{locationName?.name}</h2>
                  {locationName?.state && <span className="text-muted-foreground">, {locationName.state}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{locationName?.country}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-6xl font-bold tracking-tighter">{formatTemp(temp)}</p>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Feels like: {formatTemp(feels_like)}</p>
                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="w-3 h-3" />
                      {formatTemp(temp_min - 5)}
                    </span>

                    <span className="flex items-center gap-1 text-red-500">
                      <ArrowUp className="w-3 h-3" />
                      {formatTemp(temp_max + 3)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <div className="flex flex-col  gap-2">
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-3 w-3  text-blue-500" />
                    <p className="text-sm font-medium">{humidity}%</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground">Wind Speed</p>
                  <div className="flex items-center gap-2">
                    <Wind className="h-3 w-3  text-blue-500" />
                    <p className="text-sm font-medium">{speed}m/s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative flex  aspect-square w-full max-w-[200px] items-center justify-center">
                <img src={`https://openweathermap.org/img/wn/${CurrentWeather.icon}@4x.png`} alt="current-weather" className="w-full h-full object-contain" />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">{CurrentWeather.description}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;

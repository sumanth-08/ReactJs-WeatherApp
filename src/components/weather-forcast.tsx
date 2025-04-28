import { format } from "date-fns";
import type { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((prev, cur) => {
    const date = format(new Date(cur.dt * 1000), "yyyy-MM-dd");

    if (!prev[date]) {
      prev[date] = {
        temp_min: cur.main.temp_min,
        temp_max: cur.main.temp_max,
        humidity: cur.main.humidity,
        wind: cur.wind.speed,
        weather: cur.weather[0],
        date: cur.dt,
      };
    } else {
      prev[date].temp_min = Math.min(prev[date].temp_min, cur.main.temp_min);
      prev[date].temp_max = Math.min(prev[date].temp_max, cur.main.temp_max);
    }

    return prev;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 3);

  function formatTemp(temp: number): string {
    return `${Math.ceil(temp)}°`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Forcast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid  gap-6">
          {nextDays.map((day) => {
            return (
              <div key={day.date} className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 items-center gap-4 rounded-lg border p-4">
                <div>
                  <p className="text-sm font-medium">{format(new Date(day.date * 1000), "EEE MM d")}</p>
                  <div className="flex items-center">
                    <img src={`https://openweathermap.org/img/wn/${day.weather.icon}@4x.png`} alt="current-weather" className="w-8 h-8 object-contain" />
                    <p className="text-sm font-medium text-muted-foreground capitalize">{day.weather.description}</p>
                  </div>
                </div>
                <div className="flex justify-start gap-4">
                  <span className="flex items-center gap-0.5 text-sm font-medium text-blue-500">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center gap-0.5 text-sm font-medium text-red-500">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                <div className="flex justify-start  gap-4">
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3  text-blue-500" />
                    <p className="text-sm ">{day.humidity}%</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="h-3 w-3  text-blue-500" />
                    <p className="text-sm ">{day.wind}m/s</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;

import { useParams, useSearchParams } from "react-router-dom";
import { useForecastQuery, useWeatherQuery } from "../hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import WeathertSkeleton from "../components/loading-skeleton";
import CurrentWeather from "../components/current-weather";
import WeatherDetails from "../components/weather-details";
import WeatherForecast from "../components/weather-forcast";
import HourlyTemparature from "../components/hourly-temperature";
import FvaoriteButton from "../components/favorite-button";

const CityPage = () => {
  const param = useParams();
  const [searchParam] = useSearchParams();

  const lat = parseFloat(searchParam.get("lat") || "0");
  const lon = parseFloat(searchParam.get("lon") || "0");
  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !param.cityName) {
    return <WeathertSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-end">
          <h1 className="text-4xl font-bold">{param.cityName}</h1>
          <h1 className="text-lg font-bold text-muted-foreground">, {weatherQuery.data.sys.country}</h1>
        </div>
        <div>
          {/* favorite */}
          <FvaoriteButton data={{ ...weatherQuery.data, name: param.cityName }} />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* current weather */}
          <CurrentWeather data={weatherQuery.data} />
          {/* hourly temparature */}
          <HourlyTemparature data={forecastQuery.data} />
        </div>
        <div className="grid md:grid-cols-2 gap-4 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;

import { LineChart } from "lucide-react";
import type { ForecastData } from "../api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface HourlyTemparatureProps {
  data: ForecastData;
}

const HourlyTemparature = ({ data }: HourlyTemparatureProps) => {
  const chartData = data.list.slice(0, 8).map((itm) => ({
    time: format(new Date(itm.dt * 1000), "ha"),
    temp: Math.round(itm.main.temp),
    feels_like: Math.round(itm.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Todays Temparature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-ful">
          <p className="text-sm text-muted-foreground">[Developer working on this feature]</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemparature;

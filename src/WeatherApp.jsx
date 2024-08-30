import { useState } from "react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState({
    city: "Delhi",
    temp: 12,
    min_temp: 23,
    max_temp: 27,
    humidity: 70,
    feels_like: 25,
    weather: "Thunderstorm",
    description: "light rain",
    wind_speed: 8,
    day: "Saturday",
    date: "2004-04-24",
    hour: "8",
    minute: "30",
  });

  let updateData = (newInfo) => {
    setWeatherData(newInfo);
  };

  return (
    <div className="main-container">
      <SearchBox updateData={updateData} />
      <InfoBox info={weatherData} />
    </div>
  );
}

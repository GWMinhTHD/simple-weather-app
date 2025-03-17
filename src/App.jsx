import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [location, setLocation] = useState(null);
  const [tempUnit, setTempUnit] = useState("celsius");

  const {
    data: weather,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["weather", location?.coordinates],
    queryFn: async () => {
      if (!location?.coordinates) {
        return null;
      }

      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: import.meta.env.VITE_WEATHER_API_KEY,
            q: location.coordinates,
            aqi: "no",
          },
        }
      );

      return response.data;
    },
    enabled: !!location?.coordinates,
    staleTime: 1000 * 60 * 10,
  });

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === "celsius" ? "fahrenheit" : "celsius");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Weather App
        </h1>

        <SearchBar onLocationSelect={handleLocationSelect} />

        {isFetching && <LoadingSpinner />}


        {error && (
          <ErrorMessage message="Failed to fetch weather data. Please try again." />
        )}

        {weather && (
          <WeatherDisplay
            weather={weather}
            tempUnit={tempUnit}
            onToggleTempUnit={toggleTempUnit}
          />
        )}
      </div>

      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>Data provided by WeatherAPI.com</p>
      </footer>
    </div>
  );
}

export default App;

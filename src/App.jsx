"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Import components
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempUnit, setTempUnit] = useState("celsius"); // 'celsius' or 'fahrenheit'

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };

  const toggleTempUnit = () => {
    setTempUnit(tempUnit === "celsius" ? "fahrenheit" : "celsius");
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return;

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json`,
          {
            params: {
              key: import.meta.env.VITE_WEATHER_API_KEY,
              q: city,
              aqi: "no",
            },
          }
        );

        setWeather(response.data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data. Please try again.");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Weather App
        </h1>

        <SearchBar onCityChange={handleCityChange} />

        {loading && <LoadingSpinner />}

        <ErrorMessage message={error} />

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
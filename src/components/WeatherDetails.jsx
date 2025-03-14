function WeatherDetails({ weather, tempUnit }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="text-sm">
        <p className="text-gray-500">Humidity</p>
        <p className="font-medium">{weather.current.humidity}%</p>
      </div>
      <div className="text-sm">
        <p className="text-gray-500">Wind</p>
        <p className="font-medium">{weather.current.wind_kph} km/h</p>
      </div>
      <div className="text-sm">
        <p className="text-gray-500">Feels like</p>
        <p className="font-medium">
          {tempUnit === "celsius"
            ? `${weather.current.feelslike_c}°C`
            : `${weather.current.feelslike_f}°F`}
        </p>
      </div>
      <div className="text-sm">
        <p className="text-gray-500">Pressure</p>
        <p className="font-medium">{weather.current.pressure_mb} mb</p>
      </div>
    </div>
  );
}

export default WeatherDetails;

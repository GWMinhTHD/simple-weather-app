import WeatherDetails from "./WeatherDetails";

function WeatherDisplay({ weather, tempUnit, onToggleTempUnit }) {
  if (!weather) return null;

  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {weather.location.name}
          </h2>
          <p className="text-gray-600">{weather.location.country}</p>
          <p className="text-sm text-gray-500">{weather.location.localtime}</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={weather.current.condition.icon || "/placeholder.svg"}
            alt={weather.current.condition.text}
            className="w-16 h-16"
          />
          <p className="text-gray-700">{weather.current.condition.text}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-800">
            {tempUnit === "celsius"
              ? `${weather.current.temp_c}°C`
              : `${weather.current.temp_f}°F`}
          </p>
          <button
            onClick={onToggleTempUnit}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Switch to {tempUnit === "celsius" ? "Fahrenheit" : "Celsius"}
          </button>
        </div>

        <WeatherDetails weather={weather} tempUnit={tempUnit} />
      </div>
    </div>
  );
}

export default WeatherDisplay;
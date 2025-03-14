import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

function SearchBar({ onCityChange }) {
  const [allCities, setAllCities] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchCountriesAndCities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );

        if (response.data && !response.data.error) {
          const options = [];
          response.data.data.forEach((country) => {
            country.cities.forEach((city) => {
              options.push({
                value: `${city}, ${country.country}`,
                label: `${city}, ${country.country}`,
                city: city,
                country: country.country,
              });
            });
          });

          setAllCities(options);
          setCityOptions(options.slice(0, 100));
        }
      } catch (err) {
        console.error("Error fetching countries and cities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesAndCities();
  }, []);

  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue);

    if (!inputValue) {
      setCityOptions(allCities.slice(0, 100));
      return inputValue;
    }

    const filteredOptions = allCities
      .filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 100);

    setCityOptions(filteredOptions);
    return inputValue;
  };

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      onCityChange(selectedOption.city);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search for a city
      </label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder={loading ? "Loading cities..." : "Type a city name..."}
        isClearable
        isSearchable
        options={cityOptions}
        onInputChange={handleInputChange}
        onChange={handleCityChange}
        isLoading={loading}
        noOptionsMessage={() =>
          searchInput ? "No cities found" : "Type to search for a city"
        }
      />
      {loading && (
        <p className="text-sm text-gray-500 mt-1">
          Loading cities from all countries, this might take a moment...
        </p>
      )}
    </div>
  );
}

export default SearchBar;

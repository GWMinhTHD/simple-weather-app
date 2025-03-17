import { useQuery } from "@tanstack/react-query"
import cities from "cities.json" with { type: "json" }
import { useState } from "react"
import Select from "react-select"

function SearchBar({ onLocationSelect }) {
  const [searchInput, setSearchInput] = useState("")

  const { data: cityOptions, isLoading } = useQuery({
    queryKey:"cities",
    queryFn:() => {
      return cities.slice(0, 100).map((city) => ({
        value: `${city.name}, ${city.country}`,
        label: `${city.name}, ${city.country}`,
        city: city.name,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
      }))
      },
    staleTime: Number.POSITIVE_INFINITY,
    }
  )

  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue)
    if (!inputValue) {
      return inputValue
    }
    return inputValue
  }

  const getFilteredOptions = () => {
    if (!searchInput) {
      return cityOptions || []
    }
    const lowerCaseInput = searchInput.toLowerCase()
    return cities
      .filter(
        (city) =>
          city.name.toLowerCase().includes(lowerCaseInput) || city.country.toLowerCase().includes(lowerCaseInput),
      )
      .slice(0, 100)
      .map((city) => ({
        value: `${city.name}, ${city.country}`,
        label: `${city.name}, ${city.country}`,
        city: city.name,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
      }))
  }

  const handleCityChange = (selectedOption) => {
    if (selectedOption) {
      onLocationSelect({
        name: selectedOption.city,
        country: selectedOption.country,
        coordinates: `${selectedOption.lat},${selectedOption.lng}`,
      })
    }
  }

  const displayOptions = searchInput ? getFilteredOptions() : cityOptions || []
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Search for a city</label>
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder={isLoading ? "Loading cities..." : "Type a city name..."}
        isClearable
        isSearchable
        options={displayOptions}
        onInputChange={handleInputChange}
        onChange={handleCityChange}
        isLoading={isLoading}
        noOptionsMessage={() => (searchInput ? "No cities found" : "Type to search for a city")}
      />
      {isLoading && <p className="text-sm text-gray-500 mt-1">Loading cities data, this might take a moment...</p>}
    </div>
  )
}

export default SearchBar

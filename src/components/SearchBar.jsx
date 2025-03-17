import { useState, useEffect } from "react"
import Select from "react-select"
import cities from "cities.json" with { type: "json" }

function SearchBar({ onLocationSelect }) {
  const [cityOptions, setCityOptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    try {
      setLoading(true)
      const options = cities.map((city) => ({
        value: `${city.name}, ${city.country}`,
        label: `${city.name}, ${city.country}`,
        city: city.name,
        country: city.country,
        lat: city.lat,
        lng: city.lng,
      }))
      setCityOptions(options.slice(0, 100))
      setLoading(false)
    } catch (err) {
      console.error("Error processing cities data:", err)
      setLoading(false)
    }
  }, [])
  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue)

    if (!inputValue) {
      setCityOptions(
        cities.slice(0, 100).map((city) => ({
          value: `${city.name}, ${city.country}`,
          label: `${city.name}, ${city.country}`,
          city: city.name,
          country: city.country,
          lat: city.lat,
          lng: city.lng,
        })),
      )
      return inputValue
    }

    const lowerCaseInput = inputValue.toLowerCase()
    const filteredOptions = cities
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

    setCityOptions(filteredOptions)
    return inputValue
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

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">Search for a city</label>
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
        noOptionsMessage={() => (searchInput ? "No cities found" : "Type to search for a city")}
      />
      {loading && <p className="text-sm text-gray-500 mt-1">Loading cities data, this might take a moment...</p>}
    </div>
  )
}

export default SearchBar

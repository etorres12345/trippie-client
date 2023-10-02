import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function CitySelectionForm({ address, setAddress }) {
  // const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setAddress(value);
        setCoordinates(latLng);
      })
      .catch((error) => console.error("Error selecting city:", error));
  };

  // console.log(address);
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search city...",
                className: "location-search-input",
                name: "autocomplete-name",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {coordinates && (
        <p>
          Selected Address: {address} <br />
          Coordinates: {coordinates.lat}, {coordinates.lng}
        </p>
      )}
    </div>
  );
}

export default CitySelectionForm;

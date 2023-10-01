import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";
import CitySelectionForm from "../components/Trip/CitySelectionForm";
import axios from "axios";

function TripCreateForm() {
  const [title, setTitle] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [googleAPIReady, setGoogleAPIReady] = useState(false);
  const navigate = useNavigate();
  const apiKey = import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const API_URL = "http://localhost:5005";

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (!window.google) {
      return;
    }

    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    setGoogleAPIReady(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || title.trim() === "") {
      alert("Please enter a valid trip title.");
      return;
    }

    const requestBody = { title, city: selectedCity };

    axios
      .post(`${API_URL}/trips`, requestBody)
      .then((response) => {
        console.log("Trip created:", response);
        navigate(`/trips/${response.data._id}`);
      })
      .catch((error) => {
        console.error("Error creating trip:", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Trip Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            name="trip-title"
            required
          />
        </label>
        <button type="submit">Create Trip</button>
      </form>
      {googleAPIReady && (
        <CitySelectionForm
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      )}
    </div>
  );
}

export default TripCreateForm;

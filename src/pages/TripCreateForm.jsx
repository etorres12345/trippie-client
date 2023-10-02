import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PlacesAutocomplete from "react-places-autocomplete";
import CitySelectionForm from "../components/Trip/CitySelectionForm";
import axios from "axios";
import RestaurantList from "./RestaurantList";

function TripCreateForm() {
  const [title, setTitle] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [googleAPIReady, setGoogleAPIReady] = useState(false);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const apiKey = import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const API_URL = "http://localhost:5005/api";

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
    const storedToken = localStorage.getItem("authToken");

    if (!title || title.trim() === "") {
      alert("Please enter a valid trip title.");
      return;
    }

    const requestBody = { title, city: address };

    axios
      .post(`${API_URL}/trips`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Trip created:", response);
        navigate(`/trips/${response.data._id}`);
      })
      .catch((error) => {
        console.error("Error creating trip:", error);
      });

    axios
      .get(`${API_URL}/restaurants/${address}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Restaurant Data:", response.data);
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.log("Error getting restaurants:", error);
      });
  };
  console.log(address, "parent");
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
        <CitySelectionForm address={address} setAddress={setAddress} />
      )}
      {restaurants.length > 0 && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}

export default TripCreateForm;

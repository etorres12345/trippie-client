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
  const [tripId, setTripId] = useState("");

  const navigate = useNavigate();
  const apiKey = import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY;
  const API_URL = "https://trippie.onrender.com/api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem("authToken");
    if (!title || title.trim() === "") {
      alert("Please enter a valid trip title.");
      return;
    }
    const requestBody = { title, city: address };
    console.log("b4try");
    try {
      const tripInfo = await axios.post(`${API_URL}/trips`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setTripId(tripInfo.data._id);
      localStorage.setItem("tripIdStorage", tripInfo.data._id);

      const foundRest = await axios.get(`${API_URL}/restaurants/${address}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setRestaurants(foundRest.data);
    } catch (error) {
      console.error(error);
      console.log("catch");
    }
  };

  // console.log(tripId, restaurants);
  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="label1">
          <label>Trip Title:</label>
          <div>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              name="trip-title"
              required
            />
          </div>
        </div>
        <div className="label1">
          <label>
            City:
            {googleAPIReady && (
              <CitySelectionForm address={address} setAddress={setAddress} />
            )}
          </label>
        </div>
        <div>
          <button className="create-trip-button" type="submit">
            Create Trip
          </button>
        </div>
      </form>
      {restaurants.length > 0 && (
        <RestaurantList restaurants={restaurants} tripId={tripId} />
      )}
    </div>
  );
}

export default TripCreateForm;

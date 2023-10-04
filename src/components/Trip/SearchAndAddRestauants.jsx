import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantList from "../../pages/RestaurantList";
import { useParams } from "react-router-dom";

function SearchAndAddRestaurants() {
  const { city } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const API_URL = "http://localhost:5005/api";

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/restaurants/${city}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();
  }, [city]);

  return (
    <div>
      <h2>Restaurants in {city}</h2>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}

export default SearchAndAddRestaurants;

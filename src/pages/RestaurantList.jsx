import React from "react";
import axios from "axios";
import { useState } from "react";

function RestaurantList({ restaurants, tripId }) {
  // console.log("props", props);
  const apiKey = import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY2;
  const API_URL = "http://localhost:5005/api";
  const storedToken = localStorage.getItem("authToken");
  const [addedRestaurants, setAddedRestaurants] = useState([]);

  const handleAddToTrip = (restaurant) => {
    console.log("trup id:", restaurant.place_id, tripId);

    axios
      .post(
        `${API_URL}/trips/${tripId}/add-restaurant`,
        {
          restaurantData: restaurant,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("Restaurant added to trip:", response.data);
        setAddedRestaurants([...addedRestaurants, restaurant.place_id]);
      })
      .catch((error) => {
        console.error("Error adding restaurant to trip:", error);
      });
  };

  if (!restaurants || !Array.isArray(restaurants)) {
    return <div>No restaurants to display.</div>;
  }

  return (
    <div>
      <h1>Restaurant Options</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.place_id} className="restaurantCard">
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.formatted_address}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Price Level: {restaurant.price_level || "N/A"}</p>
            {restaurant.photos?.map((photo, photoIndex) => (
              <img
                key={photoIndex}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAhQy6UWV1FaTln5le2QsDLbbR6scvhmiA`}
                alt={`Photo ${photoIndex}`}
              />
            ))}
            {addedRestaurants.includes(restaurant.place_id) ? (
              <button>Added!</button>
            ) : (
              <button onClick={() => handleAddToTrip(restaurant)}>
                Add to Trip
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;

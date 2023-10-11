import React from "react";
import axios from "axios";
import { useState } from "react";

function RestaurantList({ restaurants, tripId }) {
  // console.log("props", props);
  const apiKey = import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY2;
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const storedToken = localStorage.getItem("authToken");
  const [addedRestaurants, setAddedRestaurants] = useState([]);

  console.log("trup id:", tripId);
  console.log("localStorage", localStorage.getItem("tripIdStorage"));
  const handleAddToTrip = (restaurant) => {
    console.log("trup id:", restaurant.place_id, tripId);

    axios
      .post(
        `${API_URL}/trips/${
          tripId || localStorage.getItem("tripIdStorage")
        }/add-restaurant`,
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
    <div className="restaurant-list-container">
      <div className="restaurant-list-heading">
        <h1>Restaurant Options</h1>
      </div>
      <div className="restaurant-card-container">
        <ul className="restaurant-card-ul">
          {restaurants.map((restaurant) => (
            <div className="xy">
              <li key={restaurant.place_id} className="restaurant-card-li">
                <div className="restaurant-list-h3">
                  <h3>{restaurant.name}</h3>
                </div>
                <p>Address: {restaurant.formatted_address}</p>
                <p>Rating: {restaurant.rating}/5 Stars!</p>
                <p>Price Level: {restaurant.price_level || "N/A"}</p>
                <div>
                  {restaurant.photos?.map((photo, photoIndex) => (
                    <img
                      key={photoIndex}
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAhQy6UWV1FaTln5le2QsDLbbR6scvhmiA`}
                      alt={`Photo ${photoIndex}`}
                      className="restaurant-list-photo-div"
                    />
                  ))}
                </div>
                <div className="button-div">
                  {addedRestaurants.includes(restaurant.place_id) ? (
                    <button className="restaurant-list-add-button">
                      Added!
                    </button>
                  ) : (
                    <button
                      className="restaurant-list-add-button"
                      onClick={() => handleAddToTrip(restaurant)}
                    >
                      Add to Trip
                    </button>
                  )}
                </div>
              </li>
            </div>
          ))}
          <a className="to-trips-a" href="/trips">
            <button className="my-trips-button">To My Trips</button>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default RestaurantList;

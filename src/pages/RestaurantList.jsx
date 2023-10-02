import React from "react";

function RestaurantList({ restaurants }) {
  const apiKey = import.meta.env.REACT_APP_GOOGLE_PLACES_API_KEY2;

  return (
    <div>
      <h1>Restaurant Options</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="restaurantCard">
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.formatted_address}</p>
            <p>Rating: {restaurant.rating}</p>
            <p>Price Level: {restaurant.price_level || "N/A"}</p>
            {restaurant.photos.map((photo, photoIndex) => (
              <img
                key={photoIndex}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAhQy6UWV1FaTln5le2QsDLbbR6scvhmiA`}
                alt={`Photo ${photoIndex}`}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantList;

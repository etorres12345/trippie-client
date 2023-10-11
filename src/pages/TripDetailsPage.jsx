import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_SERVER_URL;
const storedToken = localStorage.getItem("authToken");

function TripDetailsPage(props) {
  const [trip, setTrip] = useState(null);
  const { tripId } = useParams();

  //   const deleteRestaurant = () => {
  //     axios
  //     .delete(`${API_URL}/api/trips/`)
  //   }

  const getTrip = () => {
    axios
      .get(`${API_URL}/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("This is place obj", response);
        const oneTrip = response.data;
        setTrip(oneTrip);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTrip();
  }, []);

  const handleDeleteRestaurant = (placeId) => {
    axios
      .delete(`${API_URL}/trips/${tripId}/restaurants/$placeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setTrip((prevTrip) => ({
          ...prevTrip,
          places: prevTrip.places.filter((place) => place.place_id !== placeId),
        }));
      })
      .catch((error) => console.error("Error deleting restaurant:", error));
  };

  return (
    <div className="trip-details-container">
      {trip && (
        <div className="details-heading-div">
          <div className="details-h1">
            <h1>{trip.title}</h1>
          </div>
          <div className="details-h2">
            <h2>Restaurants on my list:</h2>
          </div>
        </div>
      )}
      <div className="details-map-div">
        {trip &&
          trip.places.map((place) => (
            <ul classname="details-ul">
              <li className="details-li" key={place.place_id}>
                <div className="details-heading3">
                  <h2>{place.name}</h2>
                </div>
                <p>Address: {place.formatted_address}</p>
                <p>Restaurant Rating: {place.rating}/5 stars!</p>
                <p>Price Level: {place.price_level || "N/A"}</p>
                <p>
                  {place.opening_hours.open_now === true
                    ? "open now!"
                    : "Not open at this hour, check again later!"}
                </p>
                <div>
                  {place.photos?.map((photo, photoIndex) => (
                    <img
                      key={photoIndex}
                      src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAhQy6UWV1FaTln5le2QsDLbbR6scvhmiA`}
                      alt={`Photo ${photoIndex}`}
                      className="details-img"
                    />
                  ))}
                </div>
                {console.log(trip)}

                <button
                  className="restaurant-list-add-button3"
                  onClick={() => handleDeleteRestaurant(place.place_id)}
                >
                  Delete Restaurant
                </button>
              </li>
            </ul>
          ))}
      </div>
      <div className="more-options-details">
        <Link to={`/search-restaurants/${trip?.city}`}>
          <button className="restaurant-list-add-button2">
            Add more restaurants
          </button>
        </Link>
        <Link to="/trips">
          <button className="restaurant-list-add-button2">Back to Trips</button>
        </Link>
      </div>
    </div>
  );
}

export default TripDetailsPage;

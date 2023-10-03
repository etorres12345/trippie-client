import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";
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
      .get(`${API_URL}/api/trips/${tripId}`, {
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

  return (
    <div className="TripDetails">
      {trip && (
        <>
          <h1>{trip.title}</h1>
        </>
      )}

      {trip &&
        trip.places.map((place) => (
          <li className="PlaceCard" key={place.place_id}>
            <h2>{place.name}</h2>
            <p>Address: {place.formatted_address}</p>
            <p>Restaurant Rating: {place.rating}</p>
            <p>Price Level: {place.price_level || "N/A"}</p>
            {place.photos?.map((photo, photoIndex) => (
              <img
                key={photoIndex}
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAhQy6UWV1FaTln5le2QsDLbbR6scvhmiA`}
                alt={`Photo ${photoIndex}`}
              />
            ))}
          </li>
        ))}
      <Link to="/trips">
        <button>Back to Trips</button>
      </Link>
    </div>
  );
}

export default TripDetailsPage;

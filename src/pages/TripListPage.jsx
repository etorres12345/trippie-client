import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function TripListPage() {
  const [trips, setTrips] = useState([]);

  const getAllTrips = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/trips`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.log("Response data is not an array:", response.data);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className="TripListPage">
      {trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        trips.map((trip) => {
          const places = trip.places || [];
          return (
            <div className="TripCard card" key={trip._id}>
              <Link to={`/trips/${trip._id}`}>
                <h3>{trip.title}</h3>
              </Link>
              <ul>
                {places.map((place, index) => (
                  <li key={index}>{place.name}</li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}

export default TripListPage;

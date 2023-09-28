import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function TripListPage() {
  const [trips, setTrips] = useState([]);

  const getAllTrips = () => {
    axios
      .get(`${API_URL}/api/trips`)
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <div className="TripListPage">
      {trips.map((trip) => {
        return (
          <div className="TripCard card" key={trip._id}>
            <Link to={`/trips/${trip._id}`}>
              <h3>{trip.title}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default TripListPage;

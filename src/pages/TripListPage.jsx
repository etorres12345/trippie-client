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

  const deleteTrip = (tripId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setTrips((prevTrips) =>
          prevTrips.filter((trip) => trip._id !== tripId)
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="TripListPage">
      {trips.length === 0 ? (
        <p>No trips available.</p>
      ) : (
        trips.map((trip) => {
          const places = trip.places || [];
          return (
            <>
              <div className="hero-section" key={trip._id}>
                <div className="card-grid">
                  <a className="card">
                    {/* <div className="card__background">
                      <img src="/images/4745_foodie.jpg" />
                    </div> */}
                    <div className="card__content">
                      <ul className="trip-list-ul">
                        {places.map((place, index) => (
                          <li className="card__category">{place.name}</li>
                        ))}
                      </ul>
                      <Link to={`/trips/${trip._id}`}>
                        <h3 className="card__heading">{trip.title}</h3>
                      </Link>
                      <img
                        className="trash"
                        src="/images/trash.png"
                        onClick={() => deleteTrip(trip._id)}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}

export default TripListPage;

{
  /* <div className="TripCard card" key={trip._id}>
              <Link to={`/trips/${trip._id}`}>
                <h3>{trip.title}</h3>
              </Link>
              <ul className="trip-list-ul">
                {places.map((place, index) => (
                  <li key={index}>{place.name}</li>
                ))}
              </ul>
              <img
                className="trash"
                src="/images/trash.png"
                onClick={() => deleteTrip(trip._id)}
              />
            </div> */
}

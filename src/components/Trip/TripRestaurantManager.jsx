// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function TripRestaurantManager({ tripId }) {
//   const [trip, setTrip] = useState(null);

//   useEffect(() => {

//     const fetchTripData = async () => {
//       try {
//         const response = await axios.get(`/api/trips/${tripId}`);
//         setTrip(response.data);
//       } catch (error) {
//         console.error("Error fetching trip data:", error);
//       }
//     };

//     fetchTripData();
//   }, [tripId]);

//   const removeFromTrip = async (restaurantId) => {
//     try {
//       await axios.delete(`/api/trips/${tripId}/restaurants/${restaurantId}`);
//       const updatedPlaces = trip.places.filter(
//         (place) => place._id !== restaurantId
//       );
//       setTrip({ ...trip, places: updatedPlaces });
//     } catch (error) {
//       console.error("Error removing restaurant from trip:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Trip Details</h2>
//       {trip && (
//         <div>
//           <h3>{trip.title}</h3>
//           <ul>
//             {trip.places.map((restaurant) => (
//               <li key={restaurant._id}>
//                 <h4>{restaurant.name}</h4>
//                 <p>Address: {restaurant.address}</p>
//                 <button onClick={() => removeFromTrip(restaurant._id)}>
//                   Remove from Trip
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TripRestaurantManager;

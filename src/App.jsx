import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TripListPage from "./pages/TripListPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/isAnon";
import TripCreateForm from "./pages/TripCreateForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/trips"
          element={
            <IsPrivate>
              <TripListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/create-trip"
          element={
            <IsPrivate>
              <TripCreateForm />
            </IsPrivate>
          }
        />
        <Route
          path="/trips/:tripId"
          element={
            <IsPrivate>
              <TripListPage />
            </IsPrivate>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}
export default App;

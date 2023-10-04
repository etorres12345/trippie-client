import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <input
        className="menu-icon"
        type="checkbox"
        id="menu-icon"
        name="menu-icon"
      />
      <label htmlFor="menu-icon"></label>
      <nav className="nav">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {isLoggedIn && (
            <div htmlFor="menu-icon">
              <li>
                <a href="/trips">My Trips</a>
              </li>
              <li>
                <a href="/create-trip">New Trip</a>
              </li>
              <li onClick={logOutUser}>
                <a>Logout</a>
              </li>
            </div>
          )}
          {!isLoggedIn && (
            <div htmlFor="menu-icon">
              <li>
                <a href="/signup">Signup</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      {/* <h1>Trippie!</h1> */}
      {/* <h3>Your Favorite Foodie's Favorite Planning Tool</h3> */}
      <div className="section-center">
        <h1 className="mb-0">Trippie!</h1>
      </div>

      <div className="side-by-side">
        <div className="info-container">
          <p>
            Traveling somewhere and looking for some good food? With this food
            trip planner you can make it easy to never forget where you wanted
            to grab a bite on your next trip!
          </p>
        </div>
        <div className="homepage-image-container">
          <img
            src="/images/4745_foodie.jpg"
            alt="woman eating a cheeseburger"
            width="550"
            height="450"
            className="pic1"
          />
        </div>
      </div>

      <div className="side-info-container">
        <div>
          <img
            className="pic2-homepage"
            src="/images/food_pic2.jpg"
            width="700"
            height="450"
          />
        </div>
        <div className="sideby2-container">
          <h3>How does it work?</h3>
          <ul className="homepage-list">
            <li>Give your trip a title</li>
            <li>Pick a destination</li>
            <li>Choose some restaurants!</li>
          </ul>
        </div>
      </div>
      <div className="third-homepage-tile">
        <div className="taco-image-homepage">
          <img className="tacos-img" src="/images/tacos.jpg" />
        </div>
        <div className="tile-three-container">
          <h3>LET'S START PLANNING!</h3>
          <Link to={"/create-trip"} className="create-link">
            Create your trip now!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

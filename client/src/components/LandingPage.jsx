import { Link } from "react-router-dom";
import "../style/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="contenedor">
      <img
        className="imagen"
        src="https://thumbs.gfycat.com/DelightfulDisfiguredHamadryad-size_restricted.gif"
        alt="Country_Song"
      />
      <Link to="/home">
        <button className="btn">
          <span className="span">START</span>
        </button>
      </Link>
    </div>
  );
};
export default LandingPage;

import { Link } from "react-router-dom";
import "../style/NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="img-container">
        <Link to={"/"}>
          <img
            src="https://e7.pngegg.com/pngimages/504/264/png-clipart-world-cartoon-illustration-sphere-map-building-globe.png"
            alt="MapaMundi"
          />
        </Link>
      </div>
      <div className="link-container">
        <Link to={"/home"}>Home</Link>
        <Link to={"/create"}>Create</Link>
      </div>
    </div>
  );
};
export default NavBar;

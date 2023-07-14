/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../style/Card.css";

const Card = ({ id, flag, name, continent }) => {
  return (
    <div className="container">
      <Link to={`/detail/${id}`}>
        <div className="card">
          <img className="img" src={flag} alt={name} />
          <div>
            <h3 className="name">{name}</h3>
            <div>
              <p className="continent">{continent}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Card;

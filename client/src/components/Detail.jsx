import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../style/Detail.css";

const Detail = () => {
  const [country, setCountry] = useState();
  let { id } = useParams();
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3001/countries/${id}`)
        .then((result) => setCountry(result.data));
    } catch (error) {
      console.log(error);
    }
  }, [id]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
  });
  return (
    <div className="detail">
      {country ? (
        <div className="paises-detalle">
          <div className="titulo-pais">
            <h3>{country.id}</h3>
            <Link to="/home">
              <button>X</button>
            </Link>
          </div>
          <img src={country.flag} alt={country.name} className="imagen-pais" />
          <h3>{country.name}</h3>
          <div className="detalle-paises">
            <h4>
              Population: <span>{formatter.format(country.population)}</span>{" "}
            </h4>
            <h4>
              Continent: <span>{country.continent}</span>
            </h4>
            <h4>
              Subregion: <span> {country.subregion}</span>
            </h4>
            <h4>
              Area: <span>{formatter.format(country.area)}km²</span>
            </h4>
            <h4>
              Capital: <span>{country.capital}</span>
            </h4>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;

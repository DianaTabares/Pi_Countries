/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Card from "./Card";
import "../style/Cards.css";
import { useEffect, useState } from "react";

const Cards = ({ allCountries, currentPage, perPage, filterCountries }) => {
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    if (filterCountries.length > 0) {
      setCountriesToShow(filterCountries.slice(startIndex, endIndex));
    } else {
      setCountriesToShow(allCountries.slice(startIndex, endIndex));
    }
  }, [filterCountries, allCountries, currentPage]);

  return (
    <div className="cardGrid">
      {countriesToShow.map((country, index) => (
        <div key={index}>
          {
            <Card
              id={country.id}
              name={country.name}
              flag={country.flag}
              continent={country.continent}
            />
          }
        </div>
      ))}
    </div>
  );
};

export default Cards;

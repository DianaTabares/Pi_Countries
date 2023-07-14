/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useDispatch, useSelector } from "react-redux";
import {
  getSort,
  population,
  continent,
  filterActivity,
} from "../redux/actions";
import SearchBar from "./SearchBar";
import "../style/Filters.css";
import { useEffect, useState } from "react";

const Filters = ({ setSort, sort, setInput, setCurrent }) => {
  const [optionActivities, setOptionActivities] = useState([]);
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    setOptionActivities(
      activities
        .map((country) => country.name)
        .filter((activity, index, self) => self.indexOf(activity) === index)
    );
  }, [activities]);
  const handleSort = (event) => {
    event.preventDefault();
    dispatch(getSort(event.target.value));
    //setSort(!sort);
  };

  const handlePopulation = (event) => {
    dispatch(population(event.target.value));
    setSort(!sort);
  };

  const handleContinent = (event) => {
    dispatch(continent(event.target.value));
    setInput(1);
    setCurrent(1);
  };

  const handleActividades = (event) => {
    dispatch(filterActivity(event.target.value));
    setInput(1);
    setCurrent(1);
  };

  return (
    <div className="containers-filter">
      <div>
        <label htmlFor="">Sort</label>
        <select id="sort" name="Sort" onChange={handleSort}>
          <option value="sort">Sort</option>
          <option value="A">Name (A-Z)</option>
          <option value="D">Name (Z-A)</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Population</label>
        <select id="population" name="Population" onChange={handlePopulation}>
          <option value="population">Population</option>
          <option value="H">Highest (↑)</option>
          <option value="L">Lowest (↓)</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Continents</label>
        <select id="continents" name="Continents" onChange={handleContinent}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Activity</label>
        <select name="Activity" onChange={handleActividades}>
          <option value="All">Activities</option>
          {optionActivities?.map((event, i) => (
            <option key={i} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Filters;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import Cards from "./Cards";
import { getActivities, getCountries } from "../redux/actions";
import { connect } from "react-redux";
import Filters from "./Filters";
import Pagination from "./Pagination";
import "../style/Home.css";

const Home = (props) => {
  const { allCountries, filterCountries } = props;
  const [sort, setSort] = useState(true);
  const [input, setInput] = useState(1);
  const [current, setCurrent] = useState(1);
  const [perPage] = useState(10);
  const max = Math.ceil(allCountries.length / perPage);

  useEffect(() => {
    props.getCountries();
    props.getActivities();
  }, []);

  return (
    <div className="home">
      <h1 className="titulo">Countries</h1>
      <div className="ordenamiento">
        <Filters
          setSort={setSort}
          sort={sort}
          setInput={setInput}
          setCurrent={setCurrent}
        />
      </div>
      <div className="cards">
        <Cards
          filterCountries={filterCountries}
          allCountries={allCountries}
          currentPage={current}
          perPage={perPage}
        />
      </div>
      <Pagination
        current={current}
        setCurrent={setCurrent}
        max={max}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
    activities: state.activities,
    filterCountries: state.filterCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(getCountries()),
    getActivities: () => dispatch(getActivities()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

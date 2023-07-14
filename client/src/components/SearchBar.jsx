import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCountriesName } from '../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = () => {
    if (search.length) {
      dispatch(getCountriesName(search));
      document.getElementById("search").value = "";
    }
  };

  return (
    <div>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        onChange={(event) => handleSearch(event)}
        value={search}
        autoComplete="on"       
      />
      <button
        type="submit"
        onClick={(event) => handleSubmit(event)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
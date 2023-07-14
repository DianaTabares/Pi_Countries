/* eslint-disable react/prop-types */
import "../style/Pagination.css";

const Pagination = ({ current, setCurrent, max, input, setInput }) => {
  const next = () => {
    const newCurrent = current + 1;
    setCurrent(newCurrent);
    setInput(newCurrent);
  };

  const previous = () => {
    const newCurrent = current - 1;
    setCurrent(newCurrent);
    setInput(newCurrent);
  };

  return (
    <div className="paginacion">
      <button disabled={current === 1} onClick={previous}>
        {"<"}
      </button>
      <input
        type="text"
        maxLength="2"
        name="page"
        autoComplete="off"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <span>of {max}</span>
      <button disabled={current === max} onClick={next}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;

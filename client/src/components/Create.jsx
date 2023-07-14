/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCountries, postActivities } from "../redux/actions";
import "../style/Create.css";

const Create = (props) => {
  const { allCountries } = props;
  const idCountries = [];

  allCountries.map((id) => {
    const newListCountries = {
      id: id.id,
      name: id.name,
    };
    idCountries.push(newListCountries);
  });

  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countriesId: [],
  });
  const temporada = ["Spring", "Summer", "Autumn", "Winter"];
  const dificultad = [1, 2, 3, 4, 5];

  const handleInputChange = (event) => {
    setActivity({
      ...activity,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      props.postActivities(activity);
      resetForm();
    } else {
      alert("Completa todos los campos antes de enviar");
    }
  };

  const handleSelectCountry = (event) => {
    const selectedCountryId = event.target.value;
    if (!activity.countriesId.includes(selectedCountryId)) {
      setActivity((prevActivity) => ({
        ...prevActivity,
        countriesId: [...prevActivity.countriesId, selectedCountryId],
      }));
    } else {
      alert("El país ya ha sido seleccionado");
    }
  };

  const handleRemoveCountry = (event) => {
    setActivity((prevActivity) => ({
      ...prevActivity,
      countriesId: prevActivity.countriesId.filter(
        (id) => id !== event.target.value
      ),
    }));
  };

  const validateCreate = () => {
    const errors = {};
    if (activity.name.length === 0) {
      errors.name = true;
    } else if (activity.name.length > 20) {
      errors.name = "El nombre no puede exceder los 20 caracteres";
    }
    if (activity.difficulty === "") errors.difficulty = "error";
    if (activity.duration === "") errors.duration = "error";
    if (activity.season === "") errors.season = "error";
    if (!activity.countriesId[0]) errors.country = "error";
    return errors;
  };
  const isFormValid = () => {
    const errors = validateCreate();
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countriesId: [],
    });
  };

  useEffect(() => {
    props.getCountries();
  }, []);

  return (
    <div className="form">
      <h1 className="titulo">Form</h1>
      <form className="name" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={activity.name}
            onChange={handleInputChange}
          />
          {validateCreate().name && (
            <span>
              {validateCreate().name === true
                ? "El nombre es obligatorio"
                : validateCreate().name}
            </span>
          )}
        </div>
        <div className="dificultad">
          <label htmlFor="difficulty">Dificultad:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={activity.difficulty}
            onChange={handleInputChange}
          >
            <option value="">Selecciona una opción</option>
            {dificultad.map((rango, index) => (
              <option value={rango} key={index}>
                {rango}
              </option>
            ))}
          </select>
          {validateCreate().difficulty && <span>Error de validación</span>}+
        </div>
        <div className="duracion">
          <label htmlFor="duration">Duración:</label>
          <input
            type="time"
            id="duration"
            name="duration"
            value={activity.duration}
            onChange={handleInputChange}
          />
          {validateCreate().duration && <span>Error de validación</span>}
        </div>
        <div className="temporada">
          <label htmlFor="season">Temporada:</label>
          <select
            id="season"
            name="season"
            value={activity.season}
            onChange={handleInputChange}
          >
            <option value="">Selecciona una opción</option>
            {temporada.map((tmp, index) => (
              <option value={tmp} key={index}>
                {tmp}
              </option>
            ))}
          </select>
          {validateCreate().season && <span>Error de validación</span>}
        </div>
        <div className="paises">
          {activity.countriesId.map((country, index) => (
            <button key={index} onClick={handleRemoveCountry} value={country}>
              {country}
            </button>
          ))}
          <label>Seleciona Pais</label>
          <select name={activity.countriesId} onChange={handleSelectCountry}>
            <option value="">Seleciona un Pais</option>
            {idCountries.map((id, index) => (
              <option value={id.id} key={index}>
                {id.name}
              </option>
            ))}
          </select>
          {validateCreate().country && <span>Error de validación</span>}
        </div>
        <button type="submit">Crear actividad turística</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCountries: () => dispatch(getCountries()),
    postActivities: (data) => dispatch(postActivities(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);

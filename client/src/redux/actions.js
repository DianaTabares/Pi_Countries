import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const POS_ACTIVITIES = "POS_ACTIVITIES";
export const SEARCH = "SEARCH";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_SORT = "GET_SORT";
export const CONTINENTS = "CONTINENTS";
export const POPULATION = "POPULATION";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";

export function getCountries() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/countries");
      return dispatch({
        type: GET_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postActivities(info) {
  return async function (dispatch) {
    try {
      const { name, difficulty, duration, season, countriesId } = info;
      countriesId.forEach(async (country) => {
        const newActivity = {
          name,
          difficulty,
          duration,
          season,
          country: country,
        };
        try {
          await axios.post("http://localhost:3001/activities", newActivity);
        } catch (error) {
          console.log(error.message);
        }
      });

      const { data } = await axios.get("http://localhost:3001/activities");
      alert("La informacion se guardo exitosamente.");
      return dispatch({
        type: POS_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getCountriesName(name) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/countries", {
        params: { name },
      });
      return dispatch({
        type: SEARCH,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const getSort = (order) => {
  return {
    type: GET_SORT,
    payload: order,
  };
};

export function continent(order) {
  return function (dispatch) {
    return dispatch({
      type: CONTINENTS,
      payload: order,
    });
  };
}

export function population(order) {
  return function (dispatch) {
    return dispatch({
      type: POPULATION,
      payload: order,
    });
  };
}

export function filterActivity(order) {
  return function (dispatch) {
    return dispatch({
      type: FILTER_ACTIVITY,
      payload: order,
    });
  };
}

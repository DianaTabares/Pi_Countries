/* eslint-disable no-case-declarations */
import {
  GET_COUNTRIES,
  POS_ACTIVITIES,
  SEARCH,
  GET_ACTIVITIES,
  CONTINENTS,
  POPULATION,
  GET_SORT,
  FILTER_ACTIVITY,
} from "./actions.js";

const initialState = {
  allCountries: [],
  activities: [],
  filterCountries: [],
  filterActivities: [],
  filterContinents: [],
  filterContinentSelect: "",
  filterActivitySelect: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };
    case POS_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        allCountries: action.payload,
      };
    case GET_SORT:
      if (action.payload === "A") {
        if (state.filterCountries.length > 0) {
          const ordenAlfaA = [...state.filterCountries].sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          return {
            ...state,
            filterCountries: ordenAlfaA,
          };
        }
        const ordenAlfaA = [...state.allCountries].sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        return {
          ...state,
          allCountries: ordenAlfaA,
        };
      }
      if (action.payload === "D") {
        if (state.filterCountries.length > 0) {
          const ordenAlfaD = [...state.filterCountries].sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
          return {
            ...state,
            filterCountries: ordenAlfaD,
          };
        }
        const ordenAlfaD = [...state.allCountries].sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
        return {
          ...state,
          allCountries: ordenAlfaD,
        };
      }
      return state;
    case POPULATION:
      if (action.payload === "H") {
        if (state.filterCountries.length > 0) {
          const ordePH = [...state.filterCountries].sort(
            (a, b) => b.population - a.population
          );
          return {
            ...state,
            filterCountries: ordePH,
          };
        }
        const ordePH = [...state.allCountries].sort(
          (a, b) => b.population - a.population
        );
        return {
          ...state,
          allCountries: ordePH,
        };
      }
      if (action.payload === "L") {
        if (state.filterCountries.length > 0) {
          const orderPL = [...state.filterCountries].sort(
            (a, b) => a.population - b.population
          );
          return {
            ...state,
            filterCountries: orderPL,
          };
        }
        const orderPL = [...state.allCountries].sort(
          (a, b) => a.population - b.population
        );
        return {
          ...state,
          allCountries: orderPL,
        };
      }
      return state;
    case CONTINENTS:
      if (action.payload !== "All") {
        if (state.filterActivitySelect) {
          const filter = state.filterActivities.filter((country) =>
            country.continent.includes(action.payload)
          );
          const filterCountries = state.allCountries.filter((country) =>
            country.continent.includes(action.payload)
          );
          return {
            ...state,
            filterCountries: filter,
            filterContinentSelect: action.payload,
            filterContinents: filterCountries,
          };
        }
        const filter = state.allCountries.filter((country) =>
          country.continent.includes(action.payload)
        );
        return {
          ...state,
          filterCountries: filter,
          filterContinents: filter,
          filterContinentSelect: action.payload,
        };
      } else if (
        action.payload === "All" &&
        state.filterActivitySelect.length > 0
      ) {
        return {
          ...state,
          filterCountries: state.filterActivities,
          filterContinentSelect: "",
        };
      } else if (action.payload === "All") {
        console.log(action.payload);
        return {
          ...state,
          filterCountries: state.filterActivities,
          filterContinentSelect: "",
        };
      }
      return state;
    case FILTER_ACTIVITY:
      if (action.payload === "All" && state.filterContinentSelect.length > 0) {
        return {
          ...state,
          filterCountries: state.filterContinents,
          filterActivitySelect: "",
        };
      } else if (state.filterContinentSelect) {
        const filterActivity = state.filterContinents.filter((country) => {
          const countryActivities = country.activities.filter(
            (activity) => activity.name === action.payload
          );
          return countryActivities.length > 0;
        });
        return {
          ...state,
          filterCountries: filterActivity,
        };
      } else if (action.payload === "All") {
        return {
          ...state,
          filterCountries: [],
          filterContinentSelect: "",
        };
      }
      const filterActivity = state.allCountries.filter((country) => {
        const countryActivities = country.activities.filter(
          (activity) => activity.name === action.payload
        );
        return countryActivities.length > 0;
      });
      return {
        ...state,
        filterCountries: filterActivity,
        filterActivities: filterActivity,
        filterActivitySelect: action.payload,
      };
    default:
      return state;
  }
}
export default rootReducer;

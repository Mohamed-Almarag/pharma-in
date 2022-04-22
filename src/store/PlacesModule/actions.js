import { getMethods } from "@/axios/helpers";
export default {
  getAllCountries({ commit }, country_id) {
    getMethods("country", {
      columns: ["active", "country_id"],
      operand: ["=", "="],
      column_values: [1, country_id],
    }).then((response) => {
      commit("GET_COUNTRIES", response.data.data.data);
    });
  },

  getAllCities({ commit }, city_id) {
    getMethods("cities", {
      columns: ["active", "city_id"],
      operand: ["=", "="],
      column_values: [1, city_id],
    }).then((response) => {
      commit("GET_CITIES", response.data.data.data);
    });
  },
};

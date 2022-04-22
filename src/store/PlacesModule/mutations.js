export default {
  GET_COUNTRIES(state, country) {
    return (state.countries = country);
  },
  GET_CITIES(state, city) {
    return (state.cities = city);
  },
};

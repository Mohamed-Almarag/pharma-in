export default {
  ADD_COMPANY_RATE(state, rate) {
    return (state.rate = rate);
  },
  GET_ALL_RATINGS(state, allUserRatings) {
    return (state.allUserRatings = allUserRatings);
  },
};

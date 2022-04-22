export default {
  ADD_COMPANY_REWIEW(state, review) {
    return (state.review = review);
  },
  GET_ALL_REVIEWS(state, allReviews) {
    return (state.allReviews = allReviews);
  },
};

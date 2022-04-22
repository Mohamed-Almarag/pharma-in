export default {
  LOG_OUT(state) {
    return state.token == null && state.user == null;
  },
};

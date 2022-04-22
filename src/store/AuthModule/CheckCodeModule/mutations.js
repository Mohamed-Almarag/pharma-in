export default {
  CHECK_USER_CODE(state) {
    return state.email && state.code;
  },
};

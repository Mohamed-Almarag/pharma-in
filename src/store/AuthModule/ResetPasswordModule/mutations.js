export default {
  RESET_USER_PASSWORD(state) {
    return state.password && state.passwordConfirmation && state.code;
  },
};

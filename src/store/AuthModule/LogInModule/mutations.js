export default {
  SET_USER_AUTHENTICATION(state, user) {
    return (state.user = user);
  },
  SET_TOKEN(state, token) {
    return (state.token = token);
  },
  SIGN_IN_ERRORS_MESSAGES(state, signInErrors) {
    return (state.signInErrors = signInErrors);
  },
  LOG_OUT(state) {
    return state.token == null && state.user == null;
  },
};

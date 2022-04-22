export default {
  logout({ commit }) {
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
    commit("LOG_OUT");
  },
};

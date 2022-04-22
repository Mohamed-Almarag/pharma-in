import { postMethods } from "@/axios/helpers";

export default {
  async signIn({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("auth/login", payload)
        .then((response) => {
          if (response.status == 200) {
            let userData = response.data.data.user;
            commit("SET_USER_AUTHENTICATION", response);
            commit("SET_TOKEN", response.data.data.access_token);
            localStorage.setItem("token", response.data.data.access_token);
            localStorage.setItem("user-data", JSON.stringify(userData));
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logOut({ commit }) {
    localStorage.removeItem("token");
    localStorage.removeItem("user-data");
    commit("LOG_OUT");
  },
};

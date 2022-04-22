import { postMethods } from "@/axios/helpers";

export default {
  async signUp({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("auth/register", payload)
        .then((response) => {
          if (response.status == 200) {
            commit("SET_USER_AUTHENTICATION", response.data.data.data);
            commit("SUCCESS_AUTHENTICATED", response.data.success);
          }
          resolve(response);
        })
        .catch((error) => {
          commit("SIGN_UP_ERRORS_MESSAGES", error.response.data);
          reject(error);
        });
    });
  },
};

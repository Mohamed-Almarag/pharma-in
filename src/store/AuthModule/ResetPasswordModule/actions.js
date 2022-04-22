import { postMethods } from "@/axios/helpers";

export default {
  reserUserPassword({ commit }, payload) {
    postMethods("auth/reset", payload)
      .then((response) => {
        commit("RESET_USER_PASSWORD", response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

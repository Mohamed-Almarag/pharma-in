import { postMethods } from "@/axios/helpers";

export default {
  async forgotPassword({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("auth/forgot", payload)
        .then((response) => {
          commit("SEND_MESSAGE_TO_EMAIL", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

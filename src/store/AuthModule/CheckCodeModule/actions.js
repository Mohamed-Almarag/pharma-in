import { postMethods } from "@/axios/helpers";

export default {
  async checkUserCode({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("auth/checkcode", payload)
        .then((response) => {
          commit("CHECK_USER_CODE", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

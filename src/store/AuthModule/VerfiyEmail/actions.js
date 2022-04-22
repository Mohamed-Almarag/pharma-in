import { postMethods } from "@/axios/helpers";

export default {
  async checkVerfiyEmail({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("auth/checkemail", payload)
        .then((response) => {
          commit("VERFIY_EMAIL", response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  },
  async checkVerfiyEmailAndCode({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("auth/checkemail", payload)
        .then((response) => {
          commit("VERFIY_EMAIL_CODE", response);
          resolve(response);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  },
};

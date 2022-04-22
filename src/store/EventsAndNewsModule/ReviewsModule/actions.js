import { postMethods, getMethods } from "@/axios/helpers";

export default {
  async addCompanyReview({ commit }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("comment", payload)
        .then((response) => {
          commit("ADD_COMPANY_REWIEW", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getAllReviews({ commit }, payload) {
    await getMethods("comment", {
      limit: 5,
      columns: ["commentable_type", "commentable_id"],
      operand: ["=", "="],
      column_values: payload,
    }).then((response) => {
      commit("GET_ALL_REVIEWS", response.data.data.data);
    });
  },
};

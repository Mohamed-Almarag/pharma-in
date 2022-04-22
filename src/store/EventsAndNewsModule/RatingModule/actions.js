import { postMethods, getMethods } from "@/axios/helpers";

export default {
  async addCompanyRate({ commit }, payload) {
    return await postMethods("rate", payload).then((response) => {
      commit("ADD_COMPANY_RATE", response.data);
    });
  },
  getAllRatings({ commit }, payload) {
    getMethods("rate", {
      limit: 5,
      columns: ["commentable_type", "commentable_id"],
      operand: ["=", "="],
      column_values: payload,
    }).then((response) => {
      commit("GET_ALL_RATINGS", response.data.data.data);
    });
  },
};

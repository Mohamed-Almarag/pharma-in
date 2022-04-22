import { getMethods, postMethods } from "@/axios/helpers";

export default {
  async getAllNews({ commit }, limit) {
    await getMethods("news", {
      limit: limit,
      sort: "asc",
    }).then((response) => {
      commit("GET_ALL_NEWS", response.data.data.data);
    });
  },

  async getSingleNews({ commit }, newsId) {
    await getMethods(`news/${newsId}`).then((response) => {
      console.log(response.data.data.data);
      commit("GET_SINGLE_News", response.data.data.data);
    });
  },
  async getCommonNews({ commit }) {
    await getMethods("news", {
      limit: 3,
      field: "visit",
      sort: "desc",
    }).then((response) => {
      commit("GET_COMMON_NEWS", response.data.data.data);
    });
  },
  async getRelatedNews({ commit }, id) {
    await getMethods("news", {
      limit: 5,
      columns: ["type_id"],
      operand: ["="],
      column_values: [id],
    }).then((response) => {
      console.log(response.data.data.data);
      commit("GET_RELATED_NEWS", response.data.data.data);
    });
  },
  async calculateVisitedTimes({ commit }, payload) {
    await postMethods("visit", payload).then((response) => {
      commit("CALCULATE_VISITED_TIME", response.data.data.data);
    });
  },
};

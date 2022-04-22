import { getMethods, postMethods } from "@/axios/helpers";

export default {
  async getPublishedJobs({ commit }, limit) {
    return await new Promise((resolve, reject) => {
      getMethods("job", {
        limit: limit,
        sort: "desc",
        columns: ["status"],
        operand: ["="],
        column_values: ["published"],
      })
        .then((response) => {
          commit("GET_PUBLISHED_JOBS", response.data.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  async getJobDetails({ commit }, jobId) {
    await getMethods(`job/${jobId}`).then((response) => {
      commit("GET_EVERY_JOB_DETAILS", response.data.data.data);
    });
  },

  async getTopRatedJobs({ commit }) {
    await getMethods("job", {
      limit: 3,
      field: "rate",
    }).then((response) => {
      commit("GET_TOP_RATED_JOBS", response.data.data.data);
    });
  },

  async getSimilarJobs({ commit }, id) {
    await getMethods("job", {
      limit: 5,
      columns: ["type_id", "status"],
      operand: ["=", "="],
      column_values: [id, "published"],
    }).then((response) => {
      commit("GET_SIMILAR_JOBS", response.data.data.data);
    });
  },

  async applyForJob({ commit }, jobId) {
    return await new Promise((resolve, reject) => {
      postMethods("applyJob", jobId)
        .then((response) => {
          commit("APPLY_FOR_JOB", response.data.data.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getCompanyDetails({ commit }, id) {
    await getMethods(`getoneuser/${id}`).then((response) => {
      commit("COMPANY_DETAILS", response.data.data.data);
    });
  },
};

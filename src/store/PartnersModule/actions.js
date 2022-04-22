import { getMethods } from "@/axios/helpers";

export default {
  getPartners({ commit }) {
    getMethods("partners").then((response) => {
      commit("GET_PARTNERS", response.data.data.data);
    });
  },
};

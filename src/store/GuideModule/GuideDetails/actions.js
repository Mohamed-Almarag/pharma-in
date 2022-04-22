import { getMethods } from "@/axios/helpers";
export default {
  async getGuideDetails({ commit }, guideType) {
    await getMethods("company", {
      columns: ["companies_guide"],
      operand: ["="],
      column_values: [guideType],
    }).then((response) => {
      commit("GET_GUIDE_HOSPITALS", response.data.data.data);
    });
  },
  async getTopMedicine({ commit }) {
    await getMethods("company", {
      field: "rate",
      limit: 5,
    }).then((response) => {
      commit("GET_TOP_MEDICINE", response.data.data.data);
    });
  },
  async getSingleCompany({ commit }, companyId) {
    await getMethods(`company/${companyId}`).then((response) => {
      commit("GET_SINGLE_GIUDE_DETAILS", response.data.data.data);
    });
  },
};

import { getMethods } from "@/axios/helpers";
export default {
  getSliderContent({ commit }) {
    getMethods("company", {
      field: "rate",
      limit: 3,
    }).then((response) => {
      commit("GET_SLIDER_CONTENT", response.data.data.data);
    });
  },
};

import { getMethods, postMethods } from "@/axios/helpers";
export default {
  async phrmaInfo({ commit }) {
    await getMethods("info", { limit: 100 }).then((response) => {
      commit("PHARMA_INFO", response.data.data.data);
      let websiteInfo = response.data.data.data;
      localStorage.setItem("website-info", JSON.stringify(websiteInfo));
    });
  },
  async sendContactMessage({ commit }, payload) {
    await postMethods("contacts", payload).then((response) => {
      commit("SEND_CONTACT_MESSAGE", response.data.data.data);
    });
  },
};

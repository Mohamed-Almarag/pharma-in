import { getMethods, postMethods } from "@/axios/helpers";

export default {
  async getAllEvents({ commit }, limit) {
    await getMethods("event", {
      limit: limit,
      sort: "asc",
    }).then((response) => {
      commit("GET_All_EVENTS", response.data.data.data);
    });
  },
  async getSingleEvent({ commit }, eventId) {
    await getMethods(`event/${eventId}`).then((response) => {
      commit("GET_SINGLE_EVENT", response.data.data.data);
    });
  },

  async getVisitedevents({ commit }) {
    await getMethods("event", {
      limit: 3,
      field: "visit",
      sort: "desc",
    }).then((response) => {
      commit("GET_VISITED_EVENT", response.data.data.data);
    });
  },
  async getRelatedvents({ commit }, id) {
    await getMethods("event", {
      limit: 5,
      columns: ["type_id"],
      operand: ["="],
      column_values: [id],
    }).then((response) => {
      commit("GET_RELATED_EVENTS", response.data.data.data);
    });
  },
  async calculateVisitedTimes({ commit }, payload) {
    await postMethods("visit", payload).then((response) => {
      commit("CALCULATE_VISITED_TIME", response.data.data.data);
    });
  },
  // getEventComments(){

  // }
};

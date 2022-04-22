import { getMethods, postMethods } from "@/axios/helpers";
// import { reject, resolve } from "core-js/fn/promise";
export default {
  async getSliderContent({ commit }) {
    await getMethods("Courses", {
      field: "rate",
      limit: 20,
    }).then((response) => {
      commit("GET_SLIDER_CONTENT", response.data.data.data);
    });
  },

  async getCoursesData({ commit }, courseType) {
    await getMethods("Courses", {
      columns: ["pay_type", "status"],
      operand: ["=", "="],
      column_values: [courseType, "active"],
    }).then((response) => {
      commit("GET_EVERY_CAROUSEL_DATA", response.data.data.data);
    });
  },

  async getSimilarCourses({ commit }, id) {
    await getMethods("Courses", {
      limit: 5,
      columns: ["type_id", "status"],
      operand: ["=", "="],
      column_values: [id, "active"],
    }).then((response) => {
      commit("GET_SAME_COURSE", response.data.data.data);
    });
  },

  async getSingleCourseData({ commit }, CourseId) {
    await getMethods(`Courses/${CourseId}`).then((response) => {
      commit("GET_SINGLE_COURSE_DETAILS", response.data.data.data);
    });
  },

  async apllayCourse({ commit, state }, payload) {
    return await new Promise((resolve, reject) => {
      postMethods("ApplyCourses", payload)
        .then((response) => {
          commit("APPLAY_COURSE", response.data.data.data);
          state.applaiedMessage = response.data.message;
          console.log(response.message);
          if (response.code == 400) {
            console.log("400 heer");
          } else {
            console.log("error in response");
          }
          if (response.status == 400) {
            console.log("ahmed othman");
          }
          console.log(response);
          console.log(state.applaiedMessage);
          console.log(response.status);
          resolve(response);
        })
        .catch((error) => {
          // commit("ERRORS", response.data.data.data);
          // console.log(error);
          commit("ERRORS", error.response);
          console.log(error.response);
          console.log(error.status);
          // if (error !== undefined) {
          //   console.log(error.response.errors);
          // }
          reject(error);
        });
    });
  },

  // User Applied Courses
  async getUserAppliedCourses({ commit }) {
    let UserId = JSON.parse(localStorage.getItem("user-data")).id;
    await getMethods("ApplyCourses", {
      columns: ["user_id"],
      operand: ["="],
      column_values: [UserId],
    }).then((response) => {
      commit("GET_USER_APPLIED_COURSES", response.data.data.data);
    });
  },

  async getCourseLessons({ commit }) {
    await getMethods("Section").then((response) => {
      console.log(response.data.data.data);
      commit("GET_COURSE_LESSONS", response.data.data.data);
    });
  },

  async getSingleCourseLesson({ commit }, courseId) {
    await getMethods(`lesson/${courseId}`).then((response) => {
      commit("GET_SINGLE_COURSE_LESSONS", response.data.data.data);
    });
  },
  async getEveryCourseSingleLesson({ commit }, singleCourseId) {
    await getMethods(`lesson/${singleCourseId}`).then((response) => {
      console.log(response.data.data.data);
      commit("GET_EVERY_COURSE_SINGLE_LESSON", response.data.data.data);
    });
  },
};

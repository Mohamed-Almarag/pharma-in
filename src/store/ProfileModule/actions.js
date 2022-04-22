import { getMethods, postMethods, deleteMethods } from "@/axios/helpers";
export default {
  async getUserInformation({ commit }) {
    await getMethods("user").then((response) => {
      console.log(response.data.data);
      commit("GET_USER", response.data.data);
    });
  },

  async setUserPortfolioData({ commit, state }, payload) {
    await postMethods("userPortfolio", payload).then((response) => {
      commit("SET_USER_PORTFOLIO_DATA", response.data.data);
      state.getPortofolioId = response.data.data.id;
    });
  },

  async getUserPortfolioDataToEdit({ commit }, id) {
    return await getMethods(`userPortfolio/${id}`).then((res) => {
      console.log(res.data.data.data);
      commit("SET_SINGLE_PORTFOLIO_DATA", res.data.data.data);
    });
  },

  // Start All User {Education} Crud [ Add, Edit, Update, Delete] *******
  async getUserEducationLists({ commit }) {
    await getMethods("education").then((response) => {
      commit("GET_USER_EDUCATION_LIST", response.data.data.data);
    });
  },
  async setUserEducation({ commit, state }, payload) {
    return await postMethods("education", payload).then((response) => {
      console.log(payload);
      commit("GET_USER_EDUCATION_LIST", [
        ...state.userEducationLists,
        response.data.data,
      ]);
    });
  },

  getSingleEducationToEdit({ state }, itemId) {
    const educationItem = state.userEducationLists.find(
      (item) => item.id == itemId
    );
    return educationItem
      ? Promise.resolve(educationItem)
      : getMethods(`education/${itemId}`);
  },

  async editUserEducation({ commit }, payload) {
    await postMethods(`education/${payload.id}`, payload.data).then(
      (response) => {
        commit("SET_USER_EDUCATION_DATA", response.data.data);
      }
    );
  },

  async deleteSingleEducation({ state, commit }, educationId) {
    return await deleteMethods("education/bulkDelete", {
      ids: [educationId],
    }).then(() => {
      commit(
        "GET_USER_EDUCATION_LIST",
        state.userEducationLists.filter((item) => item.id != educationId)
      );
    });
  },
  // End All User Education Crud [ Add, Edit, Update, Delete]

  // Start All User {Experience} Crud [ Add, Edit, Update, Delete] *******
  async getUserExperienceLists({ commit }) {
    await getMethods("experience", {
      limit: 2,
    }).then((response) => {
      commit("GET_USER_EXPERINCE_LIST", response.data.data.data);
    });
  },

  async setUserExperience({ commit, state }, payload) {
    return await postMethods("experience", payload).then((response) => {
      commit("GET_USER_EXPERINCE_LIST", [
        ...state.userExperienceLists,
        response.data.data,
      ]);
    });
  },

  getSingleExperienceToEdit({ state }, itemId) {
    const experienceItem = state.userExperienceLists.find(
      (item) => item.id == itemId
    );
    return experienceItem
      ? Promise.resolve(experienceItem)
      : getMethods(`experience/${itemId}`);
  },

  async editUserExperience({ commit }, payload) {
    await postMethods(`experience/${payload.id}`, payload.data).then(
      (response) => {
        commit("SET_USER_EXPERINCE_DATA", response.data.data);
      }
    );
  },

  async deleteSingleExperience({ state, commit }, experienceId) {
    return await deleteMethods("experience/bulkDelete", {
      ids: [experienceId],
    }).then(() => {
      commit(
        "GET_USER_EXPERINCE_LIST",
        state.userExperienceLists.filter((item) => item.id != experienceId)
      );
    });
  },
  // End All User Experience Crud [ Add, Edit, Update, Delete]

  // User Applied Jobs
  async getUserAppliedJobs({ commit }) {
    let UserId = JSON.parse(localStorage.getItem("user-data")).id;
    await getMethods("applyJob", {
      columns: ["user_id"],
      operand: ["="],
      column_values: [UserId],
    }).then((response) => {
      console.log(response.data.data.data);
      commit("GET_USER_APPLIED_JOBS", response.data.data.data);
    });
  },

  // All Things About Company Jobs
  async getCompanyJobsLists({ commit }) {
    let UserId = JSON.parse(localStorage.getItem("user-data")).id;
    await getMethods("job", {
      columns: ["user_id"],
      operand: ["="],
      column_values: [UserId],
    }).then((response) => {
      commit("GET_COMPANY_JOBS_LIST", response.data.data.data);
    });
  },

  async setAnewCompanyJob({ commit, state }, payload) {
    return await postMethods("job", payload).then((response) => {
      commit("GET_COMPANY_JOBS_LIST", [
        ...state.companyJobsLists,
        response.data.data,
      ]);
    });
  },

  getJobToEdit({ state }, jobId) {
    const justOneJob = state.companyJobsLists.find((item) => item.id == jobId);
    return justOneJob
      ? Promise.resolve(justOneJob)
      : getMethods(`job/${jobId}`);
  },

  async editJob({ commit }, payload) {
    await postMethods(`job/${payload.id}`, payload.data).then((response) => {
      commit("SET_A_NEW_COMPANY_JOB", response.data.data);
    });
  },

  async deleteJob({ state, commit }, jobId) {
    return await deleteMethods("job/bulkDelete", {
      ids: [jobId],
    }).then(() => {
      commit(
        "GET_COMPANY_JOBS_LIST",
        state.companyJobsLists.filter((item) => item.id != jobId)
      );
    });
  },

  async changeProfieImage({ commit }, image) {
    await postMethods("profileImage", image).then((response) => {
      let userData = JSON.parse(localStorage.getItem("user-data"));
      let someChangesInUserData = Object.assign({}, userData, {
        image: response.data.data.image,
      });

      localStorage.setItem("user-data", JSON.stringify(someChangesInUserData));
      commit("CHANGE_USER_PROFILE_IMAGE", response.data.data.image);
    });
  },

  // for company when user type == company [create , edit, etc]
  async setAnewCompany({ commit }, payload) {
    return await postMethods("companyDetails", payload).then((response) => {
      commit("SET_A_NEW_COMPANY", response.data.data.data);
    });
  },
  // async getAllCompanies({ commit }) {
  //   return await getMethods("companyDetails",{

  //   }).then((response) => {
  //     console.log(response.data.data.data);
  //     commit("GET_ALL_COMPANIES", response.data.data.data);
  //   });
  // },

  // user profile informtion and change password
  async changePersonalInformation({ commit }, payload) {
    return await postMethods("profile", payload).then((response) => {
      let userData = JSON.parse(localStorage.getItem("user-data"));
      let someChangesInUserData = Object.assign({}, userData, {
        name: response.data.data.name,
        email: response.data.data.email,
        phone: response.data.data.phone,
      });
      localStorage.setItem("user-data", JSON.stringify(someChangesInUserData));
      commit("CHANGE_PERSONAL_INFORMATION", response.data.data);
    });
  },
  async changePassword({ commit }, payload) {
    return await postMethods("changePassword", payload).then((response) => {
      commit("CHANGE_PASSWORD", response.data);
    });
  },
};

export default {
  GET_USER(state, user) {
    return (state.user = user);
  },

  GET_ALL_PORTFOLIO_DATA(state, data) {
    return (state.allPortfolioInformations = data);
  },
  SET_USER_PORTFOLIO_DATA(state, data) {
    return (state.setportfolioDetails = data);
  },
  SET_SINGLE_PORTFOLIO_DATA(state, data) {
    return (state.getSinglePortfolioDetails = data);
  },

  // User Education
  GET_USER_EDUCATION_LIST(state, education) {
    return (state.userEducationLists = education);
  },
  SET_USER_EDUCATION_DATA(state, education) {
    return (state.setUserEducation = education);
  },
  GET_SINGLE_EDUCATION_ITEM(state, education) {
    return (state.singleEducationItem = education);
  },

  // User Experince
  GET_USER_EXPERINCE_LIST(state, experince) {
    return (state.userExperienceLists = experince);
  },
  SET_USER_EXPERINCE_DATA(state, experince) {
    return (state.setUserExperience = experince);
  },
  GET_SINGLE_EXPERINCE_ITEM(state, experince) {
    return (state.singleExperienceItem = experince);
  },

  // User Applied Jobs
  GET_USER_APPLIED_JOBS(state, job) {
    return (state.appliedJobs = job);
  },

  // Company Jobs
  GET_COMPANY_JOBS_LIST(state, jobs) {
    return (state.companyJobsLists = jobs);
  },
  SET_A_NEW_COMPANY_JOB(state, job) {
    return (state.setAnewJob = job);
  },

  // for company when user type == company [create , edit, etc]
  SET_A_NEW_COMPANY(state, company) {
    return (state.setAnewCompany = company);
  },
  // GET_ALL_COMPANIES(state, companies) {
  //   return (state.getCompanies = companies);
  // },

  // user profile informtion and change password
  CHANGE_USER_PROFILE_IMAGE(state, image) {
    return (state.userImage = image);
  },
  CHANGE_PERSONAL_INFORMATION(state, information) {
    return (state.userInformation = information);
  },
  CHANGE_PASSWORD(state, newPassword) {
    return (state.changePassword = newPassword);
  },
};

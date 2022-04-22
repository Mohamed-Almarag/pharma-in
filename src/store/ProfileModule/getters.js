export default {
  user: (state) => state.user,
  allPortfolioInformations: (state) => state.allPortfolioInformations,
  setportfolioDetails: (state) => state.setportfolioDetails,
  getSinglePortfolioDetails: (state) => state.getSinglePortfolioDetails,

  // user Education
  userEducationLists: (state) => state.userEducationLists,
  setUserEducation: (state) => state.setUserEducation,
  singleEducationItem: (state) => state.singleEducationItem,

  // user Experince
  userExperienceLists: (state) => state.userExperienceLists,
  setUserExperience: (state) => state.setUserExperience,
  singleExperienceItem: (state) => state.singleExperienceItem,

  // User Applied Jobs
  appliedJobs: (state) => state.appliedJobs,

  // Company Jobs
  companyJobsLists: (state) => state.companyJobsLists,
  setAnewJob: (state) => state.setAnewJob,

  // for company when user type == company [create , edit, etc]
  setAnewCompany: (state) => state.setAnewCompany,
  // getCompanies: (state) => state.getCompanies,

  // user profile informtion and change password
  userImage: (state) => state.userImage,
  userInformation: (state) => state.userInformation,
  changePassword: (state) => state.changePassword,
};

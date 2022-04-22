export default {
  GET_PUBLISHED_JOBS(state, publishedJobs) {
    return (state.publishedJobs = publishedJobs);
  },
  GET_ALL_JOBS(state, jobs) {
    return (state.allJobs = jobs);
  },
  GET_EVERY_JOB_DETAILS(state, details) {
    return (state.everyJobDetails = details);
  },
  GET_TOP_RATED_JOBS(state, topRated) {
    return (state.topRatedJobs = topRated);
  },
  GET_SIMILAR_JOBS(state, job) {
    return (state.similarJobs = job);
  },
  APPLY_FOR_JOB(state, job) {
    return (state.applyForJob = job);
  },
  COMPANY_DETAILS(state, details) {
    return (state.companyDetails = details);
  },
};

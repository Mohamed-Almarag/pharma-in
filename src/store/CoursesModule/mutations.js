export default {
  GET_SLIDER_CONTENT(state, content) {
    return (state.courseSliderContent = content);
  },
  GET_EVERY_CAROUSEL_DATA(state, data) {
    return (state.allCourses = data);
  },
  GET_SINGLE_COURSE_DETAILS(state, data) {
    return (state.singleCourseDetalis = data);
  },
  GET_SAME_COURSE(state, data) {
    return (state.sameCourses = data);
  },
  APPLAY_COURSE(state, data) {
    return (state.applayCourse = data);
  },
  GET_USER_APPLIED_COURSES(state, course) {
    return (state.appliedCourses = course);
  },
  GET_COURSE_LESSONS(state, lesson) {
    return (state.lessons = lesson);
  },
  GET_SINGLE_COURSE_LESSONS(state, lesson) {
    return (state.singleLesson = lesson);
  },
  ERRORS(state, error) {
    return (state.errors = error);
  },
};

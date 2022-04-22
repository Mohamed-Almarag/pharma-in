import Vue from "vue";

Vue.filter("justSpecificWords", function (v) {
  return v.substring(0, 90);
});
Vue.filter("justSpecificWordsHeading", function (v) {
  return v.substring(0, 10) + " ...";
});
Vue.filter("forPopularEventsAndNews", function (v) {
  return v.substring(0, 110);
});

Vue.filter("littelWords", function (v) {
  return v.substring(0, 50) + " ...";
});

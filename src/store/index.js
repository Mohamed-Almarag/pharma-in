import Vue from "vue";
import Vuex from "vuex";

import partners from "./PartnersModule/index";
import places from "./PlacesModule/index";
import auth from "./AuthModule/index";
import EventsAndNewsModule from "./EventsAndNewsModule/index";
import GuideModule from "./GuideModule/index";
import JobsModule from "./JobsModule/index";
import ProfileModule from "./ProfileModule/index";
import CoursesModule from "./CoursesModule/index";
import SocialModule from "./SocialModule/index";
import WebsiteInfo from "./WebsiteInfo/index";

Vue.use(Vuex);

// The Main Index In Vuex Store

export default new Vuex.Store({
  namespaced: true,
  state: {
    userDetails: {},
  },
  mutations: {},
  actions: {},
  modules: {
    partners,
    places,
    auth,
    EventsAndNewsModule,
    GuideModule,
    JobsModule,
    ProfileModule,
    CoursesModule,
    SocialModule,
    WebsiteInfo,
  },
});

// The Main Index In Vuex Store

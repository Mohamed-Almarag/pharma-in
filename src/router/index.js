import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import services from "../middleware/services";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: () => import(/* webpackChunkName: "jobs" */ "@/views/Jobs.vue"),
    meta: { requiresAuth: true, services },
  },
  {
    path: "/jobs/all-jobs",
    name: "AllJobs",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/components/Jobs/AllJobs.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/jobs/all-jobs/:id",
    name: "JobDetails",
    component: () =>
      import(/* webpackChunkName: "jobs" */ "@/components/Jobs/JobDetails.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses",
    name: "Courses",
    component: () =>
      import(/* webpackChunkName: "courses" */ "@/views/Courses.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses/all-courses",
    name: "CoursesPage",
    component: () =>
      import(
        /* webpackChunkName: "courses" */ "@/components/Courses/CoursesPage.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses/all-courses/:id",
    name: "CourseDetails",
    component: () =>
      import(
        /* webpackChunkName: "CourseDetails" */ "@/components/Courses/CourseDetails.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses/all-courses/:id/lessons",
    name: "LessonsLists",
    component: () =>
      import(
        /* webpackChunkName: "CourseDetails" */ "@/components/Courses/LessonsLists.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/courses/all-courses/:id/lessons/:title",
    name: "SingleLesson",
    component: () =>
      import(
        /* webpackChunkName: "CourseDetails" */ "@/components/Courses/SingleLesson.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/guide",
    name: "Guide",
    component: () =>
      import(/* webpackChunkName: "guide" */ "@/views/Guide.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/guide/all-guides",
    name: "AllGuides",
    component: () =>
      import(
        /* webpackChunkName: "guide" */ "@/components/Guide/GuideTypes/AllGuides.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/guide/all-guides/:id",
    name: "Details",
    component: () =>
      import(
        /* webpackChunkName: "Details" */ "@/components/Guide/GuideTypes/Details.vue"
      ),
    meta: { requiresAuth: true },
  },

  {
    path: "/events-and-news",
    name: "EventsAndNews",
    component: () =>
      import(
        /* webpackChunkName: "EventsAndNews" */ "@/views/EventsAndNews.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/events-and-news/all-events",
    name: "AllEvents",
    component: () =>
      import(
        /* webpackChunkName: "AllEvents" */ "@/components/EventsAndNews/Types/AllEvents.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/events-and-news/all-events/:id",
    name: "EventDetails",
    component: () =>
      import(
        /* webpackChunkName: "EventDetails" */ "@/components/EventsAndNews/Types/EventDetails.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/events-and-news/all-news",
    name: "AllNews",
    component: () =>
      import(
        /* webpackChunkName: "AllNews" */ "@/components/EventsAndNews/Types/AllNews.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/events-and-news/all-news/:id",
    name: "NewsDetails",
    component: () =>
      import(
        /* webpackChunkName: "NewsDetails" */ "@/components/EventsAndNews/Types/NewsDetails.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/registration",
    name: "Registration",
    component: () =>
      import(/* webpackChunkName: "Registration" */ "@/views/Registration.vue"),
  },
  {
    path: "/forgot-reset-change-password",
    name: "Forgot_Reset_Change_Password",
    component: () =>
      import(
        /* webpackChunkName: "Forgot_Reset_Change_Password" */ "@/views/Forgot_Reset_Change_Password.vue"
      ),
  },
  {
    path: "/choose-type",
    name: "Signup",
    component: () =>
      import(
        /* webpackChunkName: "Signup" */ "@/components/Registration/Signup.vue"
      ),
  },
  {
    path: "/registration/customer",
    name: "SignUpCustomer",
    component: () =>
      import(
        /* webpackChunkName: "SignUpCustomer" */ "@/components/Registration/SignUpCustomer.vue"
      ),
  },
  {
    path: "/registration/company",
    name: "SignUpCompany",
    component: () =>
      import(
        /* webpackChunkName: "SignUpCompany" */ "@/components/Registration/SignUpCompany.vue"
      ),
  },
  {
    path: "/registration/forget-password",
    name: "ForgetPassword",
    component: () =>
      import(
        /* webpackChunkName: "ForegetPassword" */ "@/components/Registration/ForgetPassword.vue"
      ),
  },
  {
    path: "/verify-email",
    name: "VerifyEmail",
    component: () =>
      import(
        /* webpackChunkName: "ForegetPassword" */ "@/components/Registration/VerifyEmail.vue"
      ),
  },
  {
    path: "/verify-email-code",
    name: "VerifyCodeEmail",
    component: () =>
      import(
        /* webpackChunkName: "ForegetPassword" */ "@/components/Registration/VerifyCodeEmail.vue"
      ),
  },
  {
    path: "/registration/check-code",
    name: "CheckCode",
    component: () =>
      import(
        /* webpackChunkName: "CheckCode" */ "@/components/Registration/CheckCode.vue"
      ),
  },
  {
    path: "/registration/reset-password",
    name: "ResetPassword",
    component: () =>
      import(
        /* webpackChunkName: "ResetPassword" */ "@/components/Registration/ResetPassword.vue"
      ),
  },

  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "@/views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/social",
    name: "Social",
    component: () =>
      import(/* webpackChunkName: "Social" */ "@/views/Social.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/freinds",
    name: "Freinds",
    component: () =>
      import(
        /* webpackChunkName: "Freinds" */ "@/components/Social/Freinds.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/other-freinds",
    name: "OtherFreinds",
    component: () =>
      import(
        /* webpackChunkName: "OtherFreinds" */ "@/components/Social/OtherFreinds.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/my-requests",
    name: "MyRequests",
    component: () =>
      import(
        /* webpackChunkName: "MyRequests" */ "@/components/Social/MyRequests.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/friends-requests",
    name: "MyFreindsRequsts",
    component: () =>
      import(
        /* webpackChunkName: "MyFreindsRequsts" */ "@/components/Social/MyFreindsRequsts.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/company-details",
    name: "CompanyDetails",
    component: () =>
      import(
        /* webpackChunkName: "CompanyDetails" */ "@/components/Global/CompanyDetails.vue"
      ),
    meta: { requiresAuth: true },
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: () =>
      import(/* webpackChunkName: "ContactUs" */ "@/views/ContactUs.vue"),
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: () =>
      import(
        /* webpackChunkName: "PrivacyPolicy" */ "@/components/Global/PrivacyPolicy.vue"
      ),
  },
  {
    path: "/cookie-policy",
    name: "CookiePolicy",
    component: () =>
      import(
        /* webpackChunkName: "CookiePolicy" */ "@/components/Global/CookiePolicy.vue"
      ),
  },
  {
    path: "/terms-of-service",
    name: "TermsOfService",
    component: () =>
      import(
        /* webpackChunkName: "TermsOfService" */ "@/components/Global/TermsOfService.vue"
      ),
  },
  {
    path: "/404",
    alias: "*",
    name: "PageNotFound",
    component: () =>
      import(
        /* webpackChunkName: "TermsOfService" */ "@/components/Global/PageNotFound.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.LogInModule.token) {
      next({
        name: "Registration",
      });
    } else if (
      !store.state.auth.LogInModule.token &&
      to.meta.services.checkVerfication()
    ) {
      console.log("is active");
      return router.push({ name: "Home" });
      // next({
      //   name: "Home",
      // });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;

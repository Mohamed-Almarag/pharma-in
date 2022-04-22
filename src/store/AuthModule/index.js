import RegisterModule from "./RegisterModule/index";
import LogInModule from "./LogInModule/index";
import ForgotPasswordModule from "./ForgotPasswordModule/index";
import CheckCodeModule from "./CheckCodeModule/index";
import ResetPasswordModule from "./ResetPasswordModule/index";
import LogoutModule from "./LogoutModule/index";
import VerfiyEmail from "./VerfiyEmail/index";

// The Main Index In Vuex Store

export default {
  namespaced: true,
  modules: {
    RegisterModule,
    LogInModule,
    ForgotPasswordModule,
    CheckCodeModule,
    ResetPasswordModule,
    LogoutModule,
    VerfiyEmail,
  },
};

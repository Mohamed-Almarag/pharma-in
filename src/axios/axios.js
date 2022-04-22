import Vue from "vue";
import axios from "axios";
import router from "../router";
import store from "../store";
const domain = "http://admin.pharmain.net/api/";

const axiosIns = axios.create({
  baseURL: domain,
});

axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 ||
      error.response.data.message === "Un Authorized"
    ) {
      store
        .dispatch("auth/LogoutModule/logout")
        .then(() => {
          router.push("/registration");
        })
        .finally(() => {
          window.location.reload();
        });
    }
  }
),
  (Vue.prototype.$http = axiosIns);
// export const baseUrl = `${domain}`;

export default axiosIns;

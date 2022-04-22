// import { postMethods } from "@/axios/helpers";
import { testingMethods } from "@/axios/helpers";

export default {
  async followingCompany({ commit }, companyId) {
    return await new Promise((resolve, reject) => {
      testingMethods("followCompany", companyId)
        .then((response) => {
          commit("FOLLOW_COMPANY", response.data.data.data);
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  // async followingCompany({ commit }, companyId) {
  //   return await new Promise((resolve, reject) => {
  //     postMethods("followCompany", companyId)
  //       .then((response) => {
  //         commit("FOLLOW_COMPANY", response.data.data.data);
  //         console.log(response);
  //         resolve(response);
  //       })
  //       .catch((errors) => {
  //         console.log(errors);
  //         reject(errors);
  //       });
  //   });
  // },
};

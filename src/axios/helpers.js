import Api from "./axios";
// import router from "@/router";
// 429 >> that means token is expired so you must log in again
// import router from "../router";
// import store from "../store";
// Start Get Helper Mthods
export function getMethods(uri, params) {
  let defultParams = {
    limit: 10,
    offset: 0,
    field: "id",
    // I Changed it from [desc] to [asc] == to start from first index
    sort: "desc",
    resource: "all",
    deleted: "false",
    paginate: "true",
    columns: ["active"],
    operand: ["="],
    column_values: [1],
  };

  if (typeof defultParams !== undefined) {
    defultParams = {
      ...defultParams,
      ...params,
    };
  }

  return new Promise((resolve, reject) => {
    Api.get(`${uri}`, {
      params: {
        ...defultParams,
      },
      headers: {
        language: localStorage.getItem("lang"),
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : "no";
          // if (error.response.status == 401) {
          //   store.dispatch("auth/LogoutModule/logout").then(() => {
          //     // window.location.reload();
          //     alert("you can not access this page without login");
          //     router.push("/registration");
          //   });
          // } else {
          //   console.log("no");
          // }
          error.response.status == 401 //
            ? console.log(error.response.data.message)
            : // router.push("/registration")
              // alert(error.response.data.message)
              "no";
          error.response.status == 404
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 500
            ? console.log(error.response.data.message)
            : "no";
        }

        reject(error);
      });
  });
}
// End Get Helper Mthods

// Start Post Methods
export function postMethods(uri, payload) {
  return new Promise((resolve, reject) => {
    Api.post(`${uri}`, payload, {
      headers: {
        language: localStorage.getItem("lang"),
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        resolve(response);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.response);
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 401
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 404
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 500
            ? console.log(error.response.data.message)
            : "no";
        }
        reject(error);
      });
  });
}
// End Post Methods

// Start Delete Methods
export function deleteMethods(uri, id) {
  return new Promise((resolve, reject) => {
    Api.delete(`${uri}`, {
      params: id,
      headers: {
        language: localStorage.getItem("lang"),
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        if (error.response) {
          error.response.status == 400
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 401
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 404
            ? console.log(error.response.data.message)
            : "no";
          error.response.status == 500
            ? console.log(error.response.data.message)
            : "no";
        }
        reject(error);
      });
  });
}
// End Delete Methods
export function append_Object_Items_ToFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

import axios from "axios";
export function testingMethods(uri, payload) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${uri}`, payload, {
        headers: {
          language: localStorage.getItem("lang"),
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        console.log("response from test helpers");
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response);
        console.log("error helpers");
        reject(error);
      });
  });
}
// axios
//         .post(
//           "http://admin.pharmain.net/api/followCompany",
//           { company_id: id },
//           {
//             headers: {
//               language: localStorage.getItem("lang"),
//               Authorization: "Bearer " + localStorage.getItem("token"),
//               "Content-Type": "application/json",
//               accept: "application/json",
//             },
//           }
//         )
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//           console.log(error.response.data.errors);
//         });

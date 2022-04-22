export default () => ({
  user: {},
  token: localStorage.getItem("token") || "",
  signInErrors: [],
  userDetails: {},
});

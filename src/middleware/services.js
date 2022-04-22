function checkVerfication() {
  let user = JSON.parse(localStorage.getItem("user-data"));
  if (user) {
    // console.log(user.active);
    return user.active != 1;
  }
}

export default checkVerfication();

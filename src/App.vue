<template>
  <div id="app" :class="[{ arabic: isArabic }, { english: isEnglish }]">
    <div id="nav">
      <app-header></app-header>
      <transition name="moveUp">
        <router-view />
      </transition>
      <ScrollToTopButton></ScrollToTopButton>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isArabic: false,
      isEnglish: false,
    };
  },
  mounted() {
    const appContainer = document.getElementById("app");
    let lang = localStorage.getItem("lang");

    if (lang == "en") {
      appContainer.setAttribute("dir", "ltr");
      this.isEnglish = true;
    } else if (lang == "ar") {
      appContainer.setAttribute("dir", "rtl");
      this.isArabic = true;
    } else {
      appContainer.setAttribute("dir", "ltr");
      this.isEnglish = true;
    }

    let userToken = this.$store.state.auth.LogInModule.token;
    if (userToken) {
      let userDataInStorage = JSON.parse(localStorage.getItem("user-data"));
      this.$store.state.userDetails = { ...userDataInStorage };
    }
  },

  // mounted() {
  //   // let dethtml = document.getElementsByTagName("html");
  //   let dethtml = document.getElementById("app");
  //   dethtml.setAttribute("dir", "ltr");
  //   console.log(dethtml);
  // },
  // mounted: function () {
  //   this.$http.interceptors.response.use(undefined, function (err) {
  //     return new Promise(function (resolve, reject) {
  //       if (err.status === 401) {
  //         console.log("resolve");
  //       }
  //       // if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
  //       if (err.status === 401 || err.config || !err.config.__isRetryRequest) {
  //         console.log("resolve");
  //         this.$store.dispatch("auth/LogoutModule/logout").then(() => {
  //           console.log("resolve");
  //           resolve();
  //         });
  //       }
  //       reject(err);
  //       throw err;
  //     });
  //   });
  // },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Cairo&family=El+Messiri&display=swap");
#app {
  // font-family: "Roboto", sans-serif;
}
.english {
  font-family: "Poppins", sans-serif;
}
.arabic {
  font-family: "Cairo", sans-serif;
}

.moveUp-enter-active {
  animation: moveUp 0.5s ease-in;
}

@keyframes moveUp {
  0% {
    transform: translateY(400px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>

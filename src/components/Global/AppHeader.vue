<template>
  <header class="main-header text-uppercase">
    <nav @scroll="handleScroll" class="navbar navbar-expand-lg fixed-top">
      <div class="container">
        <router-link class="navbar-brand" :to="{ name: 'Home' }"
          ><img class="photo" src="@/assets/images/logo/logo.png" alt="logo"
        /></router-link>
        <button
          @click="toggleNavbarClass"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon line-1"></span>
          <span class="navbar-toggler-icon line-2"></span>
          <span class="navbar-toggler-icon line-3"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2">
            <li class="nav-item" :class="{ active: $route.name == 'Home' }">
              <router-link
                :to="{ name: 'Home' }"
                class="nav-link"
                aria-current="page"
                >{{ $t("navbar.home") }}</router-link
              >
            </li>

            <li class="nav-item" :class="{ active: $route.name == 'Jobs' }">
              <router-link :to="{ name: 'Jobs' }" class="nav-link">{{
                $t("navbar.jobs")
              }}</router-link>
            </li>
            <li class="nav-item" :class="{ active: $route.name == 'Courses' }">
              <router-link :to="{ name: 'Courses' }" class="nav-link">{{
                $t("navbar.courses")
              }}</router-link>
            </li>
            <li class="nav-item" :class="{ active: $route.name == 'Guide' }">
              <router-link :to="{ name: 'Guide' }" class="nav-link">{{
                $t("navbar.guide")
              }}</router-link>
            </li>

            <li
              class="nav-item"
              :class="{ active: $route.name == 'EventsAndNews' }"
            >
              <router-link :to="{ name: 'EventsAndNews' }" class="nav-link"
                >{{ $t("navbar.events") }} &amp;
                {{ $t("navbar.news") }}</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.name == 'Social' }">
              <router-link :to="{ name: 'Social' }" class="nav-link">
                {{ $t("navbar.Social") }}</router-link
              >
            </li>
            <li class="nav-item" :class="{ active: $route.name == 'About' }">
              <router-link :to="{ name: 'About' }" class="nav-link">{{
                $t("navbar.about")
              }}</router-link>
            </li>
            <li
              class="nav-item"
              :class="{ active: $route.name == 'ContactUs' }"
            >
              <router-link :to="{ name: 'ContactUs' }" class="nav-link">
                {{ $t("navbar.contact") }}</router-link
              >
            </li>
          </ul>
          <div class="languages-registration">
            <div class="dropdown">
              <button
                class="btn lang-btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <fa icon="globe" />
                <span id="language" class="lang-text">En</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                <li class="items">
                  <a
                    class="dropdown-item active"
                    href="javascript:void(0)"
                    @click="switchs('en')"
                    >En</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href="javascript:void(0)"
                    @click="switchs('ar')"
                    >Ar</a
                  >
                </li>
              </ul>
            </div>
            <div class="user-proifle">
              <button class="log-in" v-if="!userLoggedIn">
                <router-link class="d-block link" :to="{ name: 'Registration' }"
                  >Log in</router-link
                >
              </button>
              <div class="user-profile" v-if="userLoggedIn">
                <img
                  v-if="userImage"
                  @click="showUserProfile"
                  class="d-blcok user-image"
                  :src="userImage"
                  alt="user"
                />
                <img
                  v-else
                  @click="showUserProfile"
                  class="d-blcok user-image"
                  src="../../assets/images/default.png"
                  alt=""
                />

                <div
                  v-if="showProfile"
                  class="settings text-capitalize"
                  :class="{ show: (showProfile = true) }"
                >
                  <router-link
                    @click.native="
                      {
                        showProfile = false;
                      }
                    "
                    class="profile d-block"
                    :to="{ name: 'Profile' }"
                    >profile</router-link
                  >
                  <span class="d-block log-out" @click="logout">log out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
export default {
  name: "AppHeader",
  data() {
    return {
      showProfile: false,
      userImage: "",
    };
  },

  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      let userData = JSON.parse(localStorage.getItem("user-data"));
      this.userImage = userData.image;
    }
    // console.log(this.$store.state.auth.LogInModule.token);
  },

  methods: {
    switchs(local) {
      this.$i18n.locale = local;
      localStorage.setItem("lang", local);
      let languageText = document.getElementById("language");
      languageText.textContent = local.toUpperCase();
      window.location.reload();
    },
    logout() {
      this.$store.dispatch("auth/LogoutModule/logout").then(() => {
        window.location.reload();
      });
    },
    toggleNavbarClass() {
      document.querySelector(".navbar-toggler").classList.toggle("show");
      // let header = document.querySelector(".nav-header .navbar ");
      // if (window.scrollY < 10) {
      //   header.classList.add("nav-while-scroll");
      // }
    },
    showUserProfile() {
      this.showProfile = !this.showProfile;
    },
    handleScroll() {
      let navbar = document.querySelector(".main-header .navbar");
      if (window.scrollY >= 10) {
        navbar.classList.add("nav-scroll");
      } else {
        navbar.classList.remove("nav-scroll");
      }
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    // console.log(this.$store.state.auth.LogInModule.user.image);
    // if (this.userLoggedIn) {
    //   console.log("yes logeed");
    // }
    // let token = localStorage.getItem("token");
    // if (this.userLoggedIn) {
    //   let userData = JSON.parse(localStorage.getItem("user-data"));

    //   this.userImage = userData.image;
    // }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  computed: {
    userLoggedIn() {
      return this.$store.state.auth.LogInModule.token;
    },
  },
};
</script>

<style lang="scss" scoped>
.main-header {
  font-size: 12px;
  color: $textcolor;
  transition: 0.5s;
  .navbar {
    padding: 1rem 0;
    background-color: $white;
    transition: 0.7s;
    &.nav-scroll {
      padding: 0.5rem;
      box-shadow: $box-shadow;
      .navbar-brand {
        .photo {
          padding: 5px;
          box-shadow: $box-shadow;
          border-radius: 10px;
        }
      }
    }
    .navbar-brand {
      .photo {
        transition: 0.5s;
        width: 75px;
        height: 55px;
      }
    }
    .navbar-collapse {
      .navbar-nav {
        margin: auto;
        .nav-item {
          margin-right: 20px;
          .nav-link {
            color: $textcolor;
          }
          &.active {
            .nav-link {
              color: $maincolor;
              // box-shadow: $box-shadow;
            }
          }
        }
      }
    }
    .navbar-toggler {
      position: relative;
      height: 35px;
      width: 40px;
      box-shadow: unset;
      background-color: rgba($maincolor, 0.1);
      .navbar-toggler-icon {
        height: 3px;
        position: absolute;
        left: 2px;
        width: 85%;
        background-color: $maincolor;
        transform-origin: center;
        transition: 0.3s;
      }

      .line-1 {
        transform: translateY(-8px);
      }
      .line-3 {
        transform: translateY(8px);
      }
      &.show {
        .line-1 {
          transform: translateY(0) rotate(-45deg);
        }
        .line-2 {
          opacity: 0;
        }
        .line-3 {
          transform: translateY(0) rotate(45deg);
        }
      }
    }
  }
  .languages-registration {
    display: flex;
    align-items: center;
    // gap: 30px;
    .dropdown {
      display: inline-block;
      margin-right: 15px;
      .items {
        border-bottom: 1px solid $white;
      }
      .lang-btn {
        color: $textcolor;
        border: none;
        outline: none;
        box-shadow: unset;
        font-size: 14px;
        transition: 0.3s;
        &:hover {
          background-color: $maincolor;
          color: $white;
        }
        &::after {
          // left: 2px;
          // position: absolute;
          // top: 50%;
          // transform: translateY(-50%);
          display: none;
        }
        .lang-text {
          margin-left: 5px;
        }
      }
      .dropdown-menu {
        min-width: 80px;
        padding: 0;
        text-align: center;
        .dropdown-item {
          color: $textcolor;
          transition: 0.3s;
          font-size: 14px;
          &.active,
          &:focus,
          &:hover,
          &:active {
            background-color: $maincolor;
            color: $white;
          }
        }
      }
    }
    .log-in {
      border: none;
      padding: 0;
      .link {
        border-radius: 4px;
        background-color: $maincolor;
        color: $white;
        padding: 7px 22px;
        text-decoration: none;
      }
    }
    .user-profile {
      position: relative;
      .user-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
        box-shadow: $box-shadow;
        transition: 0.5s;
        filter: brightness(0.9);
        &:hover {
          filter: brightness(1);
          transform: rotate(10deg);
        }
      }
      .settings {
        position: absolute;
        background: $white;
        z-index: 8888;
        transition: 0.5s;
        padding: 10px 0;
        width: 100px;
        text-align: center;
        right: 0;
        bottom: -240%;
        animation: hideProfile 0.5s linear 1;
        transform: rotateY(0deg);
        box-shadow: 0 1px 12px rgba($black, 0.3);
        &.show {
          animation: showProfile 0.5s linear 1;
          // transform: rotateY(0deg);
          transition: 0.5s;
        }
        .log-out,
        .profile {
          padding: 8px;
          transition: 0.5s;
          cursor: pointer;
          color: $textcolor;
          &:hover {
            background-color: $maincolor;
            color: $white;
          }
        }
        .profile {
          text-decoration: none;
        }
      }
    }
  }
}

@keyframes showProfile {
  0% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(45deg);
  }
  100% {
    transform: rotateY(0);
  }
}
@keyframes hideProfile {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(45deg);
  }
  100% {
    transform: rotateY(90deg);
  }
}
</style>

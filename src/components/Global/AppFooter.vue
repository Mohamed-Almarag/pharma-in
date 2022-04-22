<template>
  <footer class="app-footer">
    <div class="container">
      <div class="main-content">
        <div class="row">
          <div class="social-media col-md-6">
            <h4 class="name text-capitalize">{{ infos.website_name }}</h4>
            <p class="description text-capitalize">
              {{ $t("footer.Egyptian Startup") }}
            </p>
            <ul class="social-list list-unstyled d-flex">
              <li class="social-item">
                <a :href="infos.fb_link">
                  <fa class="icons" :icon="['fab', 'facebook']" />
                </a>
              </li>
              <li class="social-item">
                <a :href="infos.twitter_link">
                  <fa class="icons" :icon="['fab', 'twitter']" />
                </a>
              </li>
              <li class="social-item">
                <a :href="infos.linked_link">
                  <fa class="icons" :icon="['fab', 'linkedin']" />
                </a>
              </li>
              <li class="social-item">
                <a :href="infos.instagram_link">
                  <fa class="icons" :icon="['fab', 'instagram']" />
                </a>
              </li>

              <li class="social-item">
                <a :href="phoneNumber">
                  <fa class="icons" :icon="['fas', 'phone-alt']" />
                </a>
              </li>
            </ul>
          </div>
          <div class="our-services col-md-6">
            <h4 class="title text-capitalize">
              {{ $t("footer.our services") }}
            </h4>
            <ul class="list-unstyled d-flex justify-content-between flex-wrap">
              <li class="service-item">
                <router-link :to="{ name: 'Jobs' }" class="links">{{
                  $t("navbar.jobs")
                }}</router-link>
              </li>
              <li class="service-item">
                <router-link
                  :to="{ name: 'Courses' }"
                  class="links text-capitalize"
                  >{{ $t("navbar.courses") }}</router-link
                >
              </li>
              <li class="service-item">
                <router-link
                  :to="{ name: 'EventsAndNews' }"
                  class="links text-capitalize"
                  >{{ $t("navbar.events") }} &amp;
                  {{ $t("navbar.news") }}</router-link
                >
              </li>
              <li class="service-item">
                <router-link :to="{ name: 'Social' }" class="links">{{
                  $t("navbar.Social")
                }}</router-link>
              </li>
              <li class="service-item">
                <router-link :to="{ name: 'Guide' }" class="links">{{
                  $t("navbar.guide")
                }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="all-right-reserved">
      <div class="container">
        <div class="privacy d-flex align-items-center justify-content-around">
          <div class="copy-right">
            <p class="text-capitalize content">
              &copy;2021
              <span class="Pharma">{{ infos.website_name }}</span>
              {{ $t("footer.All Rights Reserved") }}
            </p>
          </div>
          <div class="terms d-flex">
            <router-link
              class="link text-capitalize"
              :to="{ name: 'PrivacyPolicy' }"
              >{{ $t("footer.Privacy ploicy") }}</router-link
            >
            <router-link
              class="link text-capitalize"
              :to="{ name: 'TermsOfService' }"
              >{{ $t("footer.Terms Of Service") }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      wesitePhoneNumber: "",
    };
  },
  created() {
    this.pharmaInfo();
  },
  mounted() {
    let wesiteInfo = JSON.parse(localStorage.getItem("website-info"));
    this.wesitePhoneNumber = wesiteInfo.phone;
  },
  computed: {
    infos() {
      return this.$store.state.WebsiteInfo.pharmaInfo;
    },
    phoneNumber() {
      let phoneNum = `tel: ${this.wesitePhoneNumber}`;
      return phoneNum;
    },
  },
  methods: {
    pharmaInfo() {
      this.$store.dispatch("WebsiteInfo/phrmaInfo");
    },
  },
};
</script>

<style lang="scss" scoped>
.app-footer {
  background-color: $maincolor;
  color: $white;
  padding: 70px 0 0;
  .main-content {
    .social-media {
      .name {
        font-size: 32px;
        font-weight: bold;
      }
      .description {
        line-height: 1.7;
        margin: 20px 0;
        @media (min-width: 992px) {
          width: 60%;
        }
      }
      .social-list {
        gap: 30px;
        .social-item {
          a {
            color: $white;
            &:hover {
              text-decoration: none;
            }
          }
        }
      }
    }
    .our-services {
      .title {
        margin-bottom: 20px;
      }
      ul {
        gap: 20px;
        @media (min-width: 320px) and (max-width: 360px) {
          justify-content: unset !important;
        }
        .service-item {
          .links {
            color: $white;
            text-decoration: none;
          }
        }
      }
    }
  }
}
.all-right-reserved {
  padding: 10px 0;
  font-size: 15px;
  font-weight: bold;
  background-color: $white;
  line-height: 2;
  .privacy {
    @media (min-width: 320px) and (max-width: 767px) {
      display: block !important;
    }
    .copy-right {
      .content {
        margin: 0;
        color: $textcolor2;
        span {
          color: $secondcolor;
          &.Pharma {
            color: $maincolor;
          }
        }
      }
    }
    .terms {
      gap: 50px;
      @media (min-width: 320px) and (max-width: 767px) {
        margin-top: 10px;
      }
      .link {
        color: $textcolor2;
        text-decoration: none;
        transition: $transition;
        &:hover {
          color: $maincolor;
        }
      }
    }
  }
}
</style>

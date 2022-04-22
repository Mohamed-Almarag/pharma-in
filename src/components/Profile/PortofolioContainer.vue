<template>
  <div class="main-container" v-if="user">
    <Loading :loading="loading"></Loading>
    <div class="row">
      <div class="user-details text-capitalize">
        <div class="personal-data">
          <div class="row">
            <!-- Start Conatct -->
            <div class="information col-md-6">
              <!-- Edit Personal Data  -->
              <transition name="fade">
                <div
                  class="form-modal-container clip-path"
                  v-if="showPersonalDataForm"
                >
                  <form
                    @submit.prevent="editPersonalInformation"
                    class="form-modal personal-information"
                  >
                    <span @click="shwoFormModal" class="close-form-modal"
                      ><fa class="icon" icon="times"
                    /></span>
                    <h5 class="title text-uppercase text-center">
                      personal information
                    </h5>
                    <div class="form-group">
                      <div class="form-label">name</div>
                      <input
                        class="form-input"
                        type="text"
                        v-model="personalInformation.name"
                      />
                      <div class="validations-erros">
                        <span
                          class="text-danger"
                          v-if="
                            !$v.personalInformation.name.required &&
                            $v.personalInformation.name.$dirty
                          "
                        >
                          name is required
                        </span>
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="form-label">email</div>
                      <input
                        class="form-input"
                        type="email"
                        v-model="personalInformation.email"
                      />
                      <div class="validations-erros">
                        <span
                          v-if="
                            !$v.personalInformation.email.required &&
                            $v.personalInformation.email.$dirty
                          "
                          class="text-danger"
                          >email is required!</span
                        >
                        <span
                          v-if="!$v.personalInformation.email.email"
                          class="text-danger"
                          >write a valid email</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="form-label">phone</div>
                      <input
                        class="form-input"
                        type="text"
                        v-model="personalInformation.phone"
                      />
                      <div class="validations-erros">
                        <span
                          class="text-danger"
                          v-if="
                            !$v.personalInformation.phone.required &&
                            $v.personalInformation.phone.$dirty
                          "
                        >
                          phone is required
                        </span>
                      </div>
                    </div>

                    <button class="submit-form-modal text-capitalize d-block">
                      save
                    </button>
                  </form>
                </div>
              </transition>
              <!-- Edit Personal Data  -->
              <!-- change password  -->
              <transition name="fade">
                <div
                  class="form-modal-container clip-path"
                  v-if="showPasswordForm"
                >
                  <form
                    @submit.prevent="changeUserPassword"
                    class="form-modal personal-information"
                  >
                    <span
                      @click="shwoPasswordFormModal"
                      class="close-form-modal"
                      ><fa class="icon" icon="times"
                    /></span>
                    <h5 class="title text-uppercase text-center">
                      change your password
                    </h5>
                    <div class="form-group">
                      <label for="" class="form-label">old password</label>
                      <div class="input-container">
                        <input
                          type="password"
                          class="form-input password-input"
                          v-model="userPassword.oldpassword"
                        />
                        <fa
                          class="icon show-password"
                          @click="showAndHidePassword"
                          icon="eye"
                        />
                      </div>
                      <div class="validation-errors">
                        <span
                          v-if="
                            !$v.userPassword.oldpassword.required &&
                            $v.userPassword.oldpassword.$dirty
                          "
                          class="text-danger"
                          >oldp password is required!</span
                        >
                        <span
                          v-if="!$v.userPassword.oldpassword.minLength"
                          class="text-danger"
                          >old password must be at least
                          {{
                            $v.userPassword.oldpassword.$params.minLength.min
                          }}
                          characters</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="" class="form-label">password</label>
                      <div class="input-container">
                        <input
                          type="password"
                          class="form-input password-input"
                          v-model="userPassword.password"
                        />
                        <fa
                          class="icon show-password"
                          @click="showAndHidePassword"
                          icon="eye"
                        />
                      </div>
                      <div class="validation-errors">
                        <span
                          v-if="
                            !$v.userPassword.password.required &&
                            $v.userPassword.password.$dirty
                          "
                          class="text-danger"
                          >password is required!</span
                        >
                        <span
                          v-if="!$v.userPassword.password.minLength"
                          class="text-danger"
                          >password must be at least
                          {{ $v.userPassword.password.$params.minLength.min }}
                          characters</span
                        >
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="" class="form-label"
                        >password confirmation</label
                      >
                      <div class="input-container">
                        <input
                          type="password"
                          class="form-input password-input"
                          v-model="userPassword.password_confirmation"
                        />
                        <fa
                          class="icon show-password"
                          @click="showAndHidePassword"
                          icon="eye"
                        />
                      </div>
                      <div class="validation-errors">
                        <span
                          v-if="
                            !$v.userPassword.password_confirmation.required &&
                            $v.userPassword.password_confirmation.$dirty
                          "
                          class="text-danger"
                          >confirmation password is required!</span
                        >
                        <span
                          v-if="
                            !$v.userPassword.password_confirmation
                              .sameAsPassword
                          "
                          class="text-danger"
                          >confirmation password must be the same password</span
                        >
                      </div>
                    </div>

                    <button class="submit-form-modal text-capitalize d-block">
                      save
                    </button>
                  </form>
                </div>
              </transition>
              <!-- change password  -->
              <div class="contact">
                <span @click="shwoFormModal" class="show"
                  ><fa class="icon" icon="pen"
                /></span>
                <h5 class="title">personal information</h5>
                <ul class="lists d-flex flex-wrap list-unstyled">
                  <li class="item d-flex">
                    <fa class="d-block icon" icon="user-alt" />
                    <h6 class="name">{{ user.name }}</h6>
                  </li>
                  <li class="item d-flex">
                    <fa class="d-block icon" icon="envelope" />
                    <span class="d-block name">{{ user.email }}</span>
                  </li>
                  <li class="item d-flex">
                    <fa class="d-block icon" icon="phone-alt" />
                    <span class="d-block name">{{ user.phone }}</span>
                  </li>
                  <li
                    class="item d-flex"
                    v-if="knowUserType == 'customer' && user.userportfolio"
                  >
                    <fa class="d-block icon" icon="map-marker-alt" />
                    <span class="d-block name">{{
                      user.userportfolio.address
                    }}</span>
                  </li>
                  <li
                    class="item d-flex"
                    v-if="
                      knowUserType == 'company' && user.country && user.city
                    "
                  >
                    <fa class="d-block icon" icon="map-marker-alt" />
                    <span class="d-block name"
                      >{{ user.country.name }} / {{ user.city.name }}</span
                    >
                  </li>
                </ul>
                <button
                  @click="shwoPasswordFormModal"
                  class="details-button review-button text-capitalize"
                >
                  change password
                </button>
                <!-- <span class="edit"><fa class="icon" icon="pen" /></span> -->
              </div>
              <div class="user-bio" v-if="user.userportfolio != null">
                <h5 class="title">bio</h5>
                <p class="text" v-if="knowUserType == 'customer'">
                  <span v-if="user.userportfolio">
                    {{ user.userportfolio.bio }}
                  </span>
                </p>
                <p class="text" v-if="knowUserType == 'company'">
                  <span v-if="user.userportfolio">
                    {{ user.userportfolio.description }}
                  </span>
                </p>
              </div>
            </div>
            <!-- End Conatct  -->
            <div class="user-portfolio col-md-6">
              <Portfolio></Portfolio>
            </div>
          </div>
        </div>

        <div class="educations-experince" v-if="knowUserType == 'customer'">
          <div class="row">
            <div class="all-user-educations col-md-6">
              <ul
                class="educations-lists list-unstyled text-capitalize"
                v-if="user.userportfolio"
              >
                <h5 class="title">your Education</h5>
                <li
                  class="items"
                  v-for="item in user.userportfolio.Education"
                  :key="item.id"
                >
                  <div class="where-educate d-flex">
                    <fa class="d-block icon" icon="graduation-cap" />
                    <h6 class="name">{{ item.name }}</h6>
                  </div>

                  <div class="dates-container">
                    <div class="join-date join d-flex">
                      <span class="d-block">join date : </span>
                      <span class="d-block dates">{{ item.join_date }}</span>
                    </div>
                    <div class="join-date d-flex">
                      <span class="d-block">leave date : </span>
                      <span class="d-block dates">{{ item.leave_date }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div class="all-user-educations col-md-6">
              <ul
                class="educations-lists list-unstyled text-capitalize"
                v-if="user.userportfolio"
              >
                <h5 class="title">your Experience</h5>
                <li
                  class="items"
                  v-for="item in user.userportfolio.Experience"
                  :key="item.id"
                >
                  <div class="where-educate d-flex">
                    <h6 class="name">{{ item.title }}</h6>
                  </div>

                  <div class="dates-container">
                    <div class="join-date join d-flex">
                      <span class="d-block">join date : </span>
                      <span class="d-block dates">{{ item.join_date }}</span>
                    </div>
                    <div class="join-date d-flex">
                      <span class="d-block">leave date : </span>
                      <span class="d-block dates">{{ item.leave_date }}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="company-details" v-if="knowUserType == 'company'">
          <h5 class="title">company details</h5>
          <div class="company-photo" v-if="user.userportfolio">
            <img
              class="img"
              :src="user.userportfolio.logo"
              :alt="user.userportfolio.company_name"
            />
          </div>
          <ul class="list-unstyled company-list" v-if="user.userportfolio">
            <h6>
              <fa class="icon" icon="building" />
              <span class="paragraph">{{
                user.userportfolio.company_name
              }}</span>
            </h6>
            <li>
              <fa class="icon" icon="paragraph" />
              <span class="paragraph">{{ user.userportfolio.type.name }}</span>
            </li>
            <li>
              <fa class="icon" icon="paragraph" />
              <span class="paragraph">{{
                user.userportfolio.description
              }}</span>
            </li>
            <li>
              <fa class="icon" icon="paragraph" />
              <span class="paragraph">{{ user.userportfolio.website }}</span>
            </li>
            <li>
              <fa class="icon" icon="map-marker-alt" />
              <span class="paragraph">{{ user.userportfolio.address }}</span>
            </li>
            <li>
              <fa class="icon" icon="location-arrow" />
              <span class="paragraph">{{ user.userportfolio.location }}</span>
            </li>
            <li>
              <fa class="icon" icon="users" />
              <span class="paragraph">{{
                user.userportfolio.employee_type
              }}</span>
            </li>
            <li>
              <fa class="icon" icon="users" />
              <span class="paragraph">{{
                user.userportfolio.employee_size
              }}</span>
            </li>
            <li>
              <fa class="icon" icon="users" />
              <span class="paragraph">{{ user.userportfolio.status }}</span>
            </li>
            <li>
              <fa class="icon" icon="envelope" />
              <span class="paragraph">{{ user.userportfolio.email }}</span>
            </li>
            <li>
              <fa class="icon" icon="phone-alt" />
              <span class="paragraph">{{ user.userportfolio.phone }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Portfolio from "@/components/Profile/Portfolio.vue";

import { mapState } from "vuex";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  nam: "PortofolioContainer",
  data() {
    return {
      loading: false,
      showPersonalDataForm: false,
      knowUserType: null,
      user_data: "",
      personalInformation: {
        name: "",
        email: "",
        phone: "",
      },
      showPasswordForm: false,
      userPassword: {
        oldpassword: "",
        password: "",
        password_confirmation: "",
        _method: "PUT",
      },
    };
  },
  mounted() {
    this.getUser();
    let userDetailsInStore = this.$store.state.userDetails;
    this.knowUserType = userDetailsInStore.type;
    this.user_data = userDetailsInStore;
  },
  computed: {
    ...mapState({
      user: (state) => state.ProfileModule.user,
    }),
  },
  methods: {
    getUser() {
      this.$store.dispatch("ProfileModule/getUserInformation");
    },
    handelUploadFileImage(event) {
      this.image = event.target.files[0];
      this.reader.readAsDataURL(this.image);
    },
    shwoFormModal() {
      this.showPersonalDataForm = !this.showPersonalDataForm;
      let editUserDat = this.user_data;
      this.personalInformation.name = editUserDat.name;
      this.personalInformation.email = editUserDat.email;
      this.personalInformation.phone = editUserDat.phone;

      console.log(this.user_data);
    },
    editPersonalInformation() {
      this.$v.personalInformation.$touch();
      if (this.$v.personalInformation.$invalid) {
        console.log("errors");
      } else {
        this.loading = true;
        let userData = new FormData();
        userData.append("name", this.personalInformation.name);
        userData.append("email", this.personalInformation.email);
        userData.append("phone", this.personalInformation.phone);
        this.$store
          .dispatch("ProfileModule/changePersonalInformation", userData)
          .then(() => {
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    showAndHidePassword() {
      let passwordInputs = document.querySelectorAll(".password-input");
      passwordInputs.forEach((input) => {
        input.getAttribute("type") == "password"
          ? input.setAttribute("type", "text")
          : input.setAttribute("type", "password");
      });
    },
    shwoPasswordFormModal() {
      this.showPasswordForm = !this.showPasswordForm;
    },
    changeUserPassword() {
      this.$v.userPassword.$touch();
      if (this.$v.userPassword.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let userPasswords = new FormData();
        userPasswords.append("oldpassword", this.userPassword.oldpassword);
        userPasswords.append("password", this.userPassword.password);
        userPasswords.append(
          "password_confirmation",
          this.userPassword.password_confirmation
        );
        userPasswords.append("_method", this.userPassword._method);
        this.$store
          .dispatch("ProfileModule/changePassword", userPasswords)
          .then(() => {
            this.$store.dispatch("auth/LogoutModule/logout");
          })
          .then(() => {
            this.$router.push({ name: "Registration" });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  validations: {
    personalInformation: {
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      name: {
        required,
      },
    },

    userPassword: {
      oldpassword: {
        required,
        minLength: minLength(8),
      },
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  components: { Portfolio },
};
</script>

<style lang="scss" scoped>
.personal-data {
  .information {
    .title {
      margin-bottom: 25px;
      color: $textcolor2;
    }
    .contact {
      border-radius: 10px;
      box-shadow: $box-shadow;
      padding: 20px 10px;
      position: relative;
      .show {
        position: absolute;
        right: 20px;
        background-color: $bgcard;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        transition: $transition;
        color: $textcolor;
        cursor: pointer;
        box-shadow: $box-shadow;
        &:hover {
          background-color: $secondcolor;
          color: $white;
        }
        .icon {
          font-size: 14px;
        }
      }
      .lists {
        gap: 4%;
        .item {
          gap: 5px;
          color: $textcolor;
          margin: 0 0 20px;
          width: fit-content;
          .icon {
            color: $secondcolor;
          }
          .name {
            margin: 0 5px;
          }
        }
      }
    }
  }
  .user-bio {
    border-radius: 10px;
    box-shadow: $box-shadow;
    padding: 20px 10px 0;
    margin-top: 30px;
    margin-bottom: 30px;
    .text {
      padding-bottom: 20px;
      color: $textcolor;
      line-height: 2;
    }
  }
}

.about-me {
  padding: 80px 20px;
  margin: 20px 0;
  .show {
    box-shadow: $box-shadow;
    border-radius: 10px;
    padding: 30px 15px;
    .bio-title {
      color: $textcolor2;
    }
    .bio-p {
      color: $textcolor;
      margin: 0;
    }
  }
}

.educations-experince {
  margin-top: 40px;
  .all-user-educations {
    .educations-lists {
      box-shadow: $box-shadow;
      border-radius: 10px;
      padding: 15px;
      .title {
        color: $textcolor2;
      }
      .items {
        position: relative;
        border-radius: 7px;
        background-color: rgba($textcolor, 0.1);
        margin-top: 30px;
        padding: 10px;
        .where-educate {
          gap: 8px;
          .name {
            color: $textcolor2;
          }
          .icon {
            color: $secondcolor;
          }
        }
        .dates-container {
          color: $textcolor;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          .join-date {
            gap: 8px;
            &.join {
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
.company-details {
  padding: 40px 0;
  .company-photo {
    margin: 30px 0;
    .img {
    }
  }
  .title {
    // margin-bottom: 20px;
  }
  .company-list {
    h6 {
      margin-bottom: 20px;
    }
    li {
      margin-bottom: 20px;
    }
  }
  .icon {
    color: $secondcolor;
    margin: 0 5px;
  }
}
</style>

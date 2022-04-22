<template>
  <div class="log-in registration">
    <Loading :loading="loading"></Loading>
    <transition name="fade">
      <Errors v-if="showErrors" :error="error">
        <template #errors>
          <div class="errors">
            <strong>{{ showErrors }} </strong>
            <button
              @click="error = ''"
              type="button"
              class="btn-close close-alert"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </template>
      </Errors>
    </transition>

    <transition name="fade">
      <Success v-if="success" :success="success">
        <template #success>
          <div class="errors">
            <strong>{{ successMessage }} </strong>
            <button
              @click="success = ''"
              type="button"
              class="btn-close close-alert"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </template>
      </Success>
    </transition>

    <h5 class="text-center main-section-title description-title">
      {{ $t("form.Make The Most Of Your Professional Life") }}
    </h5>

    <form action="" class="text-capitalize form" @submit.prevent="signIn">
      <div class="form-group">
        <label for="" class="form-label">{{ $t("form.email") }}</label>
        <div class="input-container">
          <input class="form-input" type="email" v-model="userData.email" />
          <fa class="icon" icon="envelope" />
        </div>
        <div class="validation-errors">
          <span
            v-if="!$v.userData.email.required && $v.userData.email.$dirty"
            class="text-danger"
            >{{ $t("validation.email") }}</span
          >
          <span v-if="!$v.userData.email.email" class="text-danger">{{
            $t("validation.validemail")
          }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="" class="form-label">{{ $t("form.password") }}</label>
        <div class="input-container">
          <input
            type="password"
            autocomplete
            class="form-input password-input"
            v-model="userData.password"
          />
          <fa
            @click="showAndHidePassword"
            class="icon show-password"
            icon="eye"
          />
        </div>
        <div class="validation-errors">
          <span
            v-if="!$v.userData.password.required && $v.userData.password.$dirty"
            class="text-danger"
            >{{ $t("validation.validpassword") }}</span
          >
        </div>
      </div>

      <div class="form-group">
        <div class="check-remember d-flex justify-content-between flex-wrap">
          <div class="checkbox-container mb-3">
            <input
              type="checkbox"
              class="checkbox-input"
              v-model="userData.remember_me"
            />
            <span class="remember-me">{{ $t("form.Remember Me") }}</span>
          </div>
          <div class="forget-password">
            <router-link class="link" :to="{ name: 'ForgetPassword' }">{{
              $t("form.Forgot Your Password")
            }}</router-link>
          </div>
        </div>
      </div>

      <button class="review-button mt-4 details-button d-block text-capitalize">
        {{ $t("form.log in") }}
      </button>
    </form>
  </div>
</template>

<script>
import { append_Object_Items_ToFormData } from "@/axios/helpers";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      error: "",
      success: false,
      successMessage: "",
      userData: {
        email: "",
        password: "",
        remember_me: false,
      },
    };
  },
  computed: {
    showErrors() {
      return this.error;
    },
  },
  methods: {
    signIn() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let user = append_Object_Items_ToFormData(this.userData);
        this.$store
          .dispatch("auth/LogInModule/signIn", user)
          .then((response) => {
            this.successMessage = response.data.message;
            // console.log(response);
          })
          .catch((error) => {
            this.error = error.response.data.message;
            // console.log(error.response.message);
            console.log("error");
          })
          .then(() => {
            if (!this.showErrors) {
              this.success = true;
              this.$router.push({ name: "Home" });
              if (this.$route.name == "Home") {
                this.$router.go(this.$router.currentRoute);
                // window.location.reload();
              }
            }
          })
          .finally(() => {
            this.loading = false;
            if (!this.showErrors) {
              this.success = true;
              // location.reload();
            }
          });
      }
    },
    showConfirmModal() {
      this.showConfirm = !this.showConfirm;
    },

    showAndHidePassword() {
      let passwordInput = document.querySelector(".password-input");
      if (passwordInput.getAttribute("type") == "password") {
        passwordInput.setAttribute("type", "text");
      } else {
        passwordInput.setAttribute("type", "password");
      }
    },
  },
  validations: {
    userData: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/registrationForms.scss";
.log-in {
  padding: 0 0 70px;
  .remember-me {
    margin: 0 10px;
  }
  .link {
    color: $cancel;
  }
}
</style>

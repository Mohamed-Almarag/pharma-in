<template>
  <div class="sign-up registration view-padding">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <h5 class="text-center description">
        {{ $t("form.Fill Information Correctly") }}
      </h5>

      <transition-group name="fade">
        <Errors v-if="showErrors" :error="error" key="error">
          <template #errors>
            <div class="errors">
              <strong v-for="(err, i) in showErrors" :key="i"
                >{{ err }}
              </strong>
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
        <Success v-if="success" :success="success" key="success">
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
      </transition-group>

      <form action="" class="text-capitalize form" @submit.prevent="signUp">
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.name") }}</label>
          <div class="input-container">
            <input class="form-input" type="text" v-model="userData.name" />
            <fa class="icon" icon="user" />
          </div>
          <div class="validation-errors">
            <span
              v-if="!$v.userData.name.required && $v.userData.name.$dirty"
              class="text-danger"
              >{{ $t("validation.name") }}</span
            >
          </div>
        </div>

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
          <label for="" class="form-label">{{ $t("form.phone") }}</label>
          <div class="input-container">
            <input class="form-input" type="tel" v-model="userData.phone" />
            <fa class="icon" icon="phone-alt" />
          </div>
          <div class="validation-errors">
            <span
              v-if="!$v.userData.phone.required && $v.userData.phone.$dirty"
              class="text-danger"
              >{{ $t("validation.phone") }}</span
            >
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
              class="icon show-password"
              @click="showAndHidePassword"
              icon="eye"
            />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.userData.password.required && $v.userData.password.$dirty
              "
              class="text-danger"
              >{{ $t("validation.validpassword") }}</span
            >
            <span v-if="!$v.userData.password.minLength" class="text-danger"
              >{{ $t("validation.Password must be at least") }}
              {{ $v.userData.password.$params.minLength.min }}
              {{ $t("validation.characters") }}</span
            >
          </div>
        </div>

        <div class="form-group">
          <label for="" class="form-label">{{
            $t("form.Confirm Password")
          }}</label>
          <div class="input-container">
            <input
              type="password"
              autocomplete
              class="form-input password-input"
              v-model="userData.password_confirmation"
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
                !$v.userData.password_confirmation.required &&
                $v.userData.password_confirmation.$dirty
              "
              class="text-danger"
              >{{ $t("validation.confirmation password") }}</span
            >
            <span
              v-if="!$v.userData.password_confirmation.sameAsPassword"
              class="text-danger"
              >{{ $t("validation.same password") }}</span
            >
          </div>
        </div>

        <button class="review-button details-button d-block text-capitalize">
          {{ $t("form.Create") }}
        </button>
      </form>
      <div class="terms text-center">
        <p>
          {{ $t("form.By clicking Agree") }} &amp;
          {{ $t("form.Join you agree to the Pharma In User Agreement") }}
          <router-link class="links" :to="{ name: 'PrivacyPolicy' }">{{
            $t("form.Privacy Policy")
          }}</router-link>
          &amp;
          <router-link class="links" :to="{ name: 'CookiePolicy' }">{{
            $t("form.Cookie Policy")
          }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { append_Object_Items_ToFormData } from "@/axios/helpers";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "SignUpCustomer",
  data() {
    return {
      loading: false,
      success: false,
      successMessage: "",
      error: "",
      userData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        type: "customer",
      },
    };
  },
  computed: {
    showErrors() {
      return this.error;
    },
  },
  methods: {
    signUp() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let user = append_Object_Items_ToFormData(this.userData);
        this.$store
          .dispatch("auth/RegisterModule/signUp", user)
          .then((response) => {
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.error = error.response.data.message;
          })
          .finally(() => {
            this.loading = false;
            if (!this.showErrors) {
              this.success = true;
              setTimeout(() => {
                this.$router.push({ name: "Registration" });
              }, 700);
            }
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
  },
  validations: {
    userData: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      phone: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
      type: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/registrationForms.scss";
.terms {
  margin-top: 80px;
  span {
    color: $maincolor;
  }
}
</style>

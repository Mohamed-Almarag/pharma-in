<template>
  <div class="registration view-padding">
    <div class="check-code">
      <Loading :loading="loading"></Loading>
      <PhramaPreviewLogo></PhramaPreviewLogo>
      <h5 class="text-center description">
        {{ $t("form.Password Correctly") }}
      </h5>
      <form
        action=""
        class="text-capitalize form"
        @submit.prevent="resetPassword"
      >
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.password") }}</label>
          <div class="input-container">
            <input
              class="form-input password-input"
              type="password"
              autocomplete
              v-model="resetUserPassword.password"
            />
            <fa
              @click="showAndHidePassword"
              class="icon show-password"
              icon="eye"
            />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.resetUserPassword.password.required &&
                $v.resetUserPassword.password.$dirty
              "
              class="text-danger"
              >{{ $t("validation.validpassword") }}</span
            >
            <span
              v-if="!$v.resetUserPassword.password.minLength"
              class="text-danger"
              >{{ $t("validation.Password must be at least") }}
              {{ $v.resetUserPassword.password.$params.minLength.min }}
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
              class="form-input password-input"
              type="password"
              autocomplete
              v-model="resetUserPassword.password_confirmation"
            />
            <fa
              @click="showAndHidePassword"
              class="icon show-password"
              icon="eye"
            />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.resetUserPassword.password_confirmation.required &&
                $v.resetUserPassword.password_confirmation.$dirty
              "
              class="text-danger"
              >{{ $t("validation.confirmation password") }}</span
            ><br />
            <span
              v-if="!$v.resetUserPassword.password_confirmation.sameAsPassword"
              class="text-danger"
              >{{ $t("validation.same password") }}</span
            >
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.Your Code") }}</label>
          <div class="input-container">
            <input
              class="form-input code-input"
              type="password"
              autocomplete
              v-model="resetUserPassword.reset_code"
            />
            <fa
              @click="showAndHideCode"
              class="icon show-password"
              icon="eye"
            />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.resetUserPassword.reset_code.required &&
                $v.resetUserPassword.reset_code.$dirty
              "
              class="text-danger"
              >{{ $t("validation.required Code") }}</span
            >
          </div>
        </div>
        <button class="submit-button d-block text-capitalize">
          {{ $t("form.send") }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { append_Object_Items_ToFormData } from "@/axios/helpers";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "ResetPassword",
  data() {
    return {
      success: false,
      successMessage: "",
      error: "",
      loading: false,
      resetUserPassword: {
        password: "",
        password_confirmation: "",
        reset_code: "",
      },
    };
  },
  computed: {
    showErrors() {
      return this.error;
    },
  },
  methods: {
    resetPassword() {
      this.$v.resetUserPassword.$touch();
      if (this.$v.resetUserPassword.$invalid) {
        console.log("error");
      } else {
        let resetPassword = append_Object_Items_ToFormData(
          this.resetUserPassword
        );
        this.$store
          .dispatch("auth/ResetPasswordModule/reserUserPassword", resetPassword)
          .then((response) => {
            console.log(response);
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.error = error.response.data.errors.email;
            // console.log(error.response.data.message);
            // console.log(error.response.data.errors.email[0]);
          })
          .then(() => {
            if (!this.showErrors) {
              this.success = true;
            }
          })
          .finally(() => {
            this.loading = false;
            // if (!this.showErrors) {
            //   setTimeout(() => {
            //     this.$router.push({ name: "Registration" });
            //   }, 700);
            // }
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
    showAndHideCode() {
      let codeInput = document.querySelector(".code-input");
      if (codeInput.getAttribute("type") == "password") {
        codeInput.setAttribute("type", "text");
      } else {
        codeInput.setAttribute("type", "password");
      }
    },
  },
  validations: {
    resetUserPassword: {
      password: {
        required,
        minLength: minLength(8),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
      reset_code: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/registrationForms.scss";
</style>

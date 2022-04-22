<template>
  <div class="registration view-padding">
    <Loading :loading="loading"></Loading>
    <PhramaPreviewLogo></PhramaPreviewLogo>
    <transition name="fade">
      <Errors v-if="showErrors" :error="error">
        <template #errors>
          <div class="errors">
            <!-- <strong>{{ showErrors }}</strong> -->
            <strong v-for="(err, i) in showErrors" :key="i">{{ err }} </strong>
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
    <div class="container">
      <div class="forgot-password">
        <h5 class="text-center description-title">
          {{ $t("form.Password Reset Code") }}
        </h5>
        <form
          action=""
          class="text-capitalize form"
          @submit.prevent="forgotPassword"
        >
          <div class="form-group">
            <label for="" class="form-label">{{ $t("form.email") }}</label>
            <div class="input-container">
              <input
                class="form-input"
                type="email"
                v-model="forgetPassword.email"
              />
              <fa class="icon" icon="envelope" />
            </div>
            <div class="validation-errors">
              <span
                v-if="
                  !$v.forgetPassword.email.required &&
                  $v.forgetPassword.email.$dirty
                "
                class="text-danger"
                >{{ $t("validation.email") }}</span
              >
              <span v-if="!$v.forgetPassword.email.email" class="text-danger">{{
                $t("validation.validemail")
              }}</span>
            </div>
          </div>
          <button class="submit-button form-button d-block text-capitalize">
            {{ $t("form.send") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { append_Object_Items_ToFormData } from "@/axios/helpers";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "ForgetPassword",
  data() {
    return {
      success: false,
      successMessage: "",
      error: "",
      loading: false,
      forgetPassword: {
        email: "",
      },
    };
  },
  computed: {
    showErrors() {
      return this.error;
    },
  },
  methods: {
    forgotPassword() {
      this.$v.forgetPassword.$touch();
      if (this.$v.forgetPassword.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let email = append_Object_Items_ToFormData(this.forgetPassword);
        this.$store
          .dispatch("auth/ForgotPasswordModule/forgotPassword", email)
          .then((response) => {
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            if (error) {
              this.error = error.response.data.errors.email;
            }
          })
          .then(() => {
            if (!this.showErrors) {
              this.success = true;
            }
          })
          .finally(() => {
            this.loading = false;
            if (!this.showErrors) {
              setTimeout(() => {
                this.$router.push({ name: "CheckCode" });
              }, 700);
            }
          });
      }
    },
  },
  validations: {
    forgetPassword: {
      email: {
        required,
        email,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/registrationForms.scss";
</style>

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
    <div class="check-code">
      <h5 class="text-center description">
        {{ $t("form.check Code") }}
      </h5>
      <form action="" class="text-capitalize form" @submit.prevent="checkCode">
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.email") }}</label>
          <div class="input-container">
            <input
              class="form-input"
              type="email"
              v-model="checkUserCode.email"
            />
            <fa class="icon" icon="envelope" />
          </div>
          <div class="validation-errors">
            <span
              v-if="
                !$v.checkUserCode.email.required &&
                $v.checkUserCode.email.$dirty
              "
              class="text-danger"
              >{{ $t("validation.email") }}</span
            >
            <span v-if="!$v.checkUserCode.email.email" class="text-danger">{{
              $t("validation.validemail")
            }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="" class="form-label">{{ $t("form.Your Code") }}</label>
          <div class="input-container">
            <input
              class="form-input password-input"
              type="password"
              autocomplete
              v-model="checkUserCode.code"
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
                !$v.checkUserCode.code.required && $v.checkUserCode.code.$dirty
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
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "CheckCode",
  data() {
    return {
      success: false,
      successMessage: "",
      error: "",
      loading: false,
      checkUserCode: {
        email: "",
        code: "",
      },
    };
  },
  computed: {
    showErrors() {
      return this.error;
    },
  },
  methods: {
    checkCode() {
      this.$v.checkUserCode.$touch();
      if (this.$v.checkUserCode.$invalid) {
        console.log("error");
      } else {
        let userCode = append_Object_Items_ToFormData(this.checkUserCode);
        this.$store
          .dispatch("auth/CheckCodeModule/checkUserCode", userCode)
          .then((response) => {
            console.log(response);
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.error = error.response.data.errors.email;
            console.log(error.response.data.message);
            console.log(error.response.data.errors.email[0]);
          })
          .then(() => {
            if (!this.showErrors) {
              this.success = true;
            }
          })
          .finally(() => {
            this.loading = false;
            //  if (!this.showErrors) {
            //   setTimeout(() => {
            //     this.$router.push({ name: "ResetPassword" });
            //   }, 700);
            // }
            // mohamedalmarag97@gmail.com
          });
      }
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
    checkUserCode: {
      email: {
        required,
        email,
      },
      code: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/registrationForms.scss";
</style>

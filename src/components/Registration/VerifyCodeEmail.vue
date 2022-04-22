<template>
  <div class="view-padding verfiy">
    <div class="container">
      <div class="main-verfify-conent">
        <form class="form" action="" @submit.prevent="submitForm">
          <h2 class="ver-title text-center text-capitalize">
            {{ $t("form.Verify Email") }}
          </h2>
          <p class="text-center paragraph text-capitalize">
            {{
              $t(
                "form.type your email and the code you recived it to complete the verfication"
              )
            }}
          </p>
          <div class="form-group text-capitalize">
            <label for="" class="form-label">{{ $t("form.email") }}</label>
            <div class="input-container">
              <input class="form-input" type="email" v-model="email" />
              <fa class="icon" icon="envelope" />
            </div>
            <div class="validation-errors">
              <span
                v-if="!$v.email.required && $v.email.$dirty"
                class="text-danger"
                >{{ $t("validation.email") }}</span
              >
              <span v-if="!$v.email.email" class="text-danger">{{
                $t("validation.validemail")
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="" class="form-label">{{ $t("form.Your Code") }}</label>
            <div class="input-container">
              <input
                class="form-input code-input"
                type="text"
                autocomplete
                v-model="code"
              />
              <fa
                @click="showAndHideCode"
                class="icon show-password"
                icon="eye"
              />
            </div>
            <div class="validation-errors">
              <span
                v-if="!$v.code.required && $v.code.$dirty"
                class="text-danger"
                >{{ $t("validation.required Code") }}</span
              >
            </div>
          </div>
          <button
            class="review-button mt-4 details-button d-block text-capitalize"
          >
            {{ $t("form.send") }}
          </button>
        </form>
      </div>
    </div>

    <VerificationModal
      :verifyType="verifyType"
      :show="show"
    ></VerificationModal>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "VerifyCodeEmail",
  data() {
    return {
      email: "",
      code: "",
      show: true,
      verifyType: "emailAndCode",
    };
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("");
      } else {
        console.log("error");
        this.$store
          .dispatch("auth/VerfiyEmail/checkVerfiyEmailAndCode", {
            email: this.email,
            code: this.code,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
          });
      }
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
    email: {
      required,
      email,
    },
    code: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/verifyEmail.scss";
</style>

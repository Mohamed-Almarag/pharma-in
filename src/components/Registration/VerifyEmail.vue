<template>
  <div class="view-padding verfiy">
    <div class="container">
      <div class="main-verfify-conent">
        <form class="form" action="" @submit.prevent="submitForm">
          <h2 class="ver-title text-center text-capitalize">
            {{ $t("form.Verify Email") }}
          </h2>
          <p class="text-center paragraph text-capitalize">
            {{ $t("form.type your email to send you a code for verfication") }}
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
          <button
            class="review-button mt-4 details-button d-block text-capitalize"
          >
            {{ $t("form.send") }}
          </button>
        </form>
      </div>
    </div>

    <VerificationModal
      @close="toggleVerifyModal"
      :verifyType="verifyType"
      :show="show"
    ></VerificationModal>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "VerifyEmail",
  data() {
    return {
      email: "",
      show: true,
      verifyType: "email",
    };
  },
  methods: {
    submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("");
      } else {
        this.$store
          .dispatch("auth/VerfiyEmail/checkVerfiyEmail", {
            email: this.email,
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

    toggleVerifyModal() {
      this.show = !this.show;
    },
  },
  validations: {
    email: {
      required,
      email,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/verifyEmail.scss";
</style>

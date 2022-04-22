<template>
  <div class="forgot-reset-change-password">
    <div class="logo-container">
      <img
        class="d-block logo"
        src="@/assets/images/logo/logo.png"
        alt="logo"
      />
    </div>
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
      <!-- Start Forgot password -->
      <transition name="moveUp">
        <!-- <div class="forgot-password" v-if="showForgotPassword"> -->
        <div class="forgot-password" v-if="start == 1">
          <h5 class="text-center description">
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
                <span
                  v-if="!$v.forgetPassword.email.email"
                  class="text-danger"
                  >{{ $t("validation.validemail") }}</span
                >
              </div>
            </div>
            <button class="submit-button d-block text-capitalize">
              {{ $t("form.send") }}
            </button>
          </form>
        </div>
      </transition>
      <!-- Start Forgot password -->

      <!-- Start Check Code password -->
      <transition name="moveUp">
        <!-- <div class="check-code" v-if="showCheckCode"> -->
        <div class="check-code" v-if="start == 2">
          <h5 class="text-center description">
            Enter Your Email And Reset Code To Reset Password
          </h5>
          <form
            action=""
            class="text-capitalize form"
            @submit.prevent="checkCode"
          >
            <div class="form-group">
              <label for="" class="form-label">email</label>
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
                  >email is required!</span
                >
                <span v-if="!$v.checkUserCode.email.email" class="text-danger"
                  >write a valid email</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="" class="form-label">Your Code</label>
              <div class="input-container">
                <input
                  class="form-input"
                  type="text"
                  v-model="checkUserCode.code"
                />
                <fa class="icon" icon="pen" />
              </div>
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.checkUserCode.code.required &&
                    $v.checkUserCode.code.$dirty
                  "
                  class="text-danger"
                  >code is required!</span
                >
              </div>
            </div>
            <button class="submit-button d-block text-capitalize">send</button>
          </form>
        </div>
      </transition>
      <!-- Start Check Code password -->

      <!-- Start Reset password -->
      <transition name="moveUp">
        <!-- <div class="check-code" v-if="showResetPassword"> -->
        <div class="check-code" v-if="start == 3">
          <h5 class="text-center description">
            Please Type The Password Correctly
          </h5>
          <form
            action=""
            class="text-capitalize form"
            @submit.prevent="resetPassword"
          >
            <div class="form-group">
              <label for="" class="form-label">password</label>
              <div class="input-container">
                <input
                  class="form-input"
                  type="password"
                  v-model="resetUserPassword.password"
                />
                <fa class="icon show-password" icon="eye" />
              </div>
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.resetUserPassword.password.required &&
                    $v.resetUserPassword.password.$dirty
                  "
                  class="text-danger"
                  >password is required!</span
                >
                <span
                  v-if="!$v.resetUserPassword.password.minLength"
                  class="text-danger"
                  >Password must be at least
                  {{ $v.resetUserPassword.password.$params.minLength.min }}
                  characters</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="" class="form-label">Confirm Password</label>
              <div class="input-container">
                <input
                  class="form-input"
                  type="password"
                  v-model="resetUserPassword.password_confirmation"
                />
                <fa class="icon show-password" icon="eye" />
              </div>
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.resetUserPassword.password_confirmation.required &&
                    $v.resetUserPassword.password_confirmation.$dirty
                  "
                  class="text-danger"
                  >confirmation password is required!</span
                ><br />
                <span
                  v-if="
                    !$v.resetUserPassword.password_confirmation.sameAsPassword
                  "
                  class="text-danger"
                  >confirmation password must be the same password</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="" class="form-label">Your Code</label>
              <div class="input-container">
                <input
                  class="form-input"
                  type="text"
                  v-model="resetUserPassword.reset_code"
                />
                <fa class="icon" icon="pen" />
              </div>
              <div class="validation-errors">
                <span
                  v-if="
                    !$v.resetUserPassword.reset_code.required &&
                    $v.resetUserPassword.reset_code.$dirty
                  "
                  class="text-danger"
                  >code is required!</span
                >
              </div>
            </div>
            <button class="submit-button d-block text-capitalize">
              Confirm
            </button>
          </form>
        </div>
      </transition>
      <!-- Start Reset password -->
    </div>
  </div>
</template>

<script>
import { append_Object_Items_ToFormData } from "@/axios/helpers";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Forgot_Reset_Change_Password",
  data() {
    return {
      start: 1,
      success: false,
      successMessage: "",
      error: "",
      forgetPassword: {
        email: "",
      },
      checkUserCode: {
        email: "",
        code: "",
      },
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
    forgotPassword() {
      this.$v.forgetPassword.$touch();
      if (this.$v.forgetPassword.$invalid) {
        console.log("error");
      } else {
        let email = append_Object_Items_ToFormData(this.forgetPassword);
        this.$store
          .dispatch("auth/ForgotPasswordModule/forgotPassword", email)
          .then((response) => {
            console.log(response);
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.error = error.response.data.errors.email;
          })
          .finally(() => {
            if (!this.showErrors) {
              this.success = true;
              this.start = 2;
            }
          });
      }
    },
    checkCode() {
      this.$v.checkUserCode.$touch();
      if (this.$v.checkUserCode.$invalid) {
        console.log("error");
      } else {
        let userCode = append_Object_Items_ToFormData(this.checkUserCode);
        this.$store
          .dispatch("auth/CheckCodeModule/checkUserCode", userCode)
          .then((response) => {
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.error = error.response.data.errors.email;
          })
          .finally(() => {
            if (!this.showErrors) {
              this.success = true;
              this.start = 3;
            }
          });
      }
    },

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
          .then(() => {
            this.$router.push({ name: "Registration" });
            console.log("resetUserPassword");
          });
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
.forgot-reset-change-password {
  padding: 120px 0;
  .logo-container {
    margin-bottom: 50px;
    box-shadow: 0 2px 6px -4px;
    padding: 0 0 20px;
    .logo {
      margin: 0 auto 40px;
      width: 120px;
      height: 120px;
      border-radius: 10px;
      box-shadow: 0 1px 12px rgba($black, 0.2);
    }
  }
  .form {
    .form-group {
      @extend %form-group;
      .form-label {
        @extend %form-label;
      }
      .input-container {
        @extend %input-container;
        .form-input {
          @extend %form-input;
        }
        .icon {
          @extend %form-icon;
          &.show-password {
            cursor: pointer;
          }
        }
      }
    }

    .submit-button {
      @extend %form-submit-button;
    }
  }
}

.moveUp-enter-active {
  animation: moveUp 0.8s ease-in;
}
.moveUp-leave-active {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
}
@keyframes moveUp {
  0% {
    transform: translateY(400px);
  }
  100% {
    transform: translateY(0);
  }
}
.validation-errors {
  @extend %validation-errors;
}
</style>

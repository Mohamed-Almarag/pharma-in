<template>
  <transition name="fade">
    <div class="form-modal-container verfication-modal clip-path" v-if="show">
      <div
        v-if="verifyType == 'without'"
        class="content form-modal text-center"
      >
        <span @click="close" class="close verify-close close-form-modal"
          ><fa class="icon" icon="times"
        /></span>
        <img
          class="d-block img"
          draggable="false"
          src="@/assets/images/verify/01.png"
          alt="verfication"
        />
        <h5 class="verfiy-title h2 text-capitalize">
          {{ $t("verify.Verfiy your email address") }}
        </h5>
        <p class="paragraph">
          {{ $t("verify.You have entered") }}
          <span class="pharma text-uppercase">{{
            $t("verify.pharma in")
          }}</span>
          {{ $t("verify.as the email address for your account") }}
        </p>
        <p class="paragraph">
          {{
            $t(
              "verify.Please verfiy this email address by cliking the button below"
            )
          }}
        </p>
        <router-link
          class="
            verfiy-link
            details-button
            mt-2
            review-button
            d-block
            text-center text-capitalize
          "
          :to="{ name: 'VerifyEmail' }"
          >{{ $t("verify.Verify your Email") }}</router-link
        >
      </div>
      <!-- with just an email  -->
      <div v-if="verifyType == 'email'" class="content form-modal text-center">
        <span @click="close" class="close verify-close close-form-modal"
          ><fa class="icon" icon="times"
        /></span>
        <img
          class="d-block img with-email"
          draggable="false"
          src="@/assets/images/verify/02.jpg"
          alt="verfication"
        />
        <h5 class="verfiy-title h2 text-capitalize">
          {{ $t("verify.Check your Email") }}
        </h5>
        <p class="paragraph">
          {{ $t("verify.we sent you") }}
        </p>
        <p class="paragraph">
          {{ $t("verify.Please check this email address") }}
        </p>
        <router-link
          class="
            verfiy-link
            details-button
            mt-2
            review-button
            d-block
            text-center text-capitalize
          "
          :to="{ name: 'VerifyCodeEmail' }"
          >{{ $t("verify.next") }}</router-link
        >
      </div>
      <!-- with email and code  -->
      <div
        v-if="verifyType == 'emailAndCode'"
        class="content form-modal text-center"
      >
        <!-- <span @click="close" class="close verify-close close-form-modal"
          ><fa class="icon" icon="times"
        /></span> -->
        <img
          class="d-block img with-email"
          draggable="false"
          src="@/assets/images/verify/03.png"
          alt="verfication"
        />
        <h5 class="verfiy-title h2 text-capitalize">
          {{ $t("verify.Email Verified") }}
        </h5>
        <p class="paragraph">
          {{ $t("verify.thanks for verfication") }}
        </p>
        <p class="paragraph">
          {{ $t("verify.Please complete your information") }}
        </p>
        <router-link
          class="
            verfiy-link
            details-button
            btn-verify
            mt-2
            review-button
            d-block
            text-center text-capitalize
          "
          :to="{ name: 'Signup' }"
          >{{ $t("verify.complete your information") }}</router-link
        >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "VerificationModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    verifyType: {
      type: String,
      default: "without",
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.verfication-modal {
  .content {
    border-radius: $radius;
    box-shadow: $box-shadow;
    height: auto;
    padding: 20px;
    .img {
      background-color: $bgcard;
      margin: auto;
      @media (min-width: 320px) and (max-width: 567px) {
        width: 280px;
      }
      &.with-email {
        width: 300px;
        @media (min-width: 320px) and (max-width: 567px) {
          width: 280px;
        }
      }
    }
    .verfiy-title {
      font-weight: bold;
      text-shadow: $text-shadow;
      color: $maincolor;
      margin: 20px 0;
      @media (min-width: 320px) and (max-width: 567px) {
        line-height: 2;
      }
    }
    .pharma {
      color: $maincolor;
    }
    .verfiy-link {
      text-decoration: none;
      &.btn-verify {
        width: 250px;
      }
    }
    .verify-close {
      border-radius: 25px;
    }
  }
}
</style>

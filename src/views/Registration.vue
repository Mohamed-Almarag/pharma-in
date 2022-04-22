<template>
  <div class="registration view-padding">
    <PhramaPreviewLogo></PhramaPreviewLogo>

    <div class="container">
      <!-- <div class="tabs-button text-center">
        <button class="switch-button text-capitalize">
          {{ $t("form.log in") }}
        </button>
        <button
          class="switch-button text-capitalize"
          @click="toggleVerifyModal"
        >
          {{ $t("form.sign up") }}
        </button>
      </div> -->
      <Login></Login>
      <span
        class="or d-block mb-5 text-uppercase text-center m-auto rounded-circle"
        >{{ $t("form.or") }}</span
      >
      <div class="new-account text-capitalize">
        <p class="paragraph text-center">
          {{ $t("form.you do not have an account") }}
          <button class="router-signup" @click="toggleVerifyModal">
            {{ $t("form.sign up") }}
          </button>
        </p>
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
import Login from "@/components/Registration/Login.vue";

export default {
  name: "Registration",
  data() {
    return {
      activeComponent: "Signup",
      show: false,
      verifyType: "without",
    };
  },
  components: {
    Login,
    // Signup,
  },
  methods: {
    toggleVerifyModal() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
  .tabs-button {
    display: flex;
    justify-content: center;
    gap: 50px;
    border-bottom: 1px solid rgba($bordercolor, 0.3);
    padding-bottom: 40px;
    .switch-button {
      border: none;
      box-shadow: $box-shadow;
      color: $textcolor;
      padding: 10px 20px;
      width: 150px;
      transition: 0.5s;
      border-radius: 7px;
      display: block;
      &.active,
      &:hover {
        background-color: $maincolor;
        color: $white;
      }
    }
  }
  .or {
    width: 50px;
    height: 50px;
    line-height: 50px;
    box-shadow: $box-shadow;
    color: $textcolor;
  }
  .new-account {
    .router-signup {
      color: $maincolor;
      border: none;
      background: none;
    }
  }
}
</style>

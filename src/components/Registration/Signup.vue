<template>
  <div class="sign-up view-padding">
    <p class="mb-5 paragraph text-center">
      {{ $t("form.Help You More") }}
    </p>
    <div class="buttons-container text-center">
      <button class="button person d-block text-capitalize">
        <router-link class="d-block link" :to="{ name: 'SignUpCustomer' }">{{
          $t("form.person")
        }}</router-link>
      </button>
      <button class="button d-block text-capitalize">
        <router-link class="d-block link" :to="{ name: 'SignUpCompany' }">{{
          $t("form.company")
        }}</router-link>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
};
</script>

<style lang="scss" scoped>
.sign-up {
  // padding: 50px 0;
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 50px;
    flex-wrap: wrap;
    .button {
      background-color: $maincolor;
      box-shadow: $box-shadow;
      transition: 0.5s;
      width: 170px;
      border: none;
      border-radius: 5px;
      padding: 0;

      &:hover {
        background-color: $secondcolor;
      }
      // &.person {
      //   background-color: $secondcolor;
      //   &:hover {
      //     background-color: $maincolor;
      //   }
      // }
      .link {
        padding: 8px;
        color: $white;
        text-decoration: none;
      }
    }
  }
}
</style>

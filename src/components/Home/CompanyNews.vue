<template>
  <div class="company-news pt-5">
    <div class="main-decription">
      <h2 class="main-section-title text-capitalize text-center">
        {{ $t("home.event") }} &amp; {{ $t("home.news") }}
      </h2>
      <p class="text-center text-capitalize paragraph">
        {{ $t("home.News And Events") }}
      </p>
    </div>
    <div class="back">
      <div
        class="presentation d-flex justify-content-around align-items-center"
      >
        <h3 class="titles text-capitalize">{{ $t("home.news") }}</h3>
        <h3 class="titles text-capitalize">{{ $t("home.event") }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyNews",
};
</script>

<style lang="scss" scoped>
.company-news {
  @media (min-width: 320px) and (min-width: 767px) {
    padding-top: 40px;
  }

  .back {
    padding: 25px 0;
  }
  .presentation {
    background-image: url("../../assets/images/homee/04.png");
    background-size: cover;
    height: 350px;
    position: relative;
    background-attachment: fixed;
    background-position: center center;
    &::before {
      position: absolute;
      content: "";
      inset: 0;
      background-color: rgba($black, 0.2);
    }
    .titles {
      color: $white;
      position: relative;
      z-index: 2;
      font-size: 30px;
    }
  }
}
</style>

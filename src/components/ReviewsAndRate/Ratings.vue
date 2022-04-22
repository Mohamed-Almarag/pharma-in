<template>
  <div class="rateable pharma-main-rate-container" v-if="ratings">
    <h5 class="section-heading text-capitalize">
      {{ $t("global.Users Rating") }}
    </h5>
    <div class="all-rates-container">
      <div
        class="
          pharma-user-rate
          d-flex
          justify-content-between
          align-items-center
          flex-wrap
        "
        v-for="rating in ratings"
        :key="rating.id"
      >
        <div class="user-rate-content d-flex align-items-center">
          <div class="rate-image-container">
            <img
              v-if="rating.photo"
              class="img-rate w-100 h-100"
              :src="rating.photo"
              alt="photo"
            />
            <img
              v-else
              class="img-rate w-100 h-100"
              src="@/assets/images/default.png"
              alt="photo"
            />
          </div>
          <div class="user-name-and-words text-capitalize">
            <h6 v-if="rating.user_id">{{ rating.user_id.name }}</h6>
            <p class="paragraph p-text">{{ rating.message }}</p>
          </div>
        </div>

        <div class="part-two">
          <rate :length="5" :value="rating.value" :disabled="true" />
          <span class="d-block paragraph text-center"
            >({{ rating.value }} / 5)</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ratings",
  props: {
    ratings: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>

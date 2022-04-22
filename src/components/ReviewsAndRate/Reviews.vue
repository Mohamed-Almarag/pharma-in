<template>
  <div class="pharma-main-rate-container" v-if="reviews">
    <h5 class="section-heading text-capitalize">
      {{ $t("global.Users Reviews") }}
    </h5>
    <div class="all-rates-container" v-for="review in reviews" :key="review.id">
      <div
        class="
          pharma-user-rate
          d-flex
          justify-content-between
          align-items-center
          flex-wrap
        "
      >
        <div class="user-rate-content d-flex align-items-center">
          <div class="rate-image-container">
            <img
              v-if="review.photo"
              class="img-rate w-100 h-100"
              :src="review.photo"
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
            <h6 v-if="review.user.name">{{ review.user.name }}</h6>
            <p class="paragraph p-text">{{ review.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reviews",
  props: {
    reviews: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="all-courses">
    <div class="row">
      <div
        class="every-course col-sm-6 col-lg-4"
        v-for="item in items"
        :key="item.id"
      >
        <div class="course-card-container">
          <div class="course-cover-photo shadow">
            <div
              class="for-icons d-flex justify-content-center align-items-center"
            >
              <router-link
                class="
                  single-details
                  item-details
                  rounded-circle
                  text-center
                  d-block
                "
                :to="`/courses/all-courses/${item.id}`"
                ><fa class="icon" icon="eye"
              /></router-link>
            </div>
            <img
              class="photo d-block w-100 h-100"
              draggable="false"
              :src="item.cover_photo"
              :alt="item.name"
            />
          </div>
          <div class="course-content">
            <div
              class="offers d-flex justify-content-between align-items-center"
            >
              <h6 class="name">{{ item.name | justSpecificWordsHeading }}</h6>
              <div class="prices d-flex align-items-center">
                <span class="d-block price old-price"
                  >{{ item.price }}<fa class="dollar" icon="dollar-sign"
                /></span>
                <span class="d-block price offer-price"
                  >{{ item.offer_price }}<fa class="dollar" icon="dollar-sign"
                /></span>
              </div>
            </div>
            <div class="course-description">
              <p class="description paragraph">
                {{ item.description | justSpecificWords }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      class="load-more-btn text-capitalize"
      :to="{ name: 'CoursesPage' }"
      >{{ $t("loadmore") }}</router-link
    >
  </div>
</template>

<script>
export default {
  name: "CoursesTypes",

  props: {
    items: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/pages/courses.scss";
</style>

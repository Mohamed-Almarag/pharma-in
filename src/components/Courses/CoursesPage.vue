<template>
  <div class="view-padding">
    <div class="container">
      <div class="row">
        <div
          class="pharma-card col-sm-6 col-lg-4"
          v-for="item in courses"
          :key="item.id"
        >
          <div class="card-container">
            <div class="cover-photo shadow">
              <div
                class="
                  for-icons
                  d-flex
                  justify-content-center
                  align-items-center
                "
              >
                <router-link
                  class="
                    single-details
                    item-details
                    rounded-circle
                    text-center
                    d-block
                    text-center
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
            <div class="card-content">
              <div
                class="offers d-flex justify-content-between align-items-center"
              >
                <h6 class="name">{{ item.name | justSpecificWordsHeading }}</h6>
                <div class="prices d-flex align-items-center">
                  <span class="d-block price old-price"
                    >{{ item.price }}<fa class="dollar" icon="dollar-sign"
                  /></span>
                  <span class="d-block price offer-price"
                    >{{ item.offer_price
                    }}<fa class="dollar" icon="dollar-sign"
                  /></span>
                </div>
              </div>
              <div class="card-description">
                <p class="description paragraph">
                  {{ item.description | justSpecificWords }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CoursesPage",
  computed: {
    ...mapState({
      courses: (state) => state.CoursesModule.allCourses,
    }),
  },
  mounted() {
    this.allCourses();
  },
  methods: {
    allCourses() {
      this.$store.dispatch(
        "CoursesModule/getCoursesData",
        this.$store.state.CoursesModule.courseType
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>

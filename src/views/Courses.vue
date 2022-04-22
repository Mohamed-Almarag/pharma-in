<template>
  <div class="view-padding">
    <Loading :loading="loading"></Loading>
    <DescriptionPages bgImage="coursesImage">
      <template #title>
        <div>
          <h2 class="title-page text-capitalize text-white">
            {{ $t("courses.courses") }}
          </h2>
        </div>
      </template>
    </DescriptionPages>
    <div class="container">
      <div class="top-rated-slider">
        <h3 class="title text-capitalize">
          {{ $t("courses.top") }} <span>{{ $t("courses.morePaiment") }}</span>
        </h3>
        <MainSlider :details="details" :sliders="courseSlider"></MainSlider>
      </div>
      <AllCourses></AllCourses>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AllCourses from "@/components/Courses/AllCourses.vue";
export default {
  name: "Courses",
  data() {
    return {
      activeComponent: "AllCourses",
      details: "courses/all-courses",
      loading: false,
    };
  },
  components: {
    AllCourses,
  },
  mounted() {
    this.sliderConent();
  },

  computed: {
    ...mapState({
      courseSlider: (state) => state.CoursesModule.courseSliderContent,
    }),
  },
  methods: {
    sliderConent() {
      this.loading = true;
      this.$store.dispatch("CoursesModule/getSliderContent").finally(() => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

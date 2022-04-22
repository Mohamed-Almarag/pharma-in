<template>
  <div>
    <Loading :loading="loading"></Loading>
    <div class="tabs-container courses">
      <div
        class="
          buttons
          d-flex
          justify-content-between
          align-items-center
          flex-wrap
        "
      >
        <button
          class="tabs d-block text-capitalize"
          :class="{ active: step == 1 }"
          @click="paidCourses"
        >
          {{ $t("courses.paid") }}
        </button>
        <button
          class="tabs d-block text-capitalize"
          :class="{ active: step == 2 }"
          @click="freeCourses"
        >
          {{ $t("courses.free") }}
        </button>
        <button
          class="tabs d-block text-capitalize"
          :class="{ active: step == 3 }"
          @click="sponsorCourses"
        >
          {{ $t("courses.sponsor") }}
        </button>
      </div>
    </div>

    <transition name="fade">
      <CoursesTypes :items="courses"></CoursesTypes>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CoursesTypes from "@/components/Courses/CoursesTypes.vue";
export default {
  name: "AllCourses",
  data() {
    return {
      loading: false,
      step: 1,
      paid: "paid",
      free: "free",
      sponsor: "sponsor",
    };
  },
  created() {
    this.$store.dispatch("CoursesModule/getCoursesData", this.paid);
  },
  computed: {
    ...mapState({
      courses: (state) => state.CoursesModule.allCourses,
    }),
  },
  methods: {
    paidCourses() {
      this.step = 1;
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getCoursesData", this.paid)
        .then(() => {
          this.$store.state.CoursesModule.courseType = this.paid;
          console.log(this.$store.state.CoursesModule.courseType);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    freeCourses() {
      this.step = 2;
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getCoursesData", this.free)
        .then(() => {
          this.$store.state.CoursesModule.courseType = this.free;
          console.log(this.$store.state.CoursesModule.courseType);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sponsorCourses() {
      this.step = 3;
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getCoursesData", this.sponsor)
        .then(() => {
          this.$store.state.CoursesModule.courseType = this.sponsor;
          console.log(this.$store.state.CoursesModule.courseType);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  components: {
    CoursesTypes,
  },
};
</script>

<style lang="scss" scoped></style>

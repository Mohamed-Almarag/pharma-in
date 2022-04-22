<template>
  <div class="all-jobs view-padding">
    <DescriptionPages bgImage="jobsImage">
      <template #title>
        <h2 class="title-page text-white text-capitalize">
          {{ $t("jobs.all jobs") }}
        </h2>
      </template>
    </DescriptionPages>
    <div class="container">
      <div class="top-jobs">
        <h3 class="section-heading mt-4 text-capitalize">
          {{ $t("jobs.Top") }} <span>{{ $t("jobs.jobs") }}</span>
        </h3>
        <MainSlider :details="details" :sliders="topRatedJobs"></MainSlider>
      </div>

      <div class="jobs pt-5">
        <div class="row">
          <div
            class="pharma-card col-sm-6 col-lg-4"
            v-for="item in publishedJobs"
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
                    :to="`/jobs/all-jobs/${item.id}`"
                    ><fa class="icon" icon="eye"
                  /></router-link>
                </div>
                <img
                  class="photo d-block w-100 h-100"
                  draggable="false"
                  :src="item.cover_photo"
                  :alt="item.title"
                />
              </div>

              <div class="card-content">
                <h6 class="name">
                  {{ item.address | justSpecificWordsHeading }}
                </h6>
                <div class="card-description">
                  <p class="paragraph description">
                    {{ item.description | littelWords }}
                  </p>
                </div>
                <div class="cardfooter guide">
                  <span class="d-block company" v-if="item.user">
                    {{ item.user.name_company }}
                  </span>
                  <span class="address d-block">{{ item.address }}</span>
                  <span class="date d-block">{{
                    item.create_dates.created_at_human
                  }}</span>
                </div>
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
  name: "AllJobs",
  data() {
    return {
      limit: 20,
      details: "jobs/all-jobs",
    };
  },
  mounted() {
    this.getPublishedJobs();
    this.getTopRatedJobs();
  },
  computed: {
    ...mapState({
      publishedJobs: (state) => state.JobsModule.publishedJobs,
      topRatedJobs: (state) => state.JobsModule.topRatedJobs,
    }),
  },
  methods: {
    getPublishedJobs() {
      this.$store.dispatch("JobsModule/getPublishedJobs", this.limit);
    },
    getTopRatedJobs() {
      this.$store.dispatch("JobsModule/getTopRatedJobs");
    },
  },
};
</script>

<style lang="scss" scoped></style>

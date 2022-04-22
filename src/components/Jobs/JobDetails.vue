<template>
  <div class="job-details view-padding" v-if="job">
    <Loading :loading="loading"></Loading>
    <div
      class="job-description d-flex align-items-center"
      :style="{
        backgroundImage: `url(${job.cover_photo})`,
      }"
    >
      <div class="container">
        <div class="main-description">
          <h5 class="title-job">{{ job.title }}</h5>
        </div>
      </div>
    </div>
    <transition name="fade">
      <Errors v-if="showErrors" :error="error">
        <template #errors>
          <div class="errors">
            <strong>{{ showErrors }} </strong>
            <!-- <strong v-for="(err, i) in showErrors" :key="i">{{ err }} </strong> -->
            <button
              @click="error = ''"
              type="button"
              class="btn-close close-alert"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </template>
      </Errors>
    </transition>
    <transition name="fade">
      <Success v-if="success" :success="success">
        <template #success>
          <div class="errors">
            <strong>{{ successMessage }} </strong>
            <button
              @click="success = ''"
              type="button"
              class="btn-close close-alert"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        </template>
      </Success>
    </transition>
    <div class="container">
      <div class="row">
        <div class="about-details mt-5 col-md-7 col-lg-8">
          <h5 class="section-heading text-capitalize">
            {{ $t("jobs.job") }} <span>{{ $t("jobs.details") }}</span>
          </h5>
          <div class="job-information">
            <div class="part-one">
              <h5 class="main-section-title mb-2">{{ job.title }}</h5>
              <p class="job-descriptions">{{ job.description }}</p>
              <div class="published d-flex align-items-center" v-if="job.user">
                <span class="address d-block">{{ job.address }}</span>
                <span class="date d-block" v-if="job.user.create_dates">{{
                  job.user.create_dates.created_at_human
                }}</span>
                <span>
                  {{ $t("jobs.salary") }}
                  <span class="salary">( {{ job.salary }} )</span></span
                >
                <span>
                  {{ $t("jobs.position number") }}
                  <span class="salary">( {{ job.position_no }} )</span></span
                >
              </div>

              <div class="job-types d-flex align-items-center">
                <div
                  class="every-type d-flex align-items-center text-capitalize"
                  v-for="item in job.type"
                  :key="item.id"
                >
                  <fa class="icon d-block" icon="suitcase" /><span
                    class="text d-block"
                    >{{ item }}</span
                  >
                </div>
              </div>
              <div class="pharma-tags-container d-flex flex-wrap">
                <span
                  class="d-block text-capitalize rounded-pill single-tag"
                  v-for="(item, index) in job.tags"
                  :key="index"
                >
                  {{ item }}
                </span>
              </div>

              <button
                @click="applayForJob(job.id)"
                class="text-capitalize details-button apply-for-job d-block"
              >
                {{ $t("jobs.apply") }}
              </button>
            </div>
            <div class="part-two">
              <div class="row">
                <div
                  @click="saveUserIdInStorage(job.user.id)"
                  class="company-photo col-md-6 col-lg-4"
                  v-if="job.user"
                >
                  <router-link
                    v-if="job.user.image"
                    :to="{ name: 'CompanyDetails' }"
                  >
                    <img
                      class="img w-100 h-100"
                      :src="job.user.image"
                      :alt="job.user.name"
                    />
                  </router-link>
                  <router-link v-else :to="{ name: 'CompanyDetails' }">
                    <img
                      class="img w-100 h-100"
                      src="@/assets/images/default.png"
                      alt="user-photo"
                    />
                  </router-link>
                </div>
                <div
                  class="company-infprmation col-md-6 col-lg-8"
                  v-if="job.user"
                >
                  <h6 class="instruct">
                    <fa class="icons" icon="user" /> {{ job.user.name }}
                  </h6>
                  <span class="d-block instruct"
                    ><fa class="icons" icon="envelope" /> {{ job.user.email }}
                  </span>
                  <span class="d-block instruct"
                    ><fa class="icons" icon="phone-alt" />
                    {{ job.user.phone }}</span
                  >
                  <span class="d-block instruct"
                    ><fa class="icons" icon="map-marker-alt" />
                    {{ job.user.country.name }} / {{ job.user.city.name }}</span
                  >
                  <span class="d-block instruct"
                    ><fa class="icons star" icon="star" />
                    {{ job.user.rate }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Start similar Jobs  -->
        <div class="top-rated-companies col-md-5 col-lg-4">
          <h5 class="section-heading text-capitalize">
            {{ $t("jobs.similar") }} <span>{{ $t("jobs.jobs") }}</span>
          </h5>
          <div class="top-company" v-for="item in similarJobs" :key="item.id">
            <div class="company-photo">
              <img
                class="img w-100 h-100"
                :src="item.cover_photo"
                :alt="item.title"
              />
            </div>
            <div class="company-content">
              <h6 class="company-name">
                {{ item.title }}
              </h6>
              <p class="company-desc">
                {{ item.description | justSpecificWords }}
              </p>
            </div>
          </div>
        </div>
        <!-- End similar Jobs  -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "JobDetails",
  data() {
    return {
      loading: false,
      success: false,
      successMessage: "",
      error: "",
      completePortofolio: false,
      userId: null,
      userPortfolio: {},
      job_id: null,
    };
  },

  mounted() {
    this.getJobDetails();
    this.getSimilarJobs();
  },
  computed: {
    ...mapState({
      job: (state) => state.JobsModule.everyJobDetails,
      similarJobs: (state) => state.JobsModule.similarJobs,
    }),
    showErrors() {
      return this.error;
    },
  },
  methods: {
    getJobDetails() {
      this.$store.dispatch("JobsModule/getJobDetails", this.$route.params.id);
    },
    getSimilarJobs() {
      this.loading = true;
      this.$store
        .dispatch("JobsModule/getSimilarJobs", this.$route.params.id)
        .finally(() => {
          this.loading = false;
        });
    },
    applayForJob(id) {
      this.loading = true;
      let data = new FormData();
      data.append("job_id", id);
      this.$store
        .dispatch("JobsModule/applyForJob", data)
        .then((response) => {
          this.successMessage = response.data.message;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        })
        .finally(() => {
          this.loading = false;
          if (!this.showErrors) {
            this.success = true;
          }
        });
    },
    saveUserIdInStorage(id) {
      let comapnyId = id;
      localStorage.setItem("company-id", comapnyId);
    },
  },
};
</script>

<style lang="scss" scoped>
.job-details {
  .job-description {
    height: 70vh;
    background-size: cover;
    background-position: center center;
    flex-direction: column-reverse;
    position: relative;
    &::before {
      position: absolute;
      content: "";
      inset: 0;
      background-color: rgba($black, 0.3);
    }
    .main-description {
      margin-bottom: 80px;
      position: relative;
      z-index: 4;
      .title-job {
        color: $white;
        width: fit-content;
        background-color: $secondcolor;
        padding: 5px 15px;
      }
    }
  }
  .about-details {
    .job-information {
      .part-one {
        .job-title {
          margin-bottom: 20px;
        }
        .job-descriptions {
          color: $textcolor;
          line-height: 2;
          font-size: 1rem;
        }
        .published {
          gap: 50px;
          margin-bottom: 20px;
          color: $textcolor;
          @media (min-width: 320px) and (max-width: 767px) {
            gap: 20px;
            flex-wrap: wrap;
          }
          .salary {
            color: $secondcolor;
          }
        }
        .job-types {
          gap: 30px;
          margin-bottom: 20px;
          .every-type {
            gap: 10px;
            .icon {
              color: $secondcolor;
            }
            .text {
              color: $textcolor;
            }
          }
        }
      }
    }
    .part-two {
      padding: 20px;
      background-color: $bgcard;
      border-radius: $radius;
      margin-top: 60px;

      .company-photo {
        height: $photo-height;
        @media (min-width: 320px) and (max-width: 767px) {
          margin-bottom: 20px;
        }
        .img {
          cursor: pointer;
          border-radius: $radius;
        }
      }
      .instruct {
        margin-bottom: 20px;
        color: $textcolor;
      }
      .icons {
        color: $maincolor;
        margin: 0 5px;
        &.star {
          color: $ratecolor;
        }
      }
    }
  }
  .top-rated-companies {
    margin: 30px 0 0;
    @media (min-width: 320px) and (max-width: 767px) {
      margin: 30px 0 0;
    }
    // .top-title {
    //   @extend %heading;
    // }
    .top-company {
      display: flex;
      gap: 30px;
      margin-bottom: 25px;
      box-shadow: $chat-shadow;
      padding: 20px 10px;
      transition: $transition;
      &:hover {
        background-color: $bgcard;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        display: block !important;
      }
      @media (min-width: 320px) and (max-width: 767px) {
        gap: 15px;
      }
      .company-photo {
        height: 100px;
        width: 270px;
        @media (min-width: 768px) and (max-width: 991px) {
          width: auto;
          height: 220px;
        }
      }
      .company-content {
        .company-name {
          color: $textcolor2;
          @media (min-width: 768px) and (max-width: 991px) {
            margin-top: 20px;
          }
        }
        .company-desc {
          color: $textcolor;
          line-height: 2;
          font-size: 0.8rem;
          margin: 0;
        }
      }
    }
  }
}
</style>

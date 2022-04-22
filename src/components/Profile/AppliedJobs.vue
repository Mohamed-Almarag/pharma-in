<template>
  <div class="applied-jobs">
    <Loading :loading="loading"></Loading>
    <!-- fro customer v-if="userType == 'customer'" v-else -->
    <div class="for-customer" v-if="userType == 'customer'">
      <div class="row">
        <div
          class="all-jobs col-lg-4 col-md-6"
          v-for="job in allJobs"
          :key="job.id"
          :class="{ 'd-none': job.job == null }"
        >
          <div class="every-job" v-if="job.job">
            <div class="cover-photo shadow">
              <img
                :src="job.job.cover_photo"
                :alt="job.job.title"
                class="img w-100 h-100"
              />
            </div>
            <div class="content">
              <h6 class="title">
                {{ job.job.title | justSpecificWordsHeading }}
              </h6>
              <p class="description">
                {{ job.job.description | justSpecificWords }}
              </p>
            </div>
            <div
              class="details d-flex justify-content-between align-items-center"
            >
              <span
                class="
                  d-block
                  status-job
                  shadow-sm
                  rounded-pill
                  text-capitalize
                "
                >{{ job.job.status }}</span
              >
              <router-link
                class="
                  text-capitalize
                  shadow-sm
                  d-block
                  go-job-details
                  text-center
                "
                :to="`/jobs/all-jobs/${job.id}`"
                ><fa class="icon" icon="eye"
              /></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- for customer  -->
    <div class="company" v-else>
      <CompanyJobs></CompanyJobs>
    </div>
  </div>
</template>

<script>
import CompanyJobs from "../../components/Profile/CompanyJobs.vue";
import { mapState } from "vuex";
export default {
  name: "AppliedJobs",
  data() {
    return {
      loading: false,
      userType: null,
    };
  },
  computed: {
    ...mapState({
      allJobs: (state) => state.ProfileModule.appliedJobs,
    }),
  },
  mounted() {
    this.appliedJobs();
    let type = JSON.parse(localStorage.getItem("user-data")).type;
    this.userType = type;
  },
  methods: {
    appliedJobs() {
      this.loading = true;
      this.$store.dispatch("ProfileModule/getUserAppliedJobs").finally(() => {
        this.loading = false;
      });
    },
  },
  components: { CompanyJobs },
};
</script>

<style lang="scss" scoped>
.applied-jobs {
  .for-customer {
    .all-jobs {
      .every-job {
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 40px;
        background-color: #eee;
        &:hover {
          .img {
            transform: scale(1.2);
          }
        }
        .cover-photo {
          border-radius: 10px;
          height: 230px;
          overflow: hidden;
          .img {
            transition: 0.5s;
          }
        }
        .content {
          padding: 25px 0 0;
          .title {
            color: $textcolor2;
            margin-bottom: 15px;
            font-weight: bold;
          }
          .description {
            margin-bottom: 20px;
            color: $textcolor;
          }
        }
        .details {
          .status-job {
            background-color: $secondcolor;
            width: fit-content;
            padding: 7px 20px;
            color: $white;
          }
          .go-job-details {
            width: 35px;
            line-height: 35px;
            height: 35px;
            transition: 0.5s;
            color: $textcolor;
            color: $maincolor;
            border-radius: 50%;
            box-shadow: $box-shadow;
            box-shadow: 0 1px 12px rgba($black, 0.4);
            &:hover {
              background-color: $maincolor;
              color: $white;
            }
            .icon {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>

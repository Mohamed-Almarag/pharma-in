<template>
  <div class="all-information mt-5">
    <!-- <suggested-job-searches></suggested-job-searches> -->
    <div class="container">
      <div class="main-content">
        <div class="row">
          <div class="part-one col-md-7 col-lg-8">
            <h5 class="section-heading">
              {{ $t("jobs.Opportunities Available Now") }}
            </h5>
            <div
              class="every-job-container"
              v-for="item in publishedJobs"
              :key="item.id"
              @click="getUserJobsOrganizer(item.user)"
            >
              <div class="row">
                <div class="photo col-lg-4">
                  <img
                    draggable="false"
                    :src="item.cover_photo"
                    :alt="item.title"
                    class="img w-100 h-100"
                  />
                </div>
                <div class="content col-lg-8">
                  <h6 class="title">{{ item.title }}</h6>
                  <p class="description" v-if="item.user">
                    {{ item.user.name_company }}
                  </p>
                  <p class="description">{{ $t("jobs.description") }}</p>
                  <span class="address d-block" :test="item.address">{{
                    item.address
                  }}</span>
                  <span class="date d-block">{{
                    item.create_dates.created_at_human
                  }}</span>
                  <div class="link-container">
                    <router-link
                      class="link text-capitalize"
                      :to="`/jobs/all-jobs/${item.id}`"
                      >more</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
            <router-link
              class="load-more-btn text-capitalize"
              :to="{ name: 'AllJobs' }"
              >{{ $t("global.load more") }}</router-link
            >
          </div>

          <div class="part-two col-md-5 col-lg-4">
            <h5 class="section-heading">
              {{ $t("jobs.We Are Looking For A Dentist") }}
            </h5>
            <div class="company-details" v-if="jobsOrganizer">
              <div class="photo" @click="saveUserIdInStorage(jobsOrganizer.id)">
                <router-link
                  v-if="jobsOrganizer.image"
                  :to="{ name: 'CompanyDetails' }"
                >
                  <img
                    class="img w-100 h-100"
                    :src="jobsOrganizer.image"
                    :alt="jobsOrganizer.name"
                  />
                </router-link>
                <router-link v-else :to="{ name: 'CompanyDetails' }">
                  <img
                    class="img w-100 h-100"
                    src="../../assets/images/courses/05.png"
                  />
                </router-link>
              </div>
              <div class="content">
                <h6 class="d-block instruct">
                  <fa class="icons" icon="user" /> {{ jobsOrganizer.name }}
                </h6>
                <span class="d-block instruct"
                  ><fa class="icons" icon="envelope" />{{
                    jobsOrganizer.email
                  }}</span
                >
                <span class="d-block instruct"
                  ><fa class="icons" icon="phone-alt" />
                  {{ jobsOrganizer.phone }}</span
                >
                <span
                  class="d-block instruct"
                  v-if="jobsOrganizer.country && jobsOrganizer.city"
                  ><fa class="icons" icon="map-marker-alt" />
                  {{ jobsOrganizer.country.name }} /
                  {{ jobsOrganizer.city.name }}</span
                >
                <span class="d-block instruct"
                  ><fa class="icons star" icon="star" />
                  {{ jobsOrganizer.rate }}</span
                >
                <span class="d-block instruct" v-if="jobsOrganizer.name_company"
                  ><fa class="icons" icon="building" />
                  {{ jobsOrganizer.name_company }}</span
                >
                <!-- <span><fa icon="building" /></span> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SuggestedJobSearches from "@/components/Jobs/SuggestedJobSearches.vue";
import { mapState } from "vuex";
export default {
  name: "AllInformation",
  data() {
    return {
      limit: 4,
      jobsOrganizer: {},
    };
  },

  mounted() {
    this.getPublishedJobs();
  },
  computed: {
    ...mapState({
      publishedJobs: (state) => state.JobsModule.publishedJobs,
    }),
  },
  methods: {
    getPublishedJobs() {
      this.$store
        .dispatch("JobsModule/getPublishedJobs", this.limit)
        .then((response) => {
          let data = response.data.data.data;
          this.jobsOrganizer = data[0].user;
        });
    },
    getUserJobsOrganizer(userItem) {
      this.jobsOrganizer = userItem;
      console.log(userItem);
    },
    saveUserIdInStorage(id) {
      let comapnyId = id;
      localStorage.setItem("company-id", comapnyId);
      // this.$router.go(0);
    },
  },
  components: {
    // SuggestedJobSearches,
  },
};
</script>

<style lang="scss" scoped>
.all-information {
  .main-content {
    .part-one {
      .every-job-container {
        margin-bottom: 30px;
        padding: 20px 10px;
        box-shadow: $chat-shadow;
        transition: $transition;
        cursor: pointer;
        &:hover {
          background-color: $bgcard;
        }
        .photo {
          height: 200px;
          .img {
          }
        }
        .content {
          .title {
            color: $textcolor2;
            @media (min-width: 320px) and(max-width:991px) {
              margin-top: 20px;
            }
          }
          .description {
            margin: 0;
            color: $textcolor;
            margin-top: 20px;
          }
          .address {
            color: $textcolor;
            margin: 10px 0 20px;
          }
          .date {
            color: $secondcolor;
          }
          .link-container {
            display: flex;
            flex-direction: row-reverse;
            margin-top: 20px;
            .link {
              color: $white;
              padding: 8px;
              text-decoration: none;
              background-color: $maincolor;
              box-shadow: $box-shadow;
              display: inline-block;
              transition: $transition;
              width: 150px;
              text-align: center;
              &:hover {
                background-color: $secondcolor;
              }
            }
          }
        }
      }
    }
    .part-two {
      @media (min-width: 320px) and (max-width: 767px) {
        margin-top: 40px;
      }
      .company-details {
        box-shadow: $chat-shadow;
        padding-bottom: 10px;
        transition: $transition;
        &:hover {
          background-color: $bgcard;
        }
        .photo {
          height: $photo-height;
          margin-bottom: 20px;
          .img {
            transition: $transition;
            filter: brightness(0.7);
            &:hover {
              filter: brightness(1);
            }
          }
        }
        .content {
          padding: 0 10px;
          .instruct {
            margin-bottom: 20px;
            color: $textcolor;
          }
          .icons {
            color: $secondcolor;
            margin: 0 7px;
            &.star {
              color: $ratecolor;
            }
          }
        }
      }
    }
  }
}
</style>

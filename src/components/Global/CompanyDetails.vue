<template>
  <div class="view-padding company-details" v-if="companyInformation">
    <Loading :loading="loading"></Loading>
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
      <div class="content" v-for="item in companyInformation" :key="item.id">
        <div class="row">
          <div class="information col-md-6">
            <h5 class="instruct">
              <fa class="icons" icon="user" /> {{ item.name }}
            </h5>
            <span class="d-block instruct"
              ><fa class="icons" icon="envelope" /> {{ item.email }}
            </span>
            <span class="d-block instruct"
              ><fa class="icons" icon="phone-alt" /> {{ item.phone }}</span
            >
            <span class="d-block instruct"
              ><fa class="icons" icon="map-marker-alt" />
              {{ item.country.name }} / {{ item.city.name }}</span
            >
            <span class="d-block instruct"
              ><fa class="icons star" icon="star" /> {{ item.rate }}</span
            >
            <button
              @click="followCompany(item.id)"
              class="follow-company details-button"
            >
              {{ $t("global.Follow Company") }}
            </button>
          </div>
          <div class="photo col-md-6">
            <img
              v-if="item.image"
              class="img w-100 h-100"
              :src="item.image"
              :alt="item.name"
            />
            <img
              v-else
              class="img w-100 h-100"
              src="@/assets/images/default.png"
              alt="company"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CompanyDetails",
  data() {
    return {
      companyId: "",
      error: "",
      success: false,
      successMessage: "",
      loading: false,
    };
  },
  mounted() {
    let compId = localStorage.getItem("company-id");
    this.companyId = compId;
    if (compId) {
      this.CompanyDetails();
    }
  },
  computed: {
    ...mapState({
      companyInformation: (state) => state.JobsModule.companyDetails,
    }),
    showErrors() {
      return this.error;
    },
    updateCompanyId() {
      return this.companyId;
    },
  },
  methods: {
    CompanyDetails() {
      this.loading = true;
      this.$store
        .dispatch("JobsModule/getCompanyDetails", this.companyId)
        .then(() => {
          (function () {
            if (window.localStorage) {
              if (!localStorage.getItem("firstLoad")) {
                localStorage["firstLoad"] = true;
                window.location.reload();
              } else localStorage.removeItem("firstLoad");
            }
          })();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    followCompany(id) {
      this.loading = true;
      this.$store
        .dispatch(
          "EventsAndNewsModule/FollowingCompanyModule/followingCompany",
          { company_id: id }
        )
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
  },
};
</script>

<style lang="scss" scoped>
.company-details {
  .content {
    box-shadow: $chat-shadow;
    padding: 20px;
    border-radius: $radius;
    .information {
      @media (min-width: 320px) and (max-width: 767px) {
        margin-bottom: 50px;
      }
      .instruct {
        margin-bottom: 20px;
        color: $textcolor;
      }
      .icons {
        color: $secondcolor;
        margin: 0 8px;
        &.star {
          color: $ratecolor;
        }
      }
    }
    .photo {
      height: 350px;

      .img {
        transition: $transition;
        border-radius: $radius;
        filter: brightness(0.7);
        &:hover {
          filter: brightness(1);
        }
      }
    }
  }
}
</style>

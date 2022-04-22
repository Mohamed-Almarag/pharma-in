<template>
  <div class="single-details view-padding" v-if="company">
    <Loading :loading="loading"></Loading>
    <!-- Start Company Cover Photo -->
    <div
      class="company-descriptions d-flex align-items-center"
      :style="{
        backgroundImage: `url(${company.cover_photo})`,
      }"
    >
      <div class="container">
        <div class="every-everything">
          <h5 class="every-name" v-if="company.Type">
            {{ company.Type.name }}
          </h5>
          <p class="every-p">{{ company.name }}</p>
        </div>
      </div>
    </div>
    <!-- End Company Cover Photo -->

    <div class="container">
      <div class="row">
        <div class="all-details-things col-md-7 col-lg-8">
          <!-- Start Details  -->
          <div class="description">
            <h3 class="desc-title section-heading">Description</h3>
            <p class="desc-p">{{ company.description }}</p>
          </div>
          <!-- <div class="pharma-tags-container d-flex flex-wrap">
            <span
              class="d-block text-capitalize rounded-pill single-tag"
              v-for="(item, index) in tags"
              :key="index"
            >
              {{ item }}
            </span>
          </div> -->
          <!-- Start Details  -->

          <!-- Start Contact Company  -->
          <div class="contact-company">
            <ul class="list-unstyled contacts-list">
              <li class="item">
                <fa class="icons" icon="phone-alt" />
                <span class="social">{{ company.phone }}</span>
              </li>
              <li class="item">
                <fa class="icons" icon="envelope" />
                <span class="social">{{ company.email }}</span>
              </li>
              <li class="item">
                <fa class="icons" icon="map-marker-alt" />
                <span class="social">{{ company.address }}</span>
              </li>
            </ul>
          </div>
          <!-- Start Contact Company  -->

          <!-- Start All Comments  -->
          <Reviews :reviews="company.comment"></Reviews>
          <div class="pharma-add-rate-form-container">
            <h5 class="section-heading text-capitalize">
              {{ $t("global.add a review") }}
            </h5>
            <form
              class="text-capitalize pharma-add-rate-form"
              action=""
              @submit.prevent="addReview(company.id)"
            >
              <div class="form-group">
                <textarea
                  class="textarea input-focus d-block"
                  v-model="review.note"
                ></textarea>
                <div class="validation-errors">
                  <span
                    v-if="!$v.review.note.required && $v.review.note.$dirty"
                    class="text-danger"
                    >{{ $t("global.empty review") }}</span
                  >
                </div>
              </div>
              <transition name="swip">
                <div class="preview-container-image" v-if="commentImagePreview">
                  <img
                    draggable="false"
                    class="preview-image d-block m-auto"
                    :src="commentImagePreview"
                    alt="preview"
                  />
                </div>
              </transition>

              <div class="form-group choose-photo-container">
                <label class="choose-label d-block text-capitalize">{{
                  $t("global.choose photo")
                }}</label>
                <div class="choose-photo">
                  <label
                    class="
                      upload-photo
                      d-flex
                      justify-content-center
                      align-items-center
                      rounded-circle
                    "
                    for="photo"
                    ><fa class="icon" icon="camera"
                  /></label>
                  <input
                    @change="handleUploadFileImage($event)"
                    class="file-input"
                    type="file"
                    id="photo"
                  />
                </div>
              </div>
              <button class="text-capitalize details-button review-button">
                {{ $t("global.add review button") }}
              </button>
            </form>
          </div>
          <!-- End All Comments  -->

          <!-- Start All Rating -->
          <Ratings :ratings="company.rate"></Ratings>
          <div class="pharma-add-rate-form-container text-capitalize">
            <h5 class="section-heading text-capitalize">
              {{ $t("global.add Rating") }}
            </h5>
            <form
              class="text-capitalize pharma-add-rate-form"
              action=""
              @submit.prevent="addRate(company.id)"
            >
              <div class="form-group">
                <textarea
                  class="textarea input-focus d-block"
                  v-model="rate.message"
                ></textarea>
                <div class="validation-errors">
                  <span
                    v-if="!$v.rate.message.required && $v.rate.message.$dirty"
                    class="text-danger"
                    >{{ $t("global.empty rate") }}</span
                  >
                </div>
              </div>
              <div class="form-group stars-rating">
                <h6>{{ $t("global.stars rating") }}</h6>
                <rate :length="5" v-model="rate.value" />
                <div class="validation-errors">
                  <span
                    v-if="!$v.rate.value.required && $v.rate.value.$dirty"
                    class="text-danger"
                    >{{ $t("validation.rate value") }}</span
                  >
                </div>
              </div>

              <transition name="swip">
                <div class="preview-container-image" v-if="imagePreview">
                  <img
                    draggable="false"
                    class="preview-image d-block m-auto"
                    :src="imagePreview"
                    alt="preview"
                  />
                </div>
              </transition>

              <div class="form-group choose-photo-container">
                <label class="choose-label d-block text-capitalize">{{
                  $t("global.choose photo")
                }}</label>
                <div class="choose-photo">
                  <label
                    class="
                      upload-photo
                      d-flex
                      justify-content-center
                      align-items-center
                      rounded-circle
                    "
                    for="my-photo"
                    ><fa class="icon" icon="camera"
                  /></label>
                  <input
                    @change="handleUploadFileImageForRating($event)"
                    class="file-input"
                    type="file"
                    id="my-photo"
                  />
                </div>
              </div>

              <button class="text-capitalize details-button review-button">
                {{ $t("global.add rate button") }}
              </button>
            </form>
          </div>
          <!-- End All Rating -->
        </div>
        <!-- Start Top Companies Rate -->
        <div class="top-rated-companies col-md-5 col-lg-4">
          <h5 class="section-heading text-capitalize">
            Popular <span>companies</span>
          </h5>
          <div class="top-company" v-for="item in topCompanies" :key="item.id">
            <div class="company-photo">
              <img
                class="img w-100 h-100"
                :src="item.cover_photo"
                :alt="item.name"
              />
            </div>
            <div class="company-content">
              <h6 class="company-name">
                {{ item.name }}
              </h6>
              <p class="company-desc">
                {{ item.description | justSpecificWords }}
              </p>
            </div>
          </div>
        </div>
        <!-- End Top Companies Rate -->
      </div>
    </div>
  </div>
</template>

<script>
import Reviews from "@/components/ReviewsAndRate/Reviews.vue";
import Ratings from "@/components/ReviewsAndRate/Ratings.vue";
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  name: "HospitalsDetails",
  data() {
    return {
      reviewType: "company",
      loading: false,
      reader: new FileReader(),
      imagePreview: null,
      commentImagePreview: null,
      review: {
        note: null,
        photo: null,
        type: "company",
        id_type: null,
        reader: new FileReader(),
      },
      rate: {
        value: null,
        message: null,
        type: "company",
        id_type: null,
        photo: null,
      },
    };
  },
  components: {
    Reviews,
    Ratings,
  },
  created() {
    this.reader.onload = () => {
      this.imagePreview = this.reader.result;
    };
    this.review.reader.onload = () => {
      this.commentImagePreview = this.review.reader.result;
    };
  },
  mounted() {
    this.singleCompany();
    this.getTopCompaniesRating();
    this.allReviews();
    this.allRatings();
  },
  computed: {
    ...mapState({
      company: (state) => state.GuideModule.GuideDetails.singleGuideDetails,
      topCompanies: (state) => state.GuideModule.GuideDetails.guideTopMedicine,
      reviews: (state) => state.EventsAndNewsModule.ReviewsModule.allReviews,
      ratings: (state) => state.EventsAndNewsModule.RatingModule.allUserRatings,
    }),
    sendReviewsId() {
      return this.$route.params.id;
    },
  },
  methods: {
    singleCompany() {
      this.$store.dispatch(
        "GuideModule/GuideDetails/getSingleCompany",
        this.$route.params.id
      );
    },
    allReviews() {
      this.$store.dispatch("EventsAndNewsModule/ReviewsModule/getAllReviews", [
        this.reviewType,
        this.sendReviewsId,
      ]);
    },
    allRatings() {
      this.$store.dispatch("EventsAndNewsModule/RatingModule/getAllRatings", [
        this.reviewType,
        this.sendReviewsId,
      ]);
    },
    getTopCompaniesRating() {
      this.$store.dispatch("GuideModule/GuideDetails/getTopMedicine");
    },
    addReview(idtype) {
      this.$v.review.$touch();
      if (this.$v.review.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let userReview = new FormData();
        userReview.append("note", this.review.note);
        userReview.append("type", this.review.type);
        userReview.append("id_type", idtype);
        if (this.review.photo != null) {
          userReview.append("photo", this.review.photo);
        }

        this.$store
          .dispatch(
            "EventsAndNewsModule/ReviewsModule/addCompanyReview",
            userReview
          )
          .then(() => {
            this.singleCompany();
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    addRate(rateId) {
      this.$v.rate.$touch();
      if (this.$v.rate.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let userRate = new FormData();
        userRate.append("value", this.rate.value);
        userRate.append("message", this.rate.message);
        userRate.append("type", this.rate.type);
        userRate.append("id_type", rateId);
        if (this.rate.photo != null) {
          userRate.append("photo", this.rate.photo);
        }
        this.$store
          .dispatch("EventsAndNewsModule/RatingModule/addCompanyRate", userRate)
          .then(() => {
            this.singleCompany();
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    handleUploadFileImage(event) {
      this.review.photo = event.target.files[0];
      this.review.reader.readAsDataURL(this.review.photo);
    },
    handleUploadFileImageForRating(event) {
      this.rate.photo = event.target.files[0];
      this.reader.readAsDataURL(this.rate.photo);
    },
  },
  validations: {
    review: {
      note: {
        required,
      },
    },
    rate: {
      message: {
        required,
      },
      value: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.single-details {
  .company-descriptions {
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
    .every-everything {
      margin-bottom: 80px;
      position: relative;
      z-index: 4;
      .every-name {
        color: $white;
        width: fit-content;
        background-color: $secondcolor;
        padding: 5px 15px;
      }
      .every-p {
        color: $white;
        margin: 20px 0 0;
        font-weight: bold;
      }
    }
  }
  .all-details-things {
    .description {
      padding: 30px 0 50px;
      .desc-title {
        color: $maincolor;
        margin-bottom: 20px;
      }
      .desc-p {
        color: $textcolor;
        font-size: 1rem;
        line-height: 2;
      }
    }

    .contact-company {
      .contacts-list {
        .item {
          margin-bottom: 20px;
          .icons {
            color: $maincolor;
          }
          .social {
            color: $textcolor;
            margin: 0 10px;
          }
        }
      }
    }
  }
  .top-rated-companies {
    margin: 30px 0 50px;
    @media (min-width: 320px) and (max-width: 767px) {
      margin: 30px 0 0;
    }

    .top-company {
      display: flex;
      gap: 20px;
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
        display: block !important;
      }
      .company-photo {
        height: 100px;
        width: 270px;
        img {
          object-fit: cover;
        }
        @media (min-width: 320px) and (max-width: 991px) {
          width: auto;
          height: 220px;
          margin: auto;
        }
      }
      .company-content {
        .company-name {
          color: $textcolor2;
          @media (min-width: 320px) and (max-width: 991px) {
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

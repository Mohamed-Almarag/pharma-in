<template>
  <div class="single-details view-padding" v-if="news">
    <Loading :loading="loading"></Loading>
    <div
      class="details-description d-flex align-items-center"
      :style="{
        backgroundImage: `url(${news.cover_photo})`,
      }"
    >
      <div class="container">
        <div class="every-everything">
          <h5 class="every-name">{{ news.name }}</h5>
          <p class="every-p">
            <fa class="every-icon" icon="clock" /> {{ news.time }}
          </p>
          <p class="every-p">
            <fa class="every-icon" icon="calendar" />
            {{ news.date }}
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="all-details-things col-md-7 col-lg-8">
          <div class="description">
            <h3 class="single-head section-heading">{{ $t("event.news") }}</h3>
            <p class="paragraph">{{ news.description }}</p>
          </div>
          <div class="pharma-tags-container d-flex flex-wrap">
            <span
              class="d-block text-capitalize rounded-pill single-tag"
              v-for="(item, index) in news.tags"
              :key="index"
            >
              {{ item }}
            </span>
          </div>
          <div class="time-types">
            <ul
              class="
                lists-items
                list-unstyled
                text-capitalize
                d-flex
                justify-content-between
                flex-wrap
              "
            >
              <li class="items">
                <h6>{{ $t("event.Timings") }}</h6>
                <span class="d-block">{{ news.time }}</span>
              </li>
              <li class="items">
                <h6>{{ $t("event.Entry Fees") }}</h6>
                <span class="d-block">{{
                  $t("event.Free Ticket For Industry Professionals")
                }}</span>
              </li>
              <li class="items">
                <h6>{{ $t("event.Editions") }}</h6>
                <span class="d-block">{{ news.date }}</span>
              </li>
              <li class="items">
                <h6>{{ $t("event.address") }}</h6>
                <span class="d-block">{{ news.address }}</span>
              </li>
              <li class="items">
                <h6>{{ $t("event.Category") }} &amp; {{ $t("event.Type") }}</h6>
                <span v-if="news.type" class="d-block">{{
                  news.type.name
                }}</span>
              </li>
            </ul>
          </div>

          <div class="organizer-information" v-if="news.organize">
            <div class="row">
              <div class="one col-md-6 col-lg-4">
                <img
                  v-if="news.organize.image"
                  class="img w-100 h-100"
                  :src="news.organize.image"
                  :alt="news.organize.name"
                />
                <img
                  v-else
                  class="img w-100 h-100"
                  src="@/assets/images/default.png"
                  alt="user-photo"
                />
              </div>
              <div class="two col-md-6 col-lg-8">
                <h6 class="instruct">
                  <fa class="icons" icon="user" /> {{ news.organize.name }}
                </h6>
                <span class="d-block instruct"
                  ><fa class="icons" icon="envelope" />
                  {{ news.organize.email }}
                </span>
                <span class="d-block instruct"
                  ><fa class="icons" icon="phone-alt" />
                  {{ news.organize.phone }}</span
                >
                <span class="d-block instruct"
                  ><fa class="icons" icon="map-marker-alt" />
                  {{ news.organize.country.name }} /
                  {{ news.organize.city.name }}</span
                >
                <span class="d-block instruct"
                  ><fa class="icons star" icon="star" />
                  {{ news.organize.rate }}</span
                >
              </div>
            </div>
            <div class="following">
              <button
                @click="followCompany(news.organize.id)"
                class="follow-company details-button"
              >
                {{ $t("global.Follow Company") }}
              </button>
            </div>
          </div>
          <transition name="fade">
            <Errors v-if="rateError" :error="rateError">
              <template #errors>
                <div class="errors">
                  <strong v-for="(err, i) in rateError" :key="i"
                    >{{ err }}
                  </strong>
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
            <Success v-if="success" :success="success" key="success">
              <template #success>
                <div class="errors">
                  <strong v-for="(err, i) in showErrors" :key="i"
                    >{{ err }}
                  </strong>
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

          <!-- Rating And Reviews  -->
          <div class="event-ratings-and-reviews">
            <!-- Start All Comments  -->
            <Reviews :reviews="news.comment"></Reviews>
            <div class="pharma-add-rate-form-container">
              <h5 class="section-heading text-capitalize">
                {{ $t("global.add a review") }}
              </h5>
              <form
                class="text-capitalize pharma-add-rate-form"
                action=""
                @submit.prevent="addReview(news.id)"
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
                  <div
                    class="preview-container-image"
                    v-if="commentImagePreview"
                  >
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
                      @change="handleUploadFileImageForReview($event)"
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
            <Ratings :ratings="news.rate"></Ratings>
            <div class="pharma-add-rate-form-container text-capitalize">
              <h5 class="single-head text-capitalize">
                {{ $t("global.add Rating") }}
              </h5>
              <form
                class="pharma-add-rate-form"
                @submit.prevent="addRate(news.id)"
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
                      @change="handelUploadFileImage($event)"
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

          <!-- Rating And Reviews  -->
        </div>
        <!-- Start relatedEvents -->
        <div class="top-rated-companies col-md-5 col-lg-4">
          <h5 class="section-heading text-capitalize">
            {{ $t("event.related") }} <span>{{ $t("event.news") }}</span>
          </h5>
          <div
            class="top-company"
            v-for="item in topRealetdNews"
            :key="item.id"
          >
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
        <!-- End relatedEvents -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import Reviews from "@/components/ReviewsAndRate/Reviews.vue";
import Ratings from "@/components/ReviewsAndRate/Ratings.vue";
export default {
  name: "NewsDetails",
  data() {
    return {
      loading: false,
      success: false,
      successMessage: "",
      error: "",
      rateError: "",
      reader: new FileReader(),
      imagePreview: null,
      commentImagePreview: null,
      rate: {
        value: null,
        message: null,
        type: "news",
        id_type: null,
        photo: null,
      },
      review: {
        note: null,
        photo: null,
        type: "news",
        id_type: null,
        reader: new FileReader(),
      },
    };
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
    this.singleNews();
    this.relatedNews();
  },
  computed: {
    ...mapState({
      news: (state) => state.EventsAndNewsModule.NewsModule.singleNews,
      topRealetdNews: (state) =>
        state.EventsAndNewsModule.NewsModule.realetdNews,
    }),
    showErrors() {
      return this.error;
    },
  },
  methods: {
    singleNews() {
      this.$store.dispatch(
        "EventsAndNewsModule/NewsModule/getSingleNews",
        this.$route.params.id
      );
    },
    relatedNews() {
      this.$store.dispatch(
        "EventsAndNewsModule/NewsModule/getRelatedNews",
        this.$route.params.id
      );
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
          this.error = error.data.message;
        })
        .finally(() => {
          this.loading = false;
          if (!this.showErrors) {
            this.success = true;
          }
        });
    },
    handelUploadFileImage(event) {
      this.rate.photo = event.target.files[0];
      this.reader.readAsDataURL(this.rate.photo);
    },
    handleUploadFileImageForReview(event) {
      this.review.photo = event.target.files[0];
      this.review.reader.readAsDataURL(this.review.photo);
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
            this.singleNews();
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    addReview(reviewId) {
      this.$v.review.$touch();
      if (this.$v.review.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let userReview = new FormData();
        userReview.append("note", this.review.note);
        userReview.append("type", this.review.type);
        userReview.append("id_type", reviewId);
        if (this.review.photo != null) {
          userReview.append("photo", this.review.photo);
        }

        this.$store
          .dispatch(
            "EventsAndNewsModule/ReviewsModule/addCompanyReview",
            userReview
          )
          .then(() => {
            this.singleNews();
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
  components: {
    Ratings,
    Reviews,
  },
  validations: {
    rate: {
      message: {
        required,
      },
      value: {
        required,
      },
    },
    review: {
      note: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.single-details {
  .details-description {
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
        .every-icon {
          margin: 0 5px;
        }
      }
    }
  }
  .description {
    margin-top: 30px;
  }
  .time-types {
    .lists-items {
      gap: 20px;
      .items {
        color: $textcolor;
      }
    }
  }
  .organizer-information {
    padding: 20px;
    background-color: $bgcard;
    border-radius: $radius;
    margin-top: 40px;
    .one {
      height: $photo-height;
      @media (min-width: 320px) and (max-width: 767px) {
        margin-bottom: 20px;
      }
      .img {
        border-radius: $radius;
      }
    }
    .two {
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

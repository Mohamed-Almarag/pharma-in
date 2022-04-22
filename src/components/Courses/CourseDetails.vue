<template>
  <div class="single-course" v-if="course">
    <Loading :loading="loading"></Loading>
    <div
      class="course-descriptions d-flex align-items-center"
      :style="{
        backgroundImage: `url(${course.cover_photo})`,
      }"
    >
      <div class="container">
        <div class="every-everything">
          <h5 class="every-name" v-if="course.type">
            {{ course.type.name }}
          </h5>
          <h5 class="name" v-if="course.type">
            {{ course.name }}
          </h5>
          <p class="text" v-if="course.lecturer">
            {{ course.lecturer.name }}
          </p>
          <div class="rating d-flex align-items-center">
            <rate :length="5" :value="course.rate" :disabled="true" />
            <span class="value">( {{ Math.floor(course.rate) }} / 5 )</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Start Details -->
    <div class="container">
      <div class="buy-now">
        <div class="row">
          <div class="descrip col-md-8">
            <p
              v-if="course.description"
              class="paragraph"
              v-html="$options.filters.justSpecificWords(course.description)"
            ></p>
            <div></div>
          </div>
          <div class="buy col-md-4 d-flex flex-wrap justify-content-between">
            <div>
              <button
                @click="applayCourse(course.id)"
                class="text-capitalize details-button review-button d-block"
              >
                {{ $t("courses.buy now") }}
              </button>
            </div>
            <div class="prices">
              <span class="d-block price old-price"
                >{{ course.price }}<fa class="dollar" icon="dollar-sign"
              /></span>
              <span class="d-block price offer-price"
                >{{ course.offer_price }}<fa class="dollar" icon="dollar-sign"
              /></span>
            </div>
          </div>
        </div>
        <transition name="fade">
          <Errors v-if="showErrors" :error="error">
            <template #errors>
              <div class="errors">
                <strong v-for="(err, i) in showErrors" :key="i"
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
      </div>

      <div class="objective">
        <h5 class="single-head text-capitalize">{{ $t("courses.learn") }}</h5>
        <div class="instructor-container">
          <div class="row">
            <div class="instructor-content col-md-6">
              <p class="paragraph" v-html="course.learn_objective"></p>
            </div>
            <div
              class="veido col-md-6"
              v-if="course.video_type == 'video_upload'"
            >
              <video
                class="img w-100 h-100 d-block"
                :src="course.video"
                controls
              ></video>
            </div>

            <div class="veido col-md-6" v-if="course.video_type == 'youtube'">
              <iframe
                allowfullscreen
                frameborder="0"
                class="img w-100 h-100 d-block"
                :src="course.video.replace('watch', 'embed')"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>

      <div class="pharma-tags-container d-flex flex-wrap">
        <span
          class="d-block text-capitalize rounded-pill single-tag"
          v-for="(item, index) in course.tags"
          :key="index"
        >
          {{ item }}
        </span>
      </div>

      <div class="description-details">
        <h5 class="single-head text-capitalize">
          {{ $t("courses.Description") }}
        </h5>
        <p class="paragraph" v-html="course.description"></p>
      </div>
      <div class="description-details">
        <h5 class="single-head text-capitalize">
          {{ $t("courses.requirements") }}
        </h5>
        <p class="paragraph" v-html="course.requirement"></p>
      </div>
      <div class="description-details">
        <h5 class="single-head text-capitalize">
          {{ $t("courses.Who course") }}
        </h5>
        <p class="paragraph" v-html="course.to_whom"></p>
      </div>

      <!-- start  course content  accordion  :class="{ show: i === 0 }"-->
      <div class="course-content">
        <h5 class="single-head text-capitalize">
          {{ $t("courses.content") }}
        </h5>
        <div class="accordion-container">
          <div class="accordion" id="accordionExample">
            <div
              v-for="(item, i) in course.section"
              :key="item.id"
              class="accordion-item"
            >
              <div class="accordion-header d-flex" :id="`heading${item.id}`">
                <button
                  class="accordion-button"
                  :class="{ collapsed: i > 0 }"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse${item.id}`"
                  :aria-expanded="i === 0"
                  :aria-controls="`collapse${item.id}`"
                >
                  <span class="d-block">{{ item.title }}</span>
                  <span class="d-block">
                    <fa class="icons" icon="clock" />
                    {{ item.period }}
                  </span>
                </button>
              </div>
              <div
                :id="`collapse${item.id}`"
                class="accordion-collapse collapse"
                :class="{ show: i === 0 }"
                :aria-labelledby="`heading${item.id}`"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p class="paragraph" v-html="item.description"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end course content accordion-->

      <div class="instrusctor">
        <h5 class="single-head text-capitalize">
          {{ $t("courses.instructor") }}
        </h5>
        <div class="instructor-container">
          <div class="row">
            <div
              class="instructor-photo col-md-6 col-lg-4"
              v-if="course.lecturer"
            >
              <img
                :src="course.lecturer.photo"
                alt=""
                class="img w-100 h-100 d-block"
              />
            </div>
            <div
              class="instructor-content col-md-6 col-lg-8"
              v-if="course.lecturer"
            >
              <h6 class="instruct">
                <fa class="icons" icon="user" /> {{ course.lecturer.name }}
              </h6>
              <span class="d-block instruct"
                ><fa class="icons" icon="envelope" />
                {{ course.lecturer.email }}</span
              >
              <span class="d-block instruct"
                ><fa class="icons" icon="map-marker-alt" />
                {{ course.lecturer.address }}</span
              >
              <span class="d-block instruct"
                ><fa class="icons" icon="phone-alt" />
                {{ course.lecturer.phone }}</span
              >
              <span class="d-block instruct"
                ><fa class="icons star" icon="star" />
                {{ course.lecturer.rate }}</span
              >
            </div>
          </div>
          <p
            v-if="course.lecturer"
            v-html="course.lecturer.description"
            class="paragraph"
          ></p>
          <button
            @click="showInstructorRating = true"
            class="
              details-button
              text-capitalize
              review-button
              instucor
              text-center
              d-block
            "
          >
            {{ $t("courses.rate instructor") }}
          </button>
          <!-- start instructor rate  -->
          <transition name="fade">
            <div
              class="
                pharma-add-rate-form-container
                instructor-rating
                clip-path
                text-capitalize
              "
              v-if="showInstructorRating"
            >
              <form
                class="pharma-add-rate-form"
                @submit.prevent="addInstructorRate(course.lecturer.id)"
              >
                <div class="form-group">
                  <textarea
                    class="textarea input-focus d-block"
                    v-model="instructorRate.message"
                  ></textarea>
                  <div class="validation-errors">
                    <span
                      v-if="
                        !$v.instructorRate.message.required &&
                        $v.instructorRate.message.$dirty
                      "
                      class="text-danger"
                      >{{ $t("global.empty rate") }}</span
                    >
                  </div>
                </div>
                <div class="form-group stars-rating">
                  <h6>{{ $t("global.stars rating") }}</h6>
                  <rate :length="5" v-model="instructorRate.value" />
                  <div class="validation-errors">
                    <span
                      v-if="
                        !$v.instructorRate.value.required &&
                        $v.instructorRate.value.$dirty
                      "
                      class="text-danger"
                      >{{ $t("validation.rate value") }}</span
                    >
                  </div>
                </div>

                <transition name="swip">
                  <div
                    class="preview-container-image"
                    v-if="instructorImagePreview"
                  >
                    <img
                      draggable="false"
                      class="preview-image d-block m-auto"
                      :src="instructorImagePreview"
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
                      @change="handelInstructorUploadFileImage($event)"
                      class="file-input"
                      type="file"
                      id="photo"
                    />
                  </div>
                </div>

                <div class="btts d-flex">
                  <button class="text-capitalize details-button review-button">
                    {{ $t("global.add rate button") }}
                  </button>
                  <button
                    @click.prevent="showInstructorRating = false"
                    class="text-capitalize details-button review-button cancel"
                  >
                    {{ $t("global.cancel button") }}
                  </button>
                </div>
              </form>
            </div>
          </transition>
          <!-- end instructor rate  -->
        </div>
      </div>
      <div class="user-rating text-uppercase">
        <h5 class="single-head text-capitalize">
          {{ $t("global.Users Rating") }}
        </h5>
        <span v-if="course.user" class="d-block company-rating">
          {{ $t("courses.company rate") }} ( {{ course.user.rate }} / 5 )
          <fa class="star" icon="star" />
        </span>
        <span v-if="course.lecturer" class="d-block company-rating">
          {{ $t("courses.Instructor rate") }} ( {{ course.lecturer.rate }} / 5 )
          <fa class="star" icon="star" />
        </span>
        <span v-if="course.user" class="d-block company-rating">
          {{ $t("courses.course rate") }} ( {{ Math.floor(course.rate) }} / 5 )
          <fa class="star" icon="star" />
        </span>
      </div>
      <!-- start rating  -->
      <Ratings :ratings="course.rateable"></Ratings>

      <div class="pharma-add-rate-form-container text-capitalize">
        <h5 class="single-head text-capitalize">
          {{ $t("global.add Rating") }}
        </h5>
        <form class="pharma-add-rate-form" @submit.prevent="addRate(course.id)">
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
      <!-- end rating  -->
      <div class="similar-courses">
        <h5 class="single-head text-capitalize">
          {{ $t("courses.Students Also Bought") }}
        </h5>
        <div class="samilar" v-for="item in sameCourse" :key="item.id">
          <div class="row">
            <div class="photo col-md-4">
              <span class="type" v-if="item.type">{{ item.type.name }}</span>
              <img
                :src="item.cover_photo"
                :alt="item.name"
                draggable="false"
                class="img w-100 h-100"
              />
            </div>
            <div class="description col-md-8">
              <h6 class="name h5">{{ item.name }}</h6>
              <p class="paragraph">
                {{ item.description | forPopularEventsAndNews }}
              </p>

              <rate :length="5" :value="item.rate" :disabled="true" />
              <router-link
                class="link text-capitalize d-block details-button"
                :to="`/courses/all-courses/${item.id}`"
                >{{ $t("global.details") }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Details -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import Ratings from "@/components/ReviewsAndRate/Ratings.vue";

export default {
  name: "CourseDetails",
  data() {
    return {
      error: "",
      showConfirm: false,
      loading: false,
      reader: new FileReader(),
      imagePreview: null,
      instructorReader: new FileReader(),
      instructorImagePreview: null,
      showInstructorRating: false,
      rate: {
        value: null,
        message: null,
        type: "course",
        id_type: null,
        photo: null,
      },
      instructorRate: {
        reader: new FileReader(),
        value: null,
        message: null,
        type: "instructor",
        id_type: null,
        photo: null,
      },
    };
  },
  created() {
    this.reader.onload = () => {
      this.imagePreview = this.reader.result;
    };
    this.instructorRate.reader.onload = () => {
      this.instructorImagePreview = this.instructorRate.reader.result;
    };
  },
  mounted() {
    this.singleCourse();
    this.similarCourses();
  },

  computed: {
    ...mapState({
      course: (state) => state.CoursesModule.singleCourseDetalis,
      sameCourse: (state) => state.CoursesModule.sameCourses,
      errors: (state) => state.CoursesModule.errors,
      showErrors() {
        return this.error;
      },
    }),
  },
  components: {
    Ratings,
  },
  methods: {
    singleCourse() {
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getSingleCourseData", this.$route.params.id)
        .finally(() => {
          this.loading = false;
        });
    },
    similarCourses() {
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getSimilarCourses", this.$route.params.id)
        .finally(() => {
          this.loading = false;
        });
    },

    handelUploadFileImage(event) {
      this.rate.photo = event.target.files[0];
      this.reader.readAsDataURL(this.rate.photo);
    },
    handelInstructorUploadFileImage(event) {
      this.instructorRate.photo = event.target.files[0];
      this.instructorRate.reader.readAsDataURL(this.instructorRate.photo);
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
            this.singleCourse();
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    addInstructorRate(instructorId) {
      this.$v.instructorRate.$touch();
      if (this.$v.instructorRate.$invalid) {
        console.log("error");
      } else {
        this.loading = true;
        let instructorRating = new FormData();
        instructorRating.append("value", this.instructorRate.value);
        instructorRating.append("message", this.instructorRate.message);
        instructorRating.append("type", this.instructorRate.type);
        instructorRating.append("id_type", instructorId);
        if (this.instructorRate.photo != null) {
          instructorRating.append("photo", this.instructorRate.photo);
        }
        this.$store
          .dispatch(
            "EventsAndNewsModule/RatingModule/addCompanyRate",
            instructorRating
          )
          .then(() => {
            this.singleCourse();
            this.$router.go(this.$router.currentRoute);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    applayCourse(courseId) {
      this.loading = true;
      let payload = { course_id: courseId, is_paid: 1 };
      this.$store
        .dispatch("CoursesModule/apllayCourse", payload)
        .then((reponse) => {
          console.log(reponse);
        })
        .catch((error) => {
          this.error = error.response;

          // console.log(error.response.errors);
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
    instructorRate: {
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
.single-course {
  padding: 100px 0;
  .course-descriptions {
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
      .name {
        color: $white;
      }
      .text {
        color: $white;
        margin-bottom: 10px;
      }
      .rating {
        color: $white;
        // color: ;
      }
      .every-p {
        color: $white;
        margin: 20px 0 0;
        font-weight: bold;
      }
    }
  }
  .buy-now {
    padding: 30px 0;
    .buy {
      gap: 20px;
    }
  }
  .objective {
    padding: 0 0 15px;
    .veido {
      height: 300px;
      .img {
        object-fit: cover;
        box-shadow: $box-shadow;
        border-radius: 5px;
      }
    }
  }
  // .description-details {
  //   padding: 15px 0;
  //   gap: 20px;
  //   .tag {
  //     background: $bgcard;
  //     color: $textcolor;
  //     padding: 7px 20px;
  //     box-shadow: $box-shadow;
  //   }
  // }

  .course-content {
    padding: 15px 0;
    .accordion-container {
      width: 70%;
      @media (min-width: 320px) and (max-width: 767px) {
        width: 100%;
      }
      .accordion {
        margin-top: 20px;
      }
      .accordion-button {
        color: $textcolor !important;
        border: none !important;
        outline: none !important;
        gap: 30px;
        .icons {
          color: $secondcolor;
        }
        // &:hover {
        //   background-color: $secondcolor;
        //   color: $white !important;
        // }
        &:focus {
          box-shadow: unset !important;
          color: $textcolor !important;
        }
      }
      .accordion-button::after {
        // background-color: #ddd !important;
      }
      .accordion-button:not(.collapsed) {
        background-color: $bgcard;
      }
      .accordion-body {
        .lessons-list {
          gap: 30px;
          padding: 20px 10px;
          background: #eee;
          margin-bottom: 10px;
          border-radius: 10px;
          color: $textcolor;
          @media (min-width: 320px) and (max-width: 767px) {
            display: block !important;
          }
          .part-one {
            &:first-of-type {
              @media (min-width: 320px) and (max-width: 767px) {
                margin-bottom: 10px;
              }
            }
            .play {
              color: $secondcolor;
            }
            .text {
              margin: 0 8px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
  .instrusctor {
    padding: 15px 0;
    .instructor-container {
      padding: 20px;
      background-color: $bgcard;
      border-radius: $radius;
      .instructor-photo {
        height: $photo-height;
        @media (min-width: 320px) and (max-width: 767px) {
          margin-bottom: 20px;
        }
        .img {
          border-radius: $radius;
        }
      }
      .paragraph {
        margin-top: 30px;
      }
    }
    .instruct {
      margin-bottom: 20px;
    }
    .icons {
      color: $maincolor;
      margin: 0 5px;
      &.star {
        color: $ratecolor;
      }
    }
  }

  .user-rating {
    padding: 20px 0;
    .company-rating {
      margin-bottom: 10px;
      .star {
        color: $ratecolor;
      }
    }
  }
  .similar-courses {
    padding: 30px 0;
    position: relative;
    .samilar {
      margin-top: 15px;
      .photo {
        position: relative;
        .img {
          object-fit: cover;
        }
        .type {
          position: absolute;
          z-index: 4;
          top: 20px;
          left: 25px;
          background-color: #2fba4b;
          color: #fff;
          padding: 5px 10px;
          font-size: 0.8rem;
        }
      }
      .description {
        .name {
          color: $textcolor2;
          font-weight: bold;
          margin-bottom: 20px;
        }
        // .link {
        //   text-align: center;
        //   text-decoration: none;
        //   position: absolute;
        //   right: 0;
        //   background-color: $maincolor;
        // }
      }
    }
  }
}

// .fade-enter,
// .fade-leave-to {
//   clip-path: circle(0);
// }
// .fade-enter-active,
// .fade-leave-active {
//   transition: clip-path 0.8s ease-in-out;
// }
</style>

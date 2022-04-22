<template>
  <div class="lessons">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <div class="single-lesson" v-if="course">
        <div class="vedio-types">
          <div class="vedio-container">
            <video
              typevedio="video_upload"
              v-if="course.video_type == 'video_upload'"
              class="vedio w-100 h-100"
              :src="course.video"
              controls
            >
              {{ $t("global.Your browser does not support HTML5 video") }}
            </video>
            <iframe
              typevedio="youtube"
              v-if="course.video_type == 'youtube'"
              allowfullscreen
              frameborder="0"
              class="vedio w-100 h-100 d-block"
              :src="course.video.replace('watch', 'embed')"
            >
            </iframe>
          </div>
        </div>

        <div class="description-details">
          <h4>{{ course.title }}</h4>
          <h5 class="single-head text-capitalize">
            {{ $t("courses.Description") }}
          </h5>
          <p
            v-if="course.description"
            class="paragraph"
            v-html="course.description"
          >
            {{ course.description }}
          </p>
        </div>
      </div>

      <div class="lissons-lists">
        <!-- start  course content  accordion  :class="{ show: i === 0 }"-->
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
                  <span class="d-block">{{
                    item.title | justSpecificWordsHeading
                  }}</span>
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
                  <p class="paragraph" v-html="item.description">
                    {{ item.description }}
                  </p>

                  <div
                    class="lessons-list"
                    v-for="(les, index) in item.lesson"
                    :key="index"
                  >
                    <router-link
                      @click.native="getCourseSrcAndType(les.id)"
                      class="
                        d-flex
                        justify-content-between
                        router-link-container
                      "
                      :to="`/courses/all-courses/${item.id}/lessons/${les.title}`"
                    >
                      <div class="part-one">
                        <fa class="play" icon="play" />
                        <span class="text">{{ les.title }}</span>
                      </div>
                      <div class="part-one">
                        <fa class="play" icon="clock" />
                        <span class="text">{{ les.period }}</span>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- end course content accordion-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  //   video_upload
  // Youtube
  // vimeo
  // other_site
  name: "LessonsLists",
  data() {
    return {
      loading: false,
      custom: "",
    };
  },
  computed: {
    ...mapState({
      course: (state) => state.CoursesModule.singleCourseDetalis,
      // lessons: (state) => state.CoursesModule.lessons,
    }),
    show() {
      return this.custom;
    },
  },

  mounted() {
    this.singleCourse();
    // this.singleCourseSections();
    console.log(this.custom);
    // this.obj = this.$store.state.CoursesModule.singleCourseDetalis;
    // type_id == youtyoupe, vemo, videoupload, othersite;
    // https://vimeo.com/652759479
    // video_type;
  },
  methods: {
    contentOfEachLesson(lessonId) {
      this.loading = true;
      console.log(lessonId);
      this.$store
        .dispatch("CoursesModule/getSingleCourseLesson", lessonId)
        .finally(() => {
          this.loading = false;
        });
    },
    singleCourse() {
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getSingleCourseData", this.$route.params.id)
        .finally(() => {
          this.loading = false;
        });
    },
    getCourseSrcAndType(id) {
      localStorage.setItem("lessonId", id);
      // this.$router.push(`/courses/all-courses/${item.id}/lessons`)
      // :to="`/courses/all-courses/${item.id}/lessons`"
    },
  },
};
</script>

<style lang="scss" scoped>
.lessons {
  padding: $view-padding + 20 0;
  .single-lesson {
    margin-bottom: 50px;
    .vedio-types {
      .vedio-container {
        height: 80vh;
      }
      .ytp-pause-overlay {
        display: none !important;
      }
      .ytp-expand-pause-overlay .ytp-pause-overlay {
        display: none !important;
      }
    }
    .description-details {
      padding: 50px 0;
    }
  }
  .lissons-lists {
    .every-item {
      margin-bottom: 30px;
      box-shadow: $box-shadow;
      border-radius: $radius;
      padding: 10px;
      transition: $transition;
      cursor: pointer;
      &:hover {
        background-color: $bgcard;
      }
      .vedio-container {
        height: 200px;
        @media (min-width: 320px) and (max-width: 576px) {
          margin-bottom: 30px;
        }
        .lesson-vedio {
          border-radius: $radius;
        }
      }
      .content {
        .title {
          color: $textcolor2;
          margin-bottom: 20px;
        }
        .time {
          color: $textcolor;
        }
      }
    }
  }
}
.lissons-lists {
  // border-radius: $radius;
  // box-shadow: $box-shadow;
  .accordion-container {
    width: 80%;
    width: 100%;
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
      cursor: pointer;
      .lessons-list {
        gap: 30px;
        padding: 20px 10px;
        background-color: rgba($bgcard, 0.2);
        box-shadow: $chat-shadow;
        margin-bottom: 10px;
        border-radius: $radius;
        color: $textcolor;
        transition: $transition;
        @media (min-width: 320px) and (max-width: 767px) {
          display: block !important;
        }
        &:hover {
          background-color: $bgcard;
        }
        .router-link-container {
          color: $textcolor;
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
</style>

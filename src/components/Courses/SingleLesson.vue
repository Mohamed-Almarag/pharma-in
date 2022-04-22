<template>
  <div class="single-lesson view-padding" v-if="lesson">
    <Loading :loading="loading"></Loading>
    <div class="container">
      <div class="vedio-types">
        <div class="vedio-container">
          <video
            typevedio="video_upload"
            v-if="lesson.video_type == 'video_upload'"
            class="vedio w-100 h-100"
            :src="lesson.video"
            controls
          >
            {{ $t("global.Your browser does not support HTML5 video") }}
          </video>
          <iframe
            typevedio="youtube"
            v-if="lesson.video_type == 'youtube'"
            allowfullscreen
            frameborder="0"
            class="vedio w-100 h-100 d-block"
            :src="lesson.video.replace('watch', 'embed')"
          >
          </iframe>
          <iframe
            typevedio="vemo"
            v-if="lesson.video_type == 'vimeo'"
            allowfullscreen
            frameborder="0"
            class="vedio w-100 h-100 d-block"
            :src="lesson.video"
          >
          </iframe>
        </div>
      </div>
      <div class="lesson-details mt-5">
        <h5 class="main-section-title mb-3 text-capitalize">
          {{ lesson.title }}
          {{ lesson.id }}
        </h5>
        <p class="paragraph text-capitalize" v-html="lesson.description">
          {{ lesson.description }}
        </p>
        <span class="d-block">{{ lesson.period }}</span>
      </div>
      <!-- start  course content  accordion -->
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
                  <p class="paragraph" v-html="item.description">
                    {{ item.description }}
                  </p>
                  <div
                    class="lessons-list"
                    v-for="(les, index) in item.lesson"
                    :key="index"
                  >
                    <div
                      @click="showAnotherLesson(les.id)"
                      class="
                        d-flex
                        justify-content-between
                        single-lesson-container
                      "
                    >
                      <div class="part-one">
                        <fa class="play" icon="play" />
                        <span class="text">{{ les.title }}</span>
                      </div>
                      <div class="part-one">
                        <fa class="play" icon="clock" />
                        <span class="text">{{ les.period }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end course content accordion-->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SingleLesson",
  data() {
    return {
      loading: false,
      lesssonId: "",
    };
  },
  created() {
    let courseLessonId = localStorage.getItem("lessonId");
    this.lesssonId = courseLessonId;
    if (courseLessonId) {
      this.singleLesson();
    }
  },
  mounted() {
    this.singleCourse();
  },
  computed: {
    ...mapState({
      lesson: (state) => state.CoursesModule.everyCourseSingleLesson,
      course: (state) => state.CoursesModule.singleCourseDetalis,
    }),
  },
  methods: {
    singleLesson() {
      this.loading = true;

      this.$store
        .dispatch("CoursesModule/getEveryCourseSingleLesson", this.lesssonId)
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
    showAnotherLesson(id) {
      this.loading = true;
      console.log(id);
      this.$store
        .dispatch("CoursesModule/getEveryCourseSingleLesson", id)
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.single-lesson {
  .vedio-types {
    box-shadow: $box-shadow;
    background-color: $white;
    border-radius: $radius;
    padding: 10px;
    .vedio-container {
      height: 80vh;
    }
  }
  .lesson-details {
    .lesson-title {
    }
  }

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
          background-color: rgba($bgcard, 0.2);
          box-shadow: $chat-shadow;
          margin-bottom: 10px;
          border-radius: $radius;
          color: $textcolor;
          transition: $transition;
          cursor: pointer;
          &:hover {
            background-color: $bgcard;
          }
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
}
</style>

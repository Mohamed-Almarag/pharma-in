<template>
  <div class="courses-page">
    <div class="container">
      <div class="row">
        <div
          class="every-course col-lg-4 col-md-6"
          v-for="item in allAppliedCourses"
          :key="item.id"
        >
          <div class="course-card-container">
            <div class="course-cover-photo shadow">
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
                  :to="`/courses/all-courses/${item.id}/lessons`"
                  ><fa class="icon" icon="eye"
                /></router-link>
              </div>
              <img
                class="photo d-block w-100 h-100"
                draggable="false"
                :src="item.courses.cover_photo"
                :alt="item.courses.name"
              />
            </div>
            <div class="course-content">
              <div
                class="offers d-flex justify-content-between align-items-center"
              >
                <h6 v-if="item.courses.name" class="name">
                  {{ item.courses.name | justSpecificWordsHeading }}
                </h6>
                <!-- <div class="prices d-flex align-items-center">
                  <span class="d-block price old-price"
                    >{{ item.price }}<fa class="dollar" icon="dollar-sign"
                  /></span>
                  <span class="d-block price offer-price"
                    >{{ item.offer_price
                    }}<fa class="dollar" icon="dollar-sign"
                  /></span>
                </div> -->
              </div>
              <div class="course-description">
                <p
                  v-if="item.courses.description"
                  class="description paragraph"
                >
                  {{ item.courses.description | justSpecificWords }}
                </p>
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
  name: "AppliedCourses",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      allAppliedCourses: (state) => state.CoursesModule.appliedCourses,
    }),
  },
  mounted() {
    this.appliedCourses();
  },
  methods: {
    appliedCourses() {
      this.loading = true;
      this.$store
        .dispatch("CoursesModule/getUserAppliedCourses")
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.courses-page {
  .every-course {
    padding: 10px;
    .course-card-container {
      background-color: #eee;
      padding: 10px;
      border-radius: 10px;
      transition: 0.5s;
      &:hover {
        border-radius: 0;
        .for-icons {
          clip-path: circle(100%);
        }
        .course-cover-photo {
          .photo {
            transform: scale(1.2);
          }
        }
      }
      .course-cover-photo {
        position: relative;
        overflow: hidden;
        border-radius: 10px;

        .photo {
          object-fit: cover;
          transition: 0.5s;
        }
      }
      .course-content {
        padding: 20px 0 0;
        .offers {
          .name {
            color: $textcolor2;
            margin: 0;
            font-weight: bold;
            transition: 0.3s;
          }
        }
        .course-description {
          .description {
            margin: 10px 0 0;
          }
        }
      }
    }
  }
}
</style>

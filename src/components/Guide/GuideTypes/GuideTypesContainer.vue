<template>
  <div class="guide-details">
    <div class="content">
      <div class="row">
        <div class="part-one col-md-7 col-lg-8">
          <h5 class="section-heading">Hospital <span>Directory</span></h5>
          <div class="partition" v-for="item in guideDeatils" :key="item.id">
            <div class="row">
              <div class="photo col-lg-4">
                <span>{{ item.Type.name }}</span>
                <img
                  :src="item.cover_photo"
                  :alt="item.name"
                  draggable="false"
                  class="img w-100 h-100"
                />
              </div>
              <div class="description col-lg-8">
                <h6>{{ item.name }}</h6>
                <p>{{ item.description | forPopularEventsAndNews }}</p>

                <rate :length="5" :value="item.rateValue" :disabled="true" />
                <div class="link-container">
                  <router-link
                    class="link text-capitalize"
                    :to="`/guide/all-guides/${item.id}`"
                    >more</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <router-link class="load-more-btn guide" :to="{ name: 'AllGuides' }"
            >load more</router-link
          >
        </div>

        <div class="part-two col-md-5 col-lg-4">
          <h5 class="section-heading">
            Best Medicine <span>Publications</span>
          </h5>
          <div
            class="top-medicine d-flex"
            v-for="item in topMedicine"
            :key="item.id"
          >
            <div class="top-photo">
              <img
                class="top-img w-100 h-100"
                :src="item.cover_photo"
                :alt="item.name"
              />
            </div>
            <div class="top-content">
              <h6>{{ item.name | justSpecificWordsHeading }}</h6>
              <p>{{ item.description | justSpecificWords }}</p>
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
  name: "HospitalsContainer",
  data() {
    return {};
  },
  props: {
    guideDeatils: {
      type: Array,
    },
  },
  mounted() {
    this.getTopMedicine();
  },
  computed: {
    ...mapState({
      topMedicine: (state) => state.GuideModule.GuideDetails.guideTopMedicine,
    }),
  },
  methods: {
    getTopMedicine() {
      this.$store.dispatch("GuideModule/GuideDetails/getTopMedicine");
    },
  },
};
</script>

<style lang="scss" scoped>
.guide-details {
  .content {
    .part-one {
      .partition {
        box-shadow: $chat-shadow;
        padding: 20px 10px;
        margin-bottom: 30px;
        transition: $transition;
        &:hover {
          background-color: $bgcard;
        }
        .photo {
          height: 220px;
          position: relative;
          span {
            position: absolute;
            top: 20px;
            left: 25px;
            background-color: $secondcolor;
            color: $white;
            padding: 5px 10px;
            font-size: 0.8rem;
          }
          .img {
            transition: 0.5s;
          }
        }
        .description {
          position: relative;
          h6 {
            color: $textcolor2;
            @media (min-width: 320px) and(max-width:991px) {
              margin-top: 20px;
            }
          }
          p {
            color: $textcolor;
            line-height: 2;
            font-size: 1rem;
            margin: 0;
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
        margin-top: 50px;
      }
      h5 {
        color: $textcolor2;
        margin-bottom: 40px;
      }
      .top-medicine {
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
        .top-photo {
          height: 100px;
          width: 270px;
          @media (min-width: 768px) and (max-width: 991px) {
            width: auto;
            height: 220px;
          }
        }
        .top-content {
          h6 {
            @media (min-width: 768px) and (max-width: 991px) {
              margin-top: 20px;
            }
          }
          p {
            font-size: 0.81rem;
            color: $textcolor;
            margin: 0;
            @media (min-width: 768px) and (max-width: 991px) {
              font-size: 1rem;
              line-height: 2;
            }
          }
        }
      }
    }
  }
}
</style>

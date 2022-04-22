<template>
  <div class="company-recommendations">
    <div class="main-decription">
      <h2 class="main-section-title text-capitalize text-center">
        {{ $t("home.Recommendations") }}
      </h2>
      <p class="text-center text-capitalize paragraph">
        {{ $t("home.Some Opinions") }}
      </p>
    </div>
    <div class="container">
      <div class="partners">
        <VueSlickCarousel v-bind="settings" v-if="partners.length">
          <div
            class="partner text-center"
            v-for="partner in partners"
            :key="partner.id"
          >
            <div class="partner-box">
              <a class="partner-link" :href="partner.url" target="_blank"
                ><img
                  draggable="false"
                  class="d-block m-auto image rounded-circle"
                  :src="partner.image"
                  :alt="partner.name"
              /></a>

              <a class="partner-link" :href="partner.url" target="_blank"
                ><h6 class="name">{{ partner.name }}</h6></a
              >
              <p class="paragraph">{{ partner.description }}</p>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapState, mapActions } from "vuex";
export default {
  name: "CompanyRecommendations",
  data() {
    return {
      settings: {
        slidesToShow: 3,
        infinite: true,
        accessibility: true,
        // adaptiveHeight: true,
        arrows: true,
        // dots: true,
        draggable: true,
        edgeFriction: 0.3,
        swipe: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
        ],
      },
    };
  },
  components: {
    VueSlickCarousel,
  },
  mounted() {
    // this["partners/getPartners"]();
    this.getPartners();
  },
  computed: {
    ...mapState({
      partners: (state) => state.partners.partners,
    }),
  },
  methods: {
    // ...mapActions(["partners/getPartners"]),
    ...mapActions({
      getPartners: "partners/getPartners",
    }),
  },
};
</script>

<style lang="scss" scoped>
.company-recommendations {
  padding: 50px 0 0;
  .partners {
    cursor: grab;
    overflow: hidden;
    .partner {
      color: $textcolor;
      .partner-box {
        box-shadow: $chat-shadow;
        padding: 10px;
        border-radius: 10px;
        transition: $transition;
        width: 95%;
        margin: 30px auto;
        min-height: 350px;
        height: auto;
        &:hover {
          background-color: $bgcard;
        }
      }
      .image {
        width: 100px;
        height: 100px;
        box-shadow: 0 1px 12px rgba($black, 0.2);
        cursor: pointer;
      }
      .partner-link {
        text-decoration: none;
        color: $textcolor2;
      }
      .name {
        color: $textcolor2;
        margin-top: 20px;
      }
    }
  }
}
</style>

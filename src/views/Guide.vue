<template>
  <div class="guide view-padding">
    <DescriptionPages bgImage="guideImage">
      <template #title>
        <div>
          <h2 class="title-page text-capitalize">guide</h2>
        </div>
      </template>
    </DescriptionPages>
    <div class="container">
      <div class="top-institutions">
        <h3 class="section-heading text-capitalize">
          Top <span>Institutions</span>
        </h3>
        <MainSlider :details="details" :sliders="guideSlider"></MainSlider>
      </div>
      <MainGuideContainer></MainGuideContainer>
    </div>
  </div>
</template>

<script>
import MainGuideContainer from "@/components/Guide/MainGuideContainer.vue";
import { mapState } from "vuex";
export default {
  name: "Guide",
  data() {
    return {
      details: "guide/all-guides",
    };
  },
  components: {
    MainGuideContainer,
  },
  mounted() {
    this.sliderConent();
  },

  computed: {
    ...mapState({
      guideSlider: (state) => state.GuideModule.GuideSlider.guideSliderContent,
    }),
  },
  methods: {
    sliderConent() {
      this.$store.dispatch("GuideModule/GuideSlider/getSliderContent");
    },
  },
};
</script>

<style lang="scss" scoped>
.title-page {
  color: $white !important;
}

.top-institutions {
  padding: 50px 0;
}
</style>

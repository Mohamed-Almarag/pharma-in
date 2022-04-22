<template>
  <div class="about view-padding">
    <Loading :loading="loading"></Loading>
    <DescriptionPages bgImage="about">
      <template #title>
        <div>
          <h2 class="title-page text-capitalize text-white">
            {{ $t("about.About us") }}
          </h2>
        </div>
      </template>
    </DescriptionPages>
    <div class="container">
      <div class="phrma-info">
        <h2 class="title-pharma text-uppercase">{{ $t("about.pharma in") }}</h2>
        <p class="paragraph text-capitalize" v-html="info.about_us">
          {{ info.about_us }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "About",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState({
      info: (state) => state.WebsiteInfo.pharmaInfo,
    }),
  },
  mounted() {
    this.phrmaInfo();
  },
  methods: {
    phrmaInfo() {
      this.$store.dispatch("WebsiteInfo/phrmaInfo");
    },
  },
};
</script>

<style lang="scss" scoped>
.phrma-info {
  padding: 30px 0;
  .title-pharma {
    color: $maincolor;
    font-weight: bold;
    letter-spacing: 5px;
    text-shadow: $text-shadow;
    margin-bottom: 30px;
  }
}
</style>

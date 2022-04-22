<template>
  <div class="privacy view-padding">
    <div class="container">
      <div class="part-one">
        <h2 class="privacy-policy text-capitalize">
          {{ $t("footer.Privacy ploicy") }}
        </h2>
        <p class="paragraph text-capitalize" v-html="infos.privacy"></p>
        <p class="paragraph text-capitalize" v-html="infos.Policy"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  mounted() {
    this.pharmaInfo();
  },
  computed: {
    infos() {
      return this.$store.state.WebsiteInfo.pharmaInfo;
    },
  },
  methods: {
    pharmaInfo() {
      this.$store.dispatch("WebsiteInfo/phrmaInfo");
    },
  },
};
</script>

<style lang="scss" scoped>
.privacy {
  .part-one {
    .privacy-policy {
      color: $maincolor;
    }
  }
}
</style>

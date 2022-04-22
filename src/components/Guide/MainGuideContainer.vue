<template>
  <div class="tabs-container courses">
    <div
      class="
        buttons
        d-flex
        justify-content-between
        align-items-center
        flex-wrap
      "
    >
      <button
        class="tabs d-block text-capitalize"
        :class="{ active: step == 1 }"
        @click="getHospitalsData"
      >
        Hospitals
      </button>
      <button
        class="tabs d-block text-capitalize"
        :class="{ active: step == 2 }"
        @click="getPharmaciesData"
      >
        Pharmacies
      </button>
      <button
        class="tabs d-block text-capitalize"
        :class="{ active: step == 3 }"
        @click="getPharmaceuticalData"
      >
        Pharmaceutical
      </button>
    </div>

    <Loading :loading="loading"></Loading>
    <transition name="fadeIn">
      <GuideTypesContainer :guideDeatils="guideDeatils"></GuideTypesContainer>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
import GuideTypesContainer from "@/components/Guide/GuideTypes/GuideTypesContainer.vue";

export default {
  name: "MainGuideContainer",
  data() {
    return {
      step: 1,
      loading: false,
      hospitalsType: "Hospitals",
      pharmaciesType: "Pharmacies",
      pharmaceuticalType: "PharmaceuticalCompanies",
    };
  },
  created() {
    this.$store.dispatch(
      "GuideModule/GuideDetails/getGuideDetails",
      this.hospitalsType
    );
  },

  methods: {
    getHospitalsData() {
      this.loading = true;
      this.step = 1;
      this.$store
        .dispatch(
          "GuideModule/GuideDetails/getGuideDetails",
          this.hospitalsType
        )
        .then(() => {
          this.$store.state.GuideModule.GuideDetails.knowGuideType =
            this.hospitalsType;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPharmaciesData() {
      this.loading = true;
      this.step = 2;
      this.$store
        .dispatch(
          "GuideModule/GuideDetails/getGuideDetails",
          this.pharmaciesType
        )
        .then(() => {
          this.$store.state.GuideModule.GuideDetails.knowGuideType =
            this.pharmaciesType;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPharmaceuticalData() {
      this.loading = true;
      this.step = 3;
      this.$store
        .dispatch(
          "GuideModule/GuideDetails/getGuideDetails",
          this.pharmaceuticalType
        )
        .then(() => {
          this.$store.state.GuideModule.GuideDetails.knowGuideType =
            this.pharmaceuticalType;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  computed: {
    ...mapState({
      guideDeatils: (state) => state.GuideModule.GuideDetails.guideDeatils,
    }),
  },
  components: {
    GuideTypesContainer,
  },
};
</script>

<style lang="scss" scoped>
.fadeIn-enter-active {
  animation: fadeIn 0.8s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>

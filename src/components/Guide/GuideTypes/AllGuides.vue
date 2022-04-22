<template>
  <div class="view-padding">
    <DescriptionPages bgImage="guideImage">
      <template #title>
        <h2 class="title-page text-white text-capitalize">all Gides</h2>
      </template>
    </DescriptionPages>
    <div class="container">
      <div class="pt-5">
        <div class="row">
          <div
            class="pharma-card col-sm-6 col-lg-4"
            v-for="item in guideDeatils"
            :key="item.id"
          >
            <div class="card-container">
              <div class="cover-photo shadow">
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
                    :to="`/guide/all-guides/${item.id}`"
                    ><fa class="icon" icon="eye"
                  /></router-link>
                </div>
                <img
                  class="photo d-block w-100 h-100"
                  draggable="false"
                  :src="item.cover_photo"
                  :alt="item.name"
                />
              </div>

              <div class="card-content">
                <h6 class="name">
                  {{ item.address | justSpecificWordsHeading }}
                </h6>
                <div class="card-description">
                  <p class="paragraph description">
                    {{ item.description | littelWords }}
                  </p>
                </div>
                <div class="cardfooter guide">
                  <span class="d-block company" v-if="item.user">
                    {{ item.user.name_company }}
                  </span>
                  <span class="address d-block">{{ item.address }}</span>
                  <span class="date d-block">{{
                    item.create_dates.created_at_human
                  }}</span>
                </div>
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
  name: "AllGuides",
  data() {
    return {
      limit: 20,
    };
  },

  mounted() {
    this.getAllGuidesData();
  },
  computed: {
    ...mapState({
      guideDeatils: (state) => state.GuideModule.GuideDetails.guideDeatils,
    }),
  },
  methods: {
    getAllGuidesData() {
      this.$store.dispatch(
        "GuideModule/GuideDetails/getGuideDetails",
        this.$store.state.GuideModule.GuideDetails.knowGuideType
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>

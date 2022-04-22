<template>
  <div class="jobs-page view-padding">
    <DescriptionPages bgImage="jobsImage">
      <template #title>
        <div>
          <h2 class="title-page text-capitalize">{{ $t("jobs.jobs") }}</h2>
        </div>
      </template>
    </DescriptionPages>
    <all-information></all-information>
  </div>
</template>

<script>
import AllInformation from "@/components/Jobs/AllInformation.vue";

export default {
  name: "Jobs",

  components: {
    AllInformation,
  },
};
</script>

<style lang="scss" scoped>
.title-page {
  color: $white !important;
}
</style>

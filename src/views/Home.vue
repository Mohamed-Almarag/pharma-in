<template>
  <div class="view-padding">
    <DefinationCompany></DefinationCompany>
    <ComprehensiveSite></ComprehensiveSite>
    <CompanyJobs></CompanyJobs>
    <CompanyCourses></CompanyCourses>
    <CompanyGuide></CompanyGuide>
    <CompanyNews></CompanyNews>
    <CompanyRecommendations></CompanyRecommendations>
  </div>
</template>

<script>
import DefinationCompany from "@/components/Home/DefinationCompany.vue";
import ComprehensiveSite from "@/components/Home/ComprehensiveSite.vue";
import CompanyJobs from "@/components/Home/CompanyJobs.vue";
import CompanyCourses from "@/components/Home/CompanyCourses.vue";
import CompanyGuide from "@/components/Home/CompanyGuide.vue";
import CompanyNews from "@/components/Home/CompanyNews.vue";
import CompanyRecommendations from "@/components/Home/CompanyRecommendations.vue";
export default {
  name: "Home",
  components: {
    DefinationCompany,
    ComprehensiveSite,
    CompanyJobs,
    CompanyCourses,
    CompanyGuide,
    CompanyNews,
    CompanyRecommendations,
  },
};
</script>
<style lang="scss" scoped></style>

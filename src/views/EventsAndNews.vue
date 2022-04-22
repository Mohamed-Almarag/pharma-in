<template>
  <div class="view-padding">
    <DescriptionPages>
      <template #title>
        <div>
          <h2 class="title-page text-capitalize">
            {{ $t("navbar.events") }} &amp; {{ $t("navbar.news") }}
          </h2>
        </div>
      </template>
    </DescriptionPages>
    <div class="container">
      <MainEventsNewsContainer></MainEventsNewsContainer>
    </div>
  </div>
</template>

<script>
import MainEventsNewsContainer from "@/components/EventsAndNews/MainEventsNewsContainer.vue";
export default {
  name: "EventsAndNews",
  components: {
    MainEventsNewsContainer,
  },
};
</script>

<style lang="scss" scoped>
.title-page {
  color: $white !important;
}
</style>

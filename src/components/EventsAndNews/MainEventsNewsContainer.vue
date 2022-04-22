<template>
  <div class="mt-5">
    <div class="tabs-container courses">
      <div
        class="
          buttons
          d-flex
          justify-content-around
          align-items-center
          flex-wrap
        "
      >
        <button
          class="tabs d-block text-capitalize"
          :class="{ active: step == 1 }"
          @click="getEventsData"
        >
          {{ $t("navbar.events") }}
        </button>
        <button
          class="tabs d-block text-capitalize"
          :class="{ active: step == 2 }"
          @click="getNewsData"
        >
          {{ $t("navbar.news") }}
        </button>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
    <transition name="fadeIn">
      <TypeContainer :event="event" :news="news"></TypeContainer>
    </transition>
  </div>
</template>

<script>
import TypeContainer from "@/components/EventsAndNews/Types/TypeContainer.vue";

export default {
  name: "MainEventsNewsContainer",
  data() {
    return {
      step: 1,
      loading: false,
      event: true,
      news: false,
    };
  },
  components: {
    TypeContainer,
  },

  methods: {
    getEventsData() {
      this.step = 1;
      this.event = true;
      this.news = false;
    },
    getNewsData() {
      this.step = 2;
      this.news = true;
      this.event = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>

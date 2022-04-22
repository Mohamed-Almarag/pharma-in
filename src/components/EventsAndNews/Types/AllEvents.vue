<template>
  <div class="view-padding">
    <Loading :loading="loading"></Loading>
    <DescriptionPages bgImage="eventImage">
      <template #title>
        <div>
          <h2 class="title-page text-capitalize">
            {{ $t("event.all events") }}
          </h2>
        </div>
      </template>
    </DescriptionPages>
    <div class="all-items mt-5">
      <div class="container">
        <div class="row">
          <div
            class="pharma-card col-sm-6 col-lg-4"
            v-for="item in allEvents"
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
                    @click.native="calculateEventVisitedTimes(item.id)"
                    class="
                      single-details
                      item-details
                      rounded-circle
                      text-center
                      d-block
                      text-center
                    "
                    :to="`/events-and-news/all-events/${item.id}`"
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
                <div
                  class="
                    offers
                    d-flex
                    justify-content-between
                    align-items-center
                  "
                >
                  <h6 class="name">
                    {{ item.name | justSpecificWordsHeading }}
                  </h6>
                  <div class="d-flex align-items-center">
                    <span class="d-block">{{ item.date }}</span>
                  </div>
                </div>
                <div class="card-description">
                  <p class="adrress description paragraph">
                    {{ item.address }}
                  </p>
                  <p
                    class="description paragraph"
                    v-html="
                      $options.filters.justSpecificWords(item.description)
                    "
                  >
                    {{ item.description | justSpecificWords }}
                  </p>
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
  name: "AllEvents",
  data() {
    return {
      loading: false,
      limit: 15,
      eventType: "event",
    };
  },
  mounted() {
    this.getAllEvents();
  },
  computed: {
    ...mapState({
      allEvents: (state) => state.EventsAndNewsModule.EventsModle.events,
    }),
  },
  methods: {
    getAllEvents() {
      this.loading = true;
      this.$store
        .dispatch("EventsAndNewsModule/EventsModle/getAllEvents", this.limit)
        .finally(() => {
          this.loading = false;
        });
    },
    calculateEventVisitedTimes(eventId) {
      this.$store.dispatch(
        "EventsAndNewsModule/EventsModle/calculateVisitedTimes",
        {
          type: this.eventType,
          id: eventId,
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.title-page {
  color: $white !important;
}
</style>

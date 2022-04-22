<template>
  <div class="types-container">
    <div v-if="event">
      <h3 class="section-heading text-capitalize">
        {{ $t("event.Top") }} <span>{{ $t("navbar.events") }}</span>
      </h3>
      <MainSlider :details="eventDetails" :sliders="visitedEvents"></MainSlider>
    </div>
    <div v-if="news">
      <h3 class="section-heading text-capitalize">
        {{ $t("event.Top") }} <span>{{ $t("navbar.news") }}</span>
      </h3>
      <MainSlider :details="newsDetails" :sliders="visitedNews"></MainSlider>
    </div>

    <Loading :loading="loading"></Loading>
    <div class="row">
      <div
        class="pharma-card col-sm-6 col-lg-4"
        v-for="item in switchTypes"
        :key="item.id"
      >
        <div class="card-container">
          <div class="cover-photo shadow">
            <div
              class="for-icons d-flex justify-content-center align-items-center"
            >
              <router-link
                @click.native="clacVisitedDependsType(item.id)"
                class="
                  single-details
                  item-details
                  rounded-circle
                  text-center
                  d-block
                  text-center
                "
                :to="`/events-and-news/${routerLink}/${item.id}`"
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
              class="offers d-flex justify-content-between align-items-center"
            >
              <h6 class="name">{{ item.name | justSpecificWordsHeading }}</h6>
              <div class="d-flex align-items-center">
                <span class="d-block">{{ item.date }}</span>
              </div>
            </div>
            <div class="card-description">
              <p class="adrress description paragraph">{{ item.address }}</p>
              <p
                class="description paragraph"
                v-html="$options.filters.justSpecificWords(item.description)"
              >
                {{ item.description | justSpecificWords }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      class="load-more-btn text-capitalize text-white"
      :to="{ name: `${loadmoreButton}` }"
      >{{ $t("loadmore") }}</router-link
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeContainer",
  data() {
    return {
      eventDetails: "events-and-news/all-events",
      newsDetails: "events-and-news/all-news",
      forEvents: "all-events",
      forNews: "all-news",
      limit: 6,
      loading: false,
      eventType: "event",
      newsType: "news",
      loadMoreEvent: "AllEvents",
      loadMoreNews: "AllNews",
    };
  },
  props: {
    event: {
      type: Boolean,
      default: true,
    },
    news: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.getAllEvents();
    this.getAllNews();
    this.popularEvents();
    this.popularNews();
  },
  computed: {
    ...mapState({
      allEvents: (state) => state.EventsAndNewsModule.EventsModle.events,
      allNews: (state) => state.EventsAndNewsModule.NewsModule.news,
      visitedEvents: (state) =>
        state.EventsAndNewsModule.EventsModle.visitedEvents,
      visitedNews: (state) => state.EventsAndNewsModule.NewsModule.commonNews,
    }),
    switchTypes() {
      if (this.event == true) {
        return this.allEvents;
      } else {
        return this.allNews;
      }
    },
    routerLink() {
      if (this.event == true) {
        return this.forEvents;
      } else {
        return this.forNews;
      }
    },
    loadmoreButton() {
      if (this.event == true) {
        return this.loadMoreEvent;
      } else {
        return this.loadMoreNews;
      }
    },
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
    getAllNews() {
      this.loading = true;
      this.$store
        .dispatch("EventsAndNewsModule/NewsModule/getAllNews", this.limit)
        .finally(() => {
          this.loading = false;
        });
    },
    popularEvents() {
      this.loading = true;
      this.$store
        .dispatch("EventsAndNewsModule/EventsModle/getVisitedevents")
        .finally(() => {
          this.loading = false;
        });
    },
    popularNews() {
      this.loading = true;
      this.$store
        .dispatch("EventsAndNewsModule/NewsModule/getCommonNews")
        .finally(() => {
          this.loading = false;
        });
    },

    clacVisitedDependsType(id) {
      if (this.event == true) {
        return this.calculateEventVisitedTimes(id);
      } else {
        return this.calculateNewsVisitedTimes(id);
      }
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
    calculateNewsVisitedTimes(newsId) {
      this.$store.dispatch(
        "EventsAndNewsModule/EventsModle/calculateVisitedTimes",
        {
          type: this.newsType,
          id: newsId,
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>

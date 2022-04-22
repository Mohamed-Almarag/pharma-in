export default {
  GET_ALL_NEWS(state, news) {
    return (state.news = news);
  },
  GET_SINGLE_News(state, singleNews) {
    return (state.singleNews = singleNews);
  },
  GET_COMMON_NEWS(state, commonNews) {
    return (state.commonNews = commonNews);
  },
  GET_RELATED_NEWS(state, realetdNews) {
    return (state.realetdNews = realetdNews);
  },
  CALCULATE_VISITED_TIME(state, visitedTime) {
    return (state.CalculateVisitedTime = visitedTime);
  },
};

export default {
  GET_All_EVENTS(state, events) {
    return (state.events = events);
  },
  GET_SINGLE_EVENT(state, event) {
    return (state.singleEvent = event);
  },
  GET_VISITED_EVENT(state, visitedEvents) {
    return (state.visitedEvents = visitedEvents);
  },
  GET_RELATED_EVENTS(state, realetdEvents) {
    return (state.realetdEvents = realetdEvents);
  },
  CALCULATE_VISITED_TIME(state, visitedTime) {
    return (state.CalculateVisitedTime = visitedTime);
  },
};

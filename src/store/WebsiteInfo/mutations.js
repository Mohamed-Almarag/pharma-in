export default {
  PHARMA_INFO(state, info) {
    return (state.pharmaInfo = info);
  },
  SEND_CONTACT_MESSAGE(state, data) {
    return (state.contactUsData = data);
  },
};

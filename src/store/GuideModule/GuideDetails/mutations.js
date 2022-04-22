export default {
  GET_GUIDE_HOSPITALS(state, deatils) {
    return (state.guideDeatils = deatils);
  },
  GET_TOP_MEDICINE(state, medicine) {
    return (state.guideTopMedicine = medicine);
  },
  GET_SINGLE_GIUDE_DETAILS(state, guideDetails) {
    return (state.singleGuideDetails = guideDetails);
  },
};

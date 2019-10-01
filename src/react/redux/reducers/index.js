import { SAVE, CHANGE_INFORMATION, SET_CREATE_STEP } from "../../constant/action-types";

const initialState = {
  information: null,
  identities: null,
  names: null,
  other_data: null,
  documents: null,
  addresses: null,
  places_birth: null,
  dates_birth: null,
  features: null,
  biometric_data: null,
  createStep: 0,
  err: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE:
      console.log('TEST SAVE REDUX: ', state);
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "data.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      break;

    case CHANGE_INFORMATION:
      console.log('TEST CHANGE INFORMATION: ', action.payload);

      return {
        ...state,
        ...action.payload.data
      };

    case SET_CREATE_STEP:
      return {
        ...state,
        createStep: action.payload.data
      };

    default:
      break;
  }
  return state;
}

export default rootReducer;
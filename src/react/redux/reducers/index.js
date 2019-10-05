import {
  SAVE_INFORMATION,
  CHANGE_INFORMATION,
  CLEAR_INFORMATION,
  SET_CREATE_STEP
} from "../../constant/action-types";

const initialState = {
  data: {},
  createStep: 0,
  err: null
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_INFORMATION:
      console.log('TEST SAVE REDUX: ', state);
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ ...state, sign: 'council-document' }));
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
        data: action.payload.data
      };

    case CLEAR_INFORMATION:
      return {
        data: {},
        createStep: 0,
        err: null
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
import { SAVE, CHANGE_INFORMATION } from "../../constant/action-types";

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
    err: null
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE:
            console.log('TEST SAVE REDUX: ', state);
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", "data.json");
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
            break;
        case CHANGE_INFORMATION:
            console.log('TEST CHANGE INFORMATION: ', action.payload);

            return Object.assign({}, state, {
                information: action.payload.data.information
            });
        default:
            break;
    }
    return state;
};
export default rootReducer;
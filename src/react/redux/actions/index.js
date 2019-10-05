import {
  SAVE_INFORMATION,
  SAVE_DRAFT,
  CHANGE_INFORMATION,
  SET_CREATE_STEP,
  CLEAR_INFORMATION
} from "../../constant/action-types";

export function save(payload) {
  return { type: SAVE_INFORMATION, payload };
}

export function saveDraft(payload) {
  return { type: SAVE_DRAFT, payload };
}

export function changeInformation(payload) {
  return { type: CHANGE_INFORMATION, payload };
}

export function clearInformation() {
  return { type: CLEAR_INFORMATION };
}

export function setCreateStep(payload) {
  return { type: SET_CREATE_STEP, payload };
}
import {
  SAVE,
  SAVE_DRAFT,
  CHANGE_INFORMATION,
  SET_CREATE_STEP
} from "../../constant/action-types";

export function save(payload) {
  return { type: SAVE, payload };
}

export function saveDraft(payload) {
  return { type: SAVE_DRAFT, payload };
}

export function changeInformation(payload) {
  return { type: CHANGE_INFORMATION, payload };
}

export function setCreateStep(payload) {
  return { type: SET_CREATE_STEP, payload };
}
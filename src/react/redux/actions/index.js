import {
  SAVE_INFORMATION,
  SAVE_DRAFT,
  CHANGE_INFORMATION,
  CLEAR_INFORMATION,
  VALIDATE_INFORMATION,
  SET_CREATE_STEP,
  SET_LANGUAGE,
  SET_VOCABULARIES,
  SET_CUR_LANG
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

export function validateInformation(payload) {
  return { type: VALIDATE_INFORMATION, payload };
}

export function setCreateStep(payload) {
  return { type: SET_CREATE_STEP, payload };
}

export function setLanguage(payload) {
  return { type: SET_LANGUAGE, payload };
}

export function setVocabularies(payload) {
  return { type: SET_VOCABULARIES, payload };
}

export function setCurLang(payload) {
  return { type: SET_CUR_LANG, payload };
}

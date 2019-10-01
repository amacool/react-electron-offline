import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFileImage, faFileWord } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const DocTypeIcon = ({ type }) => {
  let fontIcon = null;
  if (type.indexOf('word') >= 0) {
    fontIcon = <FontAwesomeIcon icon={faFileWord} size="2x" />;
  } else if (type.indexOf('image') >= 0) {
    fontIcon = <FontAwesomeIcon icon={faFileImage} size="2x" />;
  } else if (type.indexOf('excel') >= 0) {
    fontIcon = <FontAwesomeIcon icon={faFileExcel} size="2x" />;
  }

  return (
    <div className="file-type-icon">
      {fontIcon}
      <FontAwesomeIcon icon={faCheck} size="sm" color="#fff" />
    </div>
  );
};

export const DocInfo = ({ info }) => (
  <div className="file-info">
    <div className="file-name">{info.name}</div>
    <div className="file-path">{info.path}</div>
  </div>
);

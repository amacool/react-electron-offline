import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFileImage, faFileWord, faFile } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

export const DocTypeIcon = ({ type, status }) => {
  let fontIcon = null;
  if (type.indexOf('word') >= 0) {
    fontIcon = <FontAwesomeIcon icon={faFileWord} size="2x" />;
  } else if (type.indexOf('image') >= 0) {
    fontIcon = <FontAwesomeIcon icon={faFileImage} size="2x" />;
  } else if (type.indexOf('excel') >= 0) {
    fontIcon = <FontAwesomeIcon icon={faFileExcel} size="2x" />;
  } else {
    fontIcon = <FontAwesomeIcon icon={faFile} size="2x" />;
  }
  let statusIcon = null;
  if (status === 'Complete' || status === 'Pending send') {
    statusIcon = <FontAwesomeIcon style={{ backgroundColor: '#01af01' }} icon={faCheck} size="sm" color="#fff" />;
  } else if (status === 'Incomplete') {
    statusIcon = <FontAwesomeIcon style={{ backgroundColor: '#dd0008' }} icon={faExclamation} size="sm" color="#fff" />;
  }

  return (
    <div className="file-type-icon">
      {fontIcon}
      {statusIcon}
    </div>
  );
};

export const DocInfo = ({ info }) => (
  <div className="file-info">
    <div className="file-name">{info.name}</div>
    <div className="file-path">{info.path}</div>
  </div>
);

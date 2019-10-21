import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import "./styles.css";

export const CustomHeader = ({ heading, tooltipText }) => {
  const [tooltip, setTooltip] = React.useState(tooltipText);
  React.useEffect(() => setTooltip(tooltipText), [tooltipText]);

  return (
    <div className="header custom-header">
      <h5>{heading}</h5>
      {tooltip && (
        <>
          <FontAwesomeIcon
            className="tooltip-icon"
            data-tip={tooltip}
            style={{color: 'black'}}
            icon={faQuestionCircle}
            size="sm"
            color="#fff"
            data-for={tooltipText}
          />
          <ReactTooltip id={tooltipText} type="info" effect="solid" />
        </>
      )}
    </div>
  );
};

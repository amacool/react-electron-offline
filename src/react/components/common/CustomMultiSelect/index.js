import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import CrossIcon from "../../../assets/icons/cross/cross-light.svg";
import "./styles.css";

export const CustomMultiSelect = ({ options, selected, label, required, onChange }) => {
  const [values, setValues] = React.useState(selected);
  const handleClick = React.useCallback((item) => {
    let tValues = values;
    const pos = tValues.indexOf(item);
    if (pos >= 0) {
      tValues.splice(pos, 1);
    } else {
      tValues.push(item);
    }
    setValues(tValues);
    onChange({ target: { value: tValues } });
  }, [values, setValues, onChange]);

  return (
    <div className="custom-multi-select">
      <label className="select-label">
        {label}{required && <b>*</b>}
      </label>
      <div className="select-heading">
        {label}
        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      <div className="select-body">
        <div className="select-body-inner">
          {options.map((item, index) => (
            <div className="select-option" key={index} onClick={() => handleClick(item)}>
              {item}
              {values.indexOf(item) >= 0
                ? <FontAwesomeIcon className="icon" icon={faCheck} />
                : <img className="icon" src={CrossIcon} alt='' />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

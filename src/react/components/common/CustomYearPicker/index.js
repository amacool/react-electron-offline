import React from "react";
import YearPicker from "react-year-picker";
import CalendarIcon from "../../../assets/icons/calendar/calendar.svg";
import { isValidYearMonth } from "../../../common/helper";
import "./style.css";

export const CustomYearPicker = ({
  id,
  value,
  required,
  label,
  onChange,
  validation,
  disabled
}) => {
  return (
    <div className="custom-year-picker">
      <label className="custom-input-label" htmlFor={id}>
        {label}
        {required && <b>*</b>}
      </label>
      {disabled && <div className="overlay-picker" />}
      <div className={`year-picker-wrapper ${required && !isValidYearMonth(value) ? 'empty-year' : ''}`}>
        <YearPicker
          value={1234}
          style={{ pointerEvents: 'none' }}
          onChange={(value) => onChange({ target: { value } })}
        />
      </div>
      <img className="calendar-icon" src={CalendarIcon} alt='' />
    </div>
  );
};

import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import dateFnsFormat from "date-fns/format";
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import CalendarIcon from "../../../assets/icons/calendar/calendar.svg";
import { isValidDate } from "../../../common/helper";
import {
  WEEKDAYS_SHORT,
  MONTHS,
  WEEKDAYS_LONG,
  FIRST_DAY_OF_WEEK,
  LABELS
} from "./locale";
import "react-day-picker/lib/style.css";
import "./styles.css";

export const CustomDatePicker = ({ onChange, label, required, value, locale = "en", validation, disabled, className }) => {
  const FORMAT = 'MM/dd/yyyy';
  const localeLower = locale.toLowerCase();

  return (
    <div className={`custom-date-picker ${className} ${validation && ((required && !value) || !isValidDate(value)) ? 'date-picker-empty' :''} ${disabled ? 'disabled' : ''}`}>
      <label>
        {label}{required && <b>*</b>}
      </label>
      <div>
        <DayPickerInput
          id="day-picker-input"
          value={value}
          formatDate={formatDate}
          parseDate={parseDate}
          localeUtils={MomentLocaleUtils}
          dayPickerProps={{
            locale: localeLower,
            months: MONTHS[localeLower],
            weekdaysLong: WEEKDAYS_LONG[localeLower],
            weekdaysShort: WEEKDAYS_SHORT[localeLower],
            firstDayOfWeek: FIRST_DAY_OF_WEEK[localeLower],
            labels: LABELS[localeLower]
          }}
          inputProps={{
            disabled,
            onChange: (e) => {
              onChange(e);
            }
          }}
          placeholder="MM/DD/YYYY"
          onDayChange={(v) => {
            v && onChange({ target : { value: dateFnsFormat(v, FORMAT) } });
          }}
          disabled={disabled}
        />
        <img className="calendar-icon" src={CalendarIcon} alt='' />
      </div>
    </div>
  )
};

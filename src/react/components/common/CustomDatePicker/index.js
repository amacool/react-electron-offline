import React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import './styles.css';
import CalendarIcon from '../../../assets/icons/calendar/calendar.svg';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

export const CustomDatePicker = ({ onChange, label, required }) => {
  const FORMAT = 'MM/dd/yyyy';
  return (
    <div className='custom-date-picker'>
      <label>
        {label}{required && <b>*</b>}
      </label>
      <div>
        <DayPickerInput
          formatDate={formatDate}
          format={FORMAT}
          parseDate={parseDate}
          placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          onDayChange={(v) => onChange({ target : { value: dateFnsFormat(v, FORMAT) } })}
        />
        <img className="calendar-icon" src={CalendarIcon} alt='' />
      </div>
    </div>
  )
};

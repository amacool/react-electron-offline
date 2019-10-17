import React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ar';
import 'moment/locale/fr';
import 'moment/locale/ru';
// import 'moment/locale/sp';
// import 'moment/locale/cn';
import CalendarIcon from '../../../assets/icons/calendar/calendar.svg';
import 'react-day-picker/lib/style.css';
import './styles.css';

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

export const CustomDatePicker = ({ onChange, label, required, value, locale = "en" }) => {
  const FORMAT = 'MM/dd/yyyy';
  console.log(locale);

  return (
    <div className='custom-date-picker'>
      <label>
        {label}{required && <b>*</b>}
      </label>
      <div>
        <DayPickerInput
          id="day-picker-input"
          value={value}
          formatDate={formatDate}
          format={FORMAT}
          localeUtils={MomentLocaleUtils}
          dayPickerProps={{ locale: 'ja' }}
          parseDate={parseDate}
          placeholder="MM/DD/YYYY"
          onDayChange={(v) => v && onChange({ target : { value: dateFnsFormat(v, FORMAT) } })}
        />
        <img className="calendar-icon" src={CalendarIcon} alt='' />
      </div>
    </div>
  )
};

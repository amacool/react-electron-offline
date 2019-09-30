import React from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './styles.css';

export const CustomDatePicker = ({ onChange, label, required }) => {
  return (
    <div className='custom-date-picker'>
      <label>
        {label}{required && <b>*</b>}
      </label>
      <DayPickerInput
        format='MM/dd/yyyy'
        onDayChange={onChange}
      />
    </div>
  )
};

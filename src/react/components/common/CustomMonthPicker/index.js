import React from "react";
import YearMonthSelector from "react-year-month-selector";
import CalendarIcon from "../../../assets/icons/calendar/calendar.svg";
import "react-year-month-selector/src/styles/index.css";
import "./style.css";
import {isValidYearMonth} from "../../../common/helper";

export const CustomMonthPicker = ({
  id,
  value,
  required,
  label,
  onChange,
  validation,
  disabled
}) => {
  const [open, setOpen] = React.useState(false);
  const date = new Date();
  const year = isValidYearMonth(value) ? value.split('/')[1] : date.getFullYear();
  const month = isValidYearMonth(value) ? value.split('/')[0] : date.getMonth();

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOnWindow = (e) => {
    if (e.target.className === "ryms-clickout") {
      setOpen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleClickOnWindow);
    return () => {
      console.log('remove handler');
      window.removeEventListener('click', handleClickOnWindow);
    }
  }, []);

  return (
    <div className="custom-month-picker">
      <label className="custom-input-label" htmlFor={id}>
        {label}
        {required && <b>*</b>}
      </label>
      <div className={`custom-month-picker-input ${validation && !isValidYearMonth(value) ? 'input-empty' : ''} ${disabled ? 'disabled' : ''}`}>
        <input id={id} type="text" onChange={onChange} value={value} disabled={disabled} onClick={() => setOpen(true)} placeholder="MM/YYYY" />
        <img className="calendar-icon" src={CalendarIcon} alt='' />
      </div>
      <YearMonthSelector
        year={year}
        month={month}
        onChange={(year, month) => {
          let tMonth = (month + 1).toString().length === 1 ? '0' + (month + 1) : month + 1;
          onChange({ target: { value: `${tMonth}/${year}` } });
        }}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

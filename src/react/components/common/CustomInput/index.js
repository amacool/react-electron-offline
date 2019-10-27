import React from 'react';
import "./styles.css";

export const CustomInput = ({ label, onChange, required, id, value, validation, disabled }) => (
  <div className="custom-input-control">
    <label className="custom-input-label" htmlFor={id}>
      {label}
      {required && <b>*</b>}
    </label>
    <div className={`custom-input ${validation && required && !value ? 'input-empty' : ''} ${disabled ? 'disabled' : ''}`}>
      <input id={id} type="text" onChange={onChange} value={value} disabled={disabled} />
    </div>
  </div>
);

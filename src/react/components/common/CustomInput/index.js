import React from 'react';
import "./styles.css";

export const CustomInput = ({ label, onChange, required, id, value, validation }) => (
  <div className="custom-input-control">
    <label className="custom-input-label" htmlFor={id}>
      {label}
      {required && <b>*</b>}
    </label>
    <div className={`custom-input ${validation && required && !value ? 'input-empty' : ''}`}>
      <input id={id} type="text" onChange={onChange} value={value} />
    </div>
  </div>
);

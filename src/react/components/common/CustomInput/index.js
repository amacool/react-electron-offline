import React from 'react';
import "./styles.css";

export const CustomInput = ({ label, onChange, required, id }) => (
  <div className="custom-input-control">
    <label className="custom-input-label" htmlFor={id}>
      {label}
      {required && <b>*</b>}
    </label>
    <div className="custom-input">
      <input id={id} type="text" onChange={onChange} />
    </div>
  </div>
);

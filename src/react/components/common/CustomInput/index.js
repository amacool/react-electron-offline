import React from 'react';
import "./styles.css";

export const CustomInput = ({ label, onChange, required }) => (
  <div className="custom-input-control">
    <div className="custom-input-label">
      {label}
      {required && <b>*</b>}
    </div>
    <div className="custom-input">
      <input type="text" onChange={onChange} />
    </div>
  </div>
);

import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import "./styles.css";

export const CustomCheckbox = ({ label, onChange, required, value }) => (
  <div className="custom-checkbox-control">
    <label className="custom-checkbox-label">
      {label}{required && <b>*</b>}
    </label>
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          onChange={onChange}
          value={value}
          checked={value}
        />
      }
      label={label}
      className="form-control custom-checkbox"
    />
  </div>
);

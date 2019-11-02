import React from "react";
import CrossIcon from "../../../assets/icons/cross/cross-light.svg";
import "./styles.css";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

export const CustomMultiSelect = ({ options, selected, label, required, onChange, id, validation }) => {
  const [values, setValues] = React.useState(selected);
  const handleClick = React.useCallback((item) => {
    let tValues = values;
    const pos = tValues.indexOf(item);
    tValues.splice(pos, 1);
    setValues(tValues);
    onChange({ target: { value: tValues } });
  }, [values, setValues, onChange]);
  const addValue = () => (e) => {
    if (values.indexOf(e.target.value) === -1) {
      onChange({ target: { value: [...values, e.target.value] } });
      setValues([...values, e.target.value]);
    }
  };

  React.useEffect(() => {
    setValues(selected);
  }, [selected]);

  // React.useEffect(() => {
  //   setValues([]);
  // }, [options]);

  return (
    <div className="custom-multi-select">
      <FormControl variant="outlined" className="form-control custom-outlined-form-control">
        <InputLabel htmlFor="regime" className="custom-select-label">
          {label}{required && <b>*</b>}
        </InputLabel>
        <Select
          value={label}
          onChange={addValue()}
          className="custom-select"
          inputProps={{
            name: id,
            id: id,
          }}
        >
          {options.filter((item) => values.indexOf(item) === -1).map((option, index) => (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={`select-heading ${validation && required && selected.length === 0 ? 'select-empty' : ''}`}>{label}</div>
      <div className="select-body">
        <div className="select-body-inner">
          {values.map((item, index) => (
            <div className="select-option" key={index}>
              {item}
              <img className="icon" src={CrossIcon} alt='' onClick={() => handleClick(item)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

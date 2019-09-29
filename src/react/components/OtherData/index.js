import React from 'react';
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import './styles.css';
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

function OtherData({ settings, handleSetValue }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    gender: '',
    livingStatus: '',
    nationality: '',
    title: '',
    designations: ''
  });
  const gender = settings.gender[0];
  const livingStatus = settings.livingStatus[0];
  const language = 'EN';
  console.log(gender);

  React.useEffect(() => {
    setCategoryLabelWidth(categoryLabel.current && categoryLabel.current.offsetWidth);
  }, []);

  const handleChange = name => e => {
    const value = {
      ...state,
      [name]: e.target.value
    };
    setState(value);
  };

  return (
    <div className="start-page Names">
      <div className="header">
        <h5>other data</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="custom-add-group mb-50">
            <div className="col-6 mr-15 mt-26">
              <div className="custom-add-group mb-20">
                <div className="col-6 mr-15">
                  <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                    <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                      Gender<b>*</b>
                    </InputLabel>
                    <Select
                      value={state.gender}
                      onChange={handleChange('gender')}
                      labelWidth={categoryLabelWidth}
                      inputProps={{
                        name: 'gender',
                        id: 'gender',
                      }}
                      className="custom-select"
                      placeholder="Primary"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {gender && Object.keys(gender[language]).map((itemKey, index) => (
                        <MenuItem
                          value={itemKey}
                          key={index}
                        >
                          {gender[language][itemKey]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                    <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                      Living Status<b>*</b>
                    </InputLabel>
                    <Select
                      value={state.livingStatus}
                      onChange={handleChange('livingStatus')}
                      labelWidth={categoryLabelWidth}
                      inputProps={{
                        name: 'living-status',
                        id: 'living-status',
                      }}
                      className="custom-select"
                      placeholder="Primary"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {livingStatus && Object.keys(livingStatus[language]).map((itemKey, index) => (
                        <MenuItem
                          value={itemKey}
                          key={index}
                        >
                          {livingStatus[language][itemKey]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="custom-add-group">
                <CustomInput
                  id="title"
                  label="Title"
                  required={true}
                  onChange={handleChange("title")}
                />
              </div>
            </div>
            <div className="col-4">
              <CustomInput
                id="nationality"
                label="Nationality"
                required={true}
                onChange={handleChange("nationality")}
              />
            </div>
          </div>
          <div className="custom-add-group">
            <TextField
              value={state.designations}
              id="designations"
              label="Designations"
              multiline
              rows="5"
              onChange={handleChange('designations')}
              className="text-field custom-textarea-control"
              variant="outlined"
              placeholder="Designations"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherData;

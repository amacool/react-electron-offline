import React from "react";
import connect from "react-redux/es/connect/connect";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { CustomInput } from "../common/CustomInput";

function OtherData({ settings, handleSetValue, data, vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState(data);
  const gender = settings.gender[0];
  const livingStatus = settings.livingStatus[0];

  React.useEffect(() => {
    setCategoryLabelWidth(categoryLabel.current && categoryLabel.current.offsetWidth);
  }, []);

  const handleChange = name => e => {
    const value = {
      ...state,
      [name]: e.target.value
    };
    setState(value);
    handleSetValue(value);
  };

  return (
    <div className="start-page OtherData" id="OTHER-DATA">
      <div className="header">
        <h5>{vocabularies[lang]['new']['main'][7]}</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="custom-add-group mb-50">
            <div className="col-6 mr-15 mt-26">
              <div className="custom-add-group mb-20">
                <div className="col-6 mr-15">
                  <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                    <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                      {vocabularies[lang]['new']['other data'][0]}<b>*</b>
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
                        <em>{vocabularies[lang]['new']['common'][3]}</em>
                      </MenuItem>
                      {gender && gender[lang] && Object.keys(gender[lang]).map((itemKey, index) => (
                        <MenuItem
                          value={itemKey}
                          key={index}
                        >
                          {gender[lang][itemKey]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-6">
                  <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                    <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                      {vocabularies[lang]['new']['other data'][1]}<b>*</b>
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
                        <em>{vocabularies[lang]['new']['common'][3]}</em>
                      </MenuItem>
                      {livingStatus && livingStatus[lang] && Object.keys(livingStatus[lang]).map((itemKey, index) => (
                        <MenuItem
                          value={itemKey}
                          key={index}
                        >
                          {livingStatus[lang][itemKey]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="custom-add-group">
                <CustomInput
                  value={state.title}
                  id="title"
                  label={vocabularies[lang]['new']['other data'][3]}
                  required={true}
                  onChange={handleChange("title")}
                />
              </div>
            </div>
            <div className="col-4">
              <CustomInput
                value={state.nationality}
                id="nationality"
                label={vocabularies[lang]['new']['other data'][2]}
                required={true}
                onChange={handleChange("nationality")}
              />
            </div>
          </div>
          <div className="custom-add-group">
            <TextField
              value={state.designations}
              id="designations"
              label={vocabularies[lang]['new']['other data'][4]}
              multiline
              rows="5"
              onChange={handleChange('designations')}
              className="text-field custom-textarea-control"
              variant="outlined"
              placeholder={vocabularies[lang]['new']['other data'][4]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default connect(mapStateToProps, null)(OtherData);

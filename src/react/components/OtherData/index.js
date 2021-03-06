import React from "react";
import connect from "react-redux/es/connect/connect";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { CustomInput } from "../common/CustomInput";
import { CustomHeader } from "../common/CustomHeader";

function OtherData({ settings, handleSetValue, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState(data);
  const [validation, setValidation] = React.useState(validating);
  const gender = settings.gender;
  const livingStatus = settings.livingStatus;
  const countries = settings.countries;

  React.useEffect(() => {
    setCategoryLabelWidth(categoryLabel.current && categoryLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    setValidation(validating);
  }, [validating]);

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
      <CustomHeader
        heading={vocabularies[lang]['new']['main'][7]}
        tooltipText={vocabularies[lang]['tooltip'] && vocabularies[lang]['tooltip']['otherData']}
      />
      <div className="content content-header">
        <div className="row">
          <div className="custom-add-group mb-50">
            <div className={`col-6 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
              <div className="custom-add-group mb-20">
                <div className={`col-6 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
                  <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.gender ? 'select-empty' : ''}`}>
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
                  <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.livingStatus ? 'select-empty' : ''}`}>
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
                        <em>{vocabularies[lang]['new']['common'][5]}</em>
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
                  validation={validation}
                />
              </div>
            </div>
            <div className="col-4 mt-26">
              <FormControl variant="outlined" className={`form-control custom-outlined-form-control`}>
                <InputLabel ref={categoryLabel} htmlFor="doc-type" className="custom-select-label">
                  {vocabularies[lang]['new']['other data'][2]}<b>*</b>
                </InputLabel>
                <Select
                  value={state.nationality}
                  onChange={handleChange('nationality')}
                  labelWidth={categoryLabelWidth}
                  inputProps={{
                    name: 'issued-country',
                    id: 'issued-country',
                  }}
                  className="custom-select"
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {countries && countries.map((item, index) => (
                    <MenuItem
                      value={item[lang]}
                      key={index}
                    >
                      {item[lang]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              className={`text-field custom-textarea-control ${lang === 'AR' ? 'textarea-rtl' : ''}`}
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
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(OtherData);

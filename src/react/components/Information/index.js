import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import './styles.css';
import '../common/FormControl/styles.css';
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomMultiSelect } from "../common/CustomMultiSelect";

function Information({ settings, handleSetValue, data }) {
  const typeLabel = React.useRef(null);
  const languageLabel = React.useRef(null);
  const regimeLabel = React.useRef(null);

  const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
  const [languageLabelWidth, setLanguageLabelWidth] = React.useState(0);
  const [regimeLabelWidth, setRegimeLabelWidth] = React.useState(0);
  const [state, setState] = React.useState(data);

  const entryTypes = settings.entryType[0];
  const regime = settings.regime[0];
  const applicableMeasure = React.useMemo(() => {
    if (
      !settings.applicableMeasure[0] ||
      !settings.applicableMeasure[0][state.language]
    ) {
      return {};
    }
    return settings.applicableMeasure[0][state.language];
  }, [state.language, settings]);
  const submittedBy = { a: 'person1', b: 'person2', c: 'person3' };

  React.useEffect(() => {
    setTypeLabelWidth(typeLabel.current.offsetWidth);
    setLanguageLabelWidth(languageLabel.current.offsetWidth);
    setRegimeLabelWidth(regimeLabel.current.offsetWidth);
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
    <div className="start-page Information" id="INFORMATION">
      <div className="header">
        <h5>INFORMATION</h5>
      </div>
      <div className="content">
        <div className="col-3">
          <div className="row">
            <FormControl variant="outlined" className="form-control custom-outlined-form-control">
              <InputLabel ref={typeLabel} htmlFor="entry-type" className="custom-select-label">
                Entry Type<b>*</b>
              </InputLabel>
              <Select
                value={state.entryType}
                onChange={handleChange('entryType')}
                labelWidth={typeLabelWidth}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {entryTypes && Object.keys(entryTypes[state.language]).map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {entryTypes[state.language][itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <FormControl variant="outlined" className="form-control custom-outlined-form-control">
              <InputLabel ref={languageLabel} htmlFor="language" className="custom-select-label">
                Language<b>*</b>
              </InputLabel>
              <Select
                value={state.language}
                onChange={handleChange('language')}
                labelWidth={languageLabelWidth}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {
                  settings.languages.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.type}>{item.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <FormControl variant="outlined" className="form-control custom-outlined-form-control">
              <InputLabel ref={regimeLabel} htmlFor="regime" className="custom-select-label">
                Regime<b>*</b>
              </InputLabel>
              <Select
                value={state.regime}
                onChange={handleChange('regime')}
                labelWidth={regimeLabelWidth}
                inputProps={{
                  name: 'regime',
                  id: 'regime',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {regime && Object.keys(regime[state.language]).map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {regime[state.language][itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <CustomCheckbox
              label="Member state(s) confidential"
              onChange={handleChange('memberStateConfidential')}
              required={true}
              value={state.memberStateConfidential}
            />
          </div>
        </div>
        <div className="col-3">
          <div className="row">
            <CustomMultiSelect
              id="applicable-measures"
              options={Object.values(applicableMeasure)}
              selected={state.applicableMeasure}
              label="Applicable Measures"
              required={true}
              onChange={handleChange('applicableMeasure')}
            />
          </div>
          <div className="row">
            <CustomMultiSelect
              id="submitted-by"
              options={Object.values(submittedBy)}
              selected={state.submittedBy}
              label="Submitted By"
              required={true}
              onChange={handleChange('submittedBy')}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <TextField
              value={state.entryRemarks}
              id="entry-remarks"
              label="Entry Remarks"
              multiline
              rows="5"
              onChange={handleChange('entryRemarks')}
              className="text-field custom-textarea-control"
              variant="outlined"
              placeholder="Max length 500 chars"
            />
          </div>
          <div className="row">
            <TextField
              value={state.reasonForListing}
              id="reason-listing"
              label="Reason For Listing"
              multiline
              rows="5"
              onChange={handleChange('reasonForListing')}
              className="text-field custom-textarea-control"
              variant="outlined"
              placeholder="Max length 500 chars"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;

import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import './styles.css';
import '../FormControl/styles.css';
import {CustomCheckbox} from "../common/CustomCheckbox";

function Information({ settings, handleSetValue }) {
  const typeLabel = React.useRef(null);
  const applicableMeasuresLabel = React.useRef(null);
  const languageLabel = React.useRef(null);
  const submittedByLabel = React.useRef(null);
  const regimeLabel = React.useRef(null);

  const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
  const [applicableMeasuresLabelWidth, setApplicableMeasuresLabelWidth] = React.useState(0);
  const [languageLabelWidth, setLanguageLabelWidth] = React.useState(0);
  const [submittedByLabelWidth, setSubmittedByLabelWidth] = React.useState(0);
  const [regimeLabelWidth, setRegimeLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    language: 'EN',
    entryType: '',
    regime: '',
    memberStateConfidential: false,
    applicableMeasure: '',
    submittedBy: '',
    entryRemarks: '',
    reasonForListing: ''
  });

  const entryTypes = settings.entryType[0];
  const regime = settings.regime[0];
  const applicableMeasure = settings.applicableMeasure[0];

  React.useEffect(() => {
    setTypeLabelWidth(typeLabel.current.offsetWidth);
    setApplicableMeasuresLabelWidth(applicableMeasuresLabel.current.offsetWidth);
    setLanguageLabelWidth(languageLabel.current.offsetWidth);
    setSubmittedByLabelWidth(submittedByLabel.current.offsetWidth);
    setRegimeLabelWidth(regimeLabel.current.offsetWidth);
  }, []);

  const handleChange = name => e => {
    const value = {
      ...state,
      [name]: name !== 'memberStateConfidential' ? e.target.value : e.target.checked
    };
    setState(value);
    handleSetValue(value);
  };

  return (
    <div className="start-page Information">
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
                  <MenuItem
                    value={itemKey}
                    key={index}
                  >
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
                  <MenuItem
                    value={itemKey}
                    key={index}
                  >
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
            <FormControl variant="outlined" className="form-control">
              <InputLabel ref={applicableMeasuresLabel} htmlFor="applicable-measures">
                Applicable Measures
              </InputLabel>
              <Select
                value={state.applicableMeasure}
                onChange={handleChange('applicableMeasure')}
                labelWidth={applicableMeasuresLabelWidth}
                inputProps={{
                  name: 'applicable_measures',
                  id: 'applicable-measures',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {applicableMeasure && Object.keys(applicableMeasure[state.language]).map((itemKey, index) => (
                  <MenuItem
                    value={itemKey}
                    key={index}
                  >
                    {applicableMeasure[state.language][itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <FormControl required variant="outlined" className="form-control">
              <InputLabel ref={submittedByLabel} htmlFor="submitted-by">
                Submitted By
              </InputLabel>
              <Select
                value={state.submittedBy}
                onChange={handleChange('submittedBy')}
                labelWidth={submittedByLabelWidth}
                inputProps={{
                  name: 'submitted-by',
                  id: 'submitted-by',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
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

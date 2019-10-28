import React from "react";
import connect from "react-redux/es/connect/connect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomMultiSelect } from "../common/CustomMultiSelect";
import { CustomHeader } from "../common/CustomHeader";
import { CustomInput } from "../common/CustomInput";
import "../common/FormControl/styles.css";
import "./styles.css";

function Information({ settings, handleSetValue, data, vocabularies, languages, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const typeLabel = React.useRef(null);
  const languageLabel = React.useRef(null);
  const regimeLabel = React.useRef(null);

  const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
  const [languageLabelWidth, setLanguageLabelWidth] = React.useState(0);
  const [regimeLabelWidth, setRegimeLabelWidth] = React.useState(0);
  const [validation, setValidation] = React.useState(false);
  const [state, setState] = React.useState(data);

  const entryTypes = React.useMemo(() => {
    if (
      !settings.entryType[0] ||
      !settings.entryType[0][lang]
    ) {
      return {};
    }
    return settings.entryType[0][lang];
  }, [lang, settings]);
  const regime = React.useMemo(() => {
    if (
      !settings.regime[0] ||
      !settings.regime[0][lang]
    ) {
      return {};
    }
    return settings.regime[0][lang];
  }, [lang, settings]);
  const applicableMeasure = React.useMemo(() => {
    if (
      !settings.applicableMeasure[0] ||
      !settings.applicableMeasure[0][lang]
    ) {
      return {};
    }
    return settings.applicableMeasure[0][lang];
  }, [lang, settings]);
  const submittedBy = { a: 'person1', b: 'person2', c: 'person3' };

  React.useEffect(() => {
    setTypeLabelWidth(typeLabel.current.offsetWidth);
    setLanguageLabelWidth(languageLabel.current.offsetWidth);
    setRegimeLabelWidth(regimeLabel.current.offsetWidth);
  }, []);

  React.useEffect(() => {
    setState(data);
  }, [data]);

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
    <div className="start-page Information" id="INFORMATION">
      <CustomHeader
        heading={vocabularies[lang]['new']['main'][4]}
        tooltipText={settings.tooltip && settings.tooltip[0] && settings.tooltip[0][lang]['information']}
      />
      <div className="content mb-0">
        <div className="col-3">
          <div className="row">
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.entryType ? 'select-empty' : ''}`}>
              <InputLabel ref={typeLabel} htmlFor="entry-type" className="custom-select-label">
                {vocabularies[lang]['new']['information'][0]}<b>*</b>
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
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {entryTypes && Object.keys(entryTypes).map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {entryTypes[itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.language ? 'select-empty' : ''}`}>
              <InputLabel ref={languageLabel} htmlFor="language" className="custom-select-label">
                {vocabularies[lang]['new']['information'][3]}<b>*</b>
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
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {
                  languages.map((item, i) => {
                    return (
                      <MenuItem key={i} value={item.type}>{item.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.regime ? 'select-empty' : ''}`}>
              <InputLabel ref={regimeLabel} htmlFor="regime" className="custom-select-label">
                {vocabularies[lang]['new']['information'][4]}<b>*</b>
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
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {regime && Object.keys(regime).map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {regime[itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="row">
            <CustomCheckbox
              label={vocabularies[lang]['new']['information'][7]}
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
              label={vocabularies[lang]['new']['information'][1]}
              required={true}
              onChange={handleChange('applicableMeasure')}
              validation={validation}
            />
          </div>
          <div className="row">
            <CustomMultiSelect
              id="submitted-by"
              options={Object.values(submittedBy)}
              selected={state.submittedBy}
              label={vocabularies[lang]['new']['information'][5]}
              required={true}
              onChange={handleChange('submittedBy')}
              validation={validation}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="row">
            <TextField
              value={state.entryRemarks}
              id="entry-remarks"
              label={vocabularies[lang]['new']['information'][2]}
              multiline
              rows="5"
              onChange={handleChange('entryRemarks')}
              className={`text-field custom-textarea-control ${lang === 'AR' ? 'textarea-rtl' : ''}`}
              variant="outlined"
              style={{ direction: lang === 'AR' ? 'rtl' : '' }}
              placeholder={vocabularies[lang]['new']['common'][7]}
            />
          </div>
          <div className="row">
            <TextField
              value={state.reasonForListing}
              id="reason-listing"
              label={vocabularies[lang]['new']['information'][6]}
              multiline
              rows="5"
              onChange={handleChange('reasonForListing')}
              className={`text-field custom-textarea-control ${lang === 'AR' ? 'textarea-rtl' : ''}`}
              variant="outlined"
              placeholder={vocabularies[lang]['new']['common'][7]}
            />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="col-5">
          <CustomInput
            value={state.statementConfidential}
            id="names-statement-confidential"
            label={vocabularies[lang]['new']['information'][8]}
            required={true}
            onChange={handleChange("statementConfidential")}
            validation={validation}
          />
        </div>
        <div className="col-5">
          <CustomInput
            value={state.publicStatement}
            id="names-public-statement"
            label={vocabularies[lang]['new']['information'][9]}
            required={true}
            onChange={handleChange("publicStatement")}
            validation={validation}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  languages: state.languages,
  validating: state.validating
});

export default connect(mapStateToProps, null)(Information);

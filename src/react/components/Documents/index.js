import React from 'react';
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomDatePicker } from "../common/CustomDatePicker";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import './styles.css';

function Documents({ settings, handleSetValue }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    docNumber: '',
    docType: '',
    docType1: '',
    issuingCity: '',
    issuedCountry: '',
    issuingCountry: '',
    issuedDate: '',
    notes: '',
    expirationDate: ''
  });
  const [documents, setDocuments] = React.useState([]);
  const documentType = settings.documentType[0];
  const language = 'EN';

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

  const handleAdd = () => {
    if (state.identityType === '' || state.category === '') {
      alert('Please input values!');
      return;
    }
    handleSetValue([...documents, state]);
    setDocuments([...documents, state]);
  };

  return (
    <div className="start-page Documents">
      <div className="header">
        <h5>documents</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="col">
              <CustomInput
                id="doc-number"
                label="Document Number"
                required={true}
                onChange={handleChange("docNumber")}
              />
            </div>
            <div className="col ml-15 mr-15 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="doc-type" className="custom-select-label">
                  Document Type<b>*</b>
                </InputLabel>
                <Select
                  value={state.docType}
                  onChange={handleChange('docType')}
                  labelWidth={categoryLabelWidth}
                  inputProps={{
                    name: 'doc-type',
                    id: 'doc-type',
                  }}
                  className="custom-select"
                  placeholder="Primary"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {documentType && Object.keys(documentType[language]).map((itemKey, index) => (
                    <MenuItem
                      value={itemKey}
                      key={index}
                    >
                      {documentType[language][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <CustomInput
                id="doc-type1"
                label="Document Type1"
                required={true}
                onChange={handleChange("docType1")}
              />
            </div>
          </div>
          <div className="inline mb-20">
            <div className="w-34 mr-15">
              <CustomInput
                id="issuing-city"
                label="Issuing City"
                required={true}
                onChange={handleChange("issuingCity")}
              />
            </div>
            <div className="w-69 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="doc-type" className="custom-select-label">
                  Issued Country<b>*</b>
                </InputLabel>
                <Select
                  value={state.issuedCountry}
                  onChange={handleChange('issuedCountry')}
                  labelWidth={categoryLabelWidth}
                  inputProps={{
                    name: 'issued-country',
                    id: 'issued-country',
                  }}
                  className="custom-select"
                  placeholder="Primary"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="EN">
                    <em>England</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="inline mb-20">
            <div className="w-69 mr-15 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="issuing-country" className="custom-select-label">
                  Issuing Country<b>*</b>
                </InputLabel>
                <Select
                  value={state.issuingCountry}
                  onChange={handleChange('issuingCountry')}
                  labelWidth={categoryLabelWidth}
                  inputProps={{
                    name: 'issuing-country',
                    id: 'issuing-country',
                  }}
                  className="custom-select"
                  placeholder="Primary"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="EN">
                    <em>England</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-34">
              <CustomDatePicker
                required={true}
                label="Issued Date"
                onChange={(e) => console.log(e)}
              />
            </div>
          </div>
          <div className="inline mb-20">
            <div className="w-69 mr-15 mt-26">
              <TextField
                value={state.notes}
                id="notes"
                label="Notes"
                multiline
                rows="5"
                onChange={handleChange('notes')}
                className="text-field custom-textarea-control"
                variant="outlined"
                placeholder="Notes"
              />
            </div>
            <div className="w-34">
              <CustomInput
                id="expiration-date"
                label="Expiration Date"
                required={true}
                onChange={handleChange("expirationDate")}
              />
              <Button
                variant="contained"
                className="add-button"
                onClick={handleAdd}
              >
                ADD
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Document Number', 'Document Type', 'Notes']}
          data={documents.map((item) => ({ a: item.docNumber, b: item.docType, c: item.notes }))}
        />
      </div>
    </div>
  );
}

export default Documents;

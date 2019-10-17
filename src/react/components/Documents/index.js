import React from "react";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { ThreeDots } from "../common/Icons/ThreeDots";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import smalltalk from "smalltalk";
import "./styles.css";

function Documents({ settings, handleSetValue, data, vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
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
  const [documents, setDocuments] = React.useState(data);
  const [editIndex, setEditIndex] = React.useState(-1);
  const documentType = settings.documentType[0];
  const countries = settings.countries[0];

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

  const handleAdd = () => () => {
    if (
      state.docNumber === '' ||
      state.docType === '' ||
      state.docType1 === '' ||
      state.issuingCity === '' ||
      state.issuedCountry === '' ||
      state.issuingCountry === '' ||
      state.issuedDate === '' ||
      state.expirationDate === ''
    ) {
      smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return;
    }
    if (editIndex === -1) {
      handleSetValue([...documents, state]);
      setDocuments([...documents, state]);
    } else {
      let tArr = [...documents];
      tArr[editIndex] = {...state};
      handleSetValue(tArr);
      setDocuments(tArr);
    }
    setState({
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
    setEditIndex(-1);
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      setState(documents[index]);
      setEditIndex(index);
    } else {
      let tArr = [...documents];
      tArr.splice(index, 1);
      setDocuments(tArr);
      setState({
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
      setEditIndex(-1);
      handleSetValue(tArr);
    }
  };

  return (
    <div className="start-page Documents" id="DOCUMENTS">
      <div className="header">
        <h5>{vocabularies[lang]['new']['main'][8]}</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="col">
              <CustomInput
                value={state.docNumber}
                id="doc-number"
                label={vocabularies[lang]['new']['documents'][0]}
                required={true}
                onChange={handleChange("docNumber")}
              />
            </div>
            <div className="col ml-15 mr-15 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="doc-type" className="custom-select-label">
                  {vocabularies[lang]['new']['documents'][1]}<b>*</b>
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
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {documentType && documentType[lang] && Object.keys(documentType[lang]).map((itemKey, index) => (
                    <MenuItem
                      value={itemKey}
                      key={index}
                    >
                      {documentType[lang][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <CustomInput
                value={state.docType1}
                id="doc-type1"
                label={vocabularies[lang]['new']['documents'][1]}
                required={true}
                onChange={handleChange("docType1")}
              />
            </div>
          </div>
          <div className="inline mb-20">
            <div className={`w-34 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.issuingCity}
                id="issuing-city"
                label={vocabularies[lang]['new']['documents'][2]}
                required={true}
                onChange={handleChange("issuingCity")}
              />
            </div>
            <div className="w-69 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="doc-type" className="custom-select-label">
                  {vocabularies[lang]['new']['documents'][3]}<b>*</b>
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
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {countries && countries[lang] && Object.keys(countries[lang]).map((itemKey, index) => (
                    <MenuItem
                      value={itemKey}
                      key={index}
                    >
                      {countries[lang][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="inline mb-20">
            <div className={`w-69 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="issuing-country" className="custom-select-label">
                  {vocabularies[lang]['new']['documents'][4]}<b>*</b>
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
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {countries && countries[lang] && Object.keys(countries[lang]).map((itemKey, index) => (
                    <MenuItem
                      value={itemKey}
                      key={index}
                    >
                      {countries[lang][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-34">
              <CustomDatePicker
                value={state.issuedDate}
                required={true}
                label={vocabularies[lang]['new']['documents'][5]}
                onChange={handleChange('issuedDate')}
                locale={lang}
              />
            </div>
          </div>
          <div className="inline mb-20">
            <div className={`w-69 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
              <TextField
                value={state.notes}
                id="notes"
                label={vocabularies[lang]['new']['common'][3]}
                multiline
                rows="5"
                onChange={handleChange('notes')}
                className={`text-field custom-textarea-control ${lang === 'AR' ? 'textarea-rtl' : ''}`}
                variant="outlined"
                placeholder={vocabularies[lang]['new']['common'][3]}
              />
            </div>
            <div className="w-34">
              <CustomDatePicker
                value={state.expirationDate}
                required={true}
                label={vocabularies[lang]['new']['documents'][6]}
                onChange={handleChange('expirationDate')}
                locale={lang}
              />
              <Button
                variant="contained"
                className={`add-button ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
                onClick={handleAdd()}
              >
                {editIndex >= 0 ? vocabularies[lang]['main'][7] : vocabularies[lang]['new']['common'][0]}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={[
            vocabularies[lang]['new']['documents'][0],
            vocabularies[lang]['new']['documents'][1],
            vocabularies[lang]['new']['common'][3]
          ]}
          data={documents.map((item) => ({ a: item.docNumber, b: item.docType, c: item.notes }))}
          extraCell={{ title: '', content: <ThreeDots color='#4eb6ee' /> }}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
            />
          })}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default connect(mapStateToProps, null)(Documents);

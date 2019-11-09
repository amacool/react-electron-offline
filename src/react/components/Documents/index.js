import React from "react";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { ThreeDots } from "../common/Icons/ThreeDots";
import { CustomHeader } from "../common/CustomHeader";
import { Preview } from "../common/Preview";
import { CustomModal } from "../common/CustomModal";
import TextField from "@material-ui/core/TextField/TextField";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import "./styles.css";
import {isValidDate} from "../../common/helper";

function Documents({ settings, handleSetValue, data, vocabularies, validating }) {
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
  const [validation, setValidation] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const countries = settings.countries;
  const documentType = React.useMemo(() => {
    if (
      !settings.documentType
    ) {
      return {};
    }
    return settings.documentType[lang];
  }, [lang, settings]);

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
    if (!doValidation()) return;

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
    setValidation(false);
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

  const doValidation = () => {
    if (
      state.docNumber === '' ||
      state.docType === '' ||
      state.docType1 === '' ||
      state.issuingCity === '' ||
      state.issuedCountry === '' ||
      state.issuingCountry === '' ||
      state.issuedDate === '' ||
      state.expirationDate === '' ||
      !isValidDate(state.issuedDate) ||
      !isValidDate(state.expirationDate)
    ) {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  return (
    <div className="start-page Documents" id="DOCUMENTS">
      <CustomHeader
        style={validating && documents.length === 0 ? { backgroundColor: '#ffaeae' } : {}}
        heading={vocabularies[lang]['new']['main'][8]}
        tooltipText={vocabularies[lang]['tooltip'] && vocabularies[lang]['tooltip']['documents']}
      />
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
                validation={validation}
              />
            </div>
            <div className="col ml-15 mr-15 mt-26">
              <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.docType ? 'select-empty' : ''}`}>
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
                  {documentType && documentType && Object.keys(documentType).map((itemKey, index) => (
                    <MenuItem
                      value={documentType[itemKey]}
                      key={index}
                    >
                      {documentType[itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <CustomInput
                value={state.docType1}
                id="doc-type1"
                label={`${vocabularies[lang]['new']['documents'][1]}1`}
                required={true}
                onChange={handleChange("docType1")}
                validation={validation}
              />
            </div>
          </div>
          <div className="inline mb-20">
            <div className="col">
              <CustomInput
                value={state.issuingCity}
                id="issuing-city"
                label={vocabularies[lang]['new']['documents'][2]}
                required={true}
                onChange={handleChange("issuingCity")}
                validation={validation}
              />
            </div>
            <div className="col ml-15 mr-15 mt-26">
              <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.issuedCountry ? 'select-empty' : ''}`}>
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
            <div className="col mt-26">
              <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.issuingCountry ? 'select-empty' : ''}`}>
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
                value={state.issuedDate}
                required={true}
                label={vocabularies[lang]['new']['documents'][5]}
                onChange={handleChange('issuedDate')}
                locale={lang}
                validation={validation}
                className="mb-20"
              />
              <CustomDatePicker
                value={state.expirationDate}
                required={true}
                label={vocabularies[lang]['new']['documents'][6]}
                onChange={handleChange('expirationDate')}
                locale={lang}
                validation={validation}
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
          originalData={documents}
          extraCell={{ title: '', content: <ThreeDots color='#4eb6ee' /> }}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              onPreview={() => {
                setPreview(documents[index]);
              }}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
              label3={vocabularies[lang]['new']['common'][8]}
            />
          })}
          updateOrigin={(data) => {
            handleSetValue(data);
            setDocuments(data);
          }}
        />
      </div>
      <CustomModal
        isOpen={preview}
        title={vocabularies[lang]['new']['common'][9]}
        singleButton={true}
        onClose={() => setPreview(false)}
        labelClose={vocabularies[lang]['main'][12]}
        size="sm"
      >
        {preview && (
          <Preview
            data={{
              docNumber: preview.docNumber,
              docType: preview.docType,
              docType1: preview.docType1,
              issuingCity: preview.issuingCity,
              issuedCountry: preview.issuedCountry,
              issuingCountry: preview.issuingCountry,
              issuedDate: preview.issuedDate,
              expirationDate: preview.expirationDate,
              notes: preview.notes
            }}
            header={[
              vocabularies[lang]['new']['documents'][0],
              vocabularies[lang]['new']['documents'][1],
              `${vocabularies[lang]['new']['documents'][1]}1`,
              vocabularies[lang]['new']['documents'][2],
              vocabularies[lang]['new']['documents'][3],
              vocabularies[lang]['new']['documents'][4],
              vocabularies[lang]['new']['documents'][5],
              vocabularies[lang]['new']['documents'][6],
              vocabularies[lang]['new']['common'][3]
            ]}
          />
        )}
      </CustomModal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(Documents);

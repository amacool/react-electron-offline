import React from "react";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { CustomHeader } from "../common/CustomHeader";
import { Preview } from "../common/Preview";
import { CustomModal } from "../common/CustomModal";
import "./styles.css";

function DatesOfBirth({ settings, handleSetValue, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const [state, setState] = React.useState({
    specific: true,
    date: '',
    range: false,
    subset: '',
    from: '',
    to: '',
    notes: ''
  });
  const [dates, setDates] = React.useState(data);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [validation, setValidation] = React.useState(false);
  const [preview, setPreview] = React.useState(false);

  const handleChange = name => e => {
    if (name === 'specific') {
      setState({
        ...state,
        [name]: e.target.value,
        range: !e.target.value
      });
    } else if (name === 'range') {
      setState({
        ...state,
        [name]: e.target.value,
        specific: !e.target.value
      });
    } else {
      setState({
        ...state,
        [name]: e.target.value,
      });
    }
  };

  const handleAdd = () => {
    if (!doValidation()) return;

    let value = { ...state };
    if (state.specific) {
      value.subset = '';
      value.from = '';
      value.to = '';
    } else if (state.range) {
      value.date = '';
    }
    if (editIndex === -1) {
      handleSetValue([...dates, value]);
      setDates([...dates, value]);
    } else {
      let tArr = [...dates];
      tArr[editIndex] = value;
      handleSetValue(tArr);
      setDates(tArr);
    }
    setState({
      specific: false,
      date: '',
      range: false,
      subset: '',
      from: '',
      to: '',
      notes: ''
    });
    setEditIndex(-1);
    setValidation(false);
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      setState(dates[index]);
      setEditIndex(index);
    } else {
      let tArr = [...dates];
      tArr.splice(index, 1);
      setDates(tArr);
      setState({
        specific: false,
        date: '',
        range: false,
        subset: '',
        from: '',
        to: '',
        notes: ''
      });
      setEditIndex(-1);
      handleSetValue(tArr);
    }
  };

  const doValidation = () => {
    if (!state.specific && !state.range) {
      return false;
    }
    if (state.specific && state.date === '') {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    if (state.range === '' && (
      state.subset === ''
      || state.from === ''
      || state.to === ''
    )) {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  return (
    <div className="start-page" id="DATES-OF-BIRTH">
      <CustomHeader
        style={validating && dates.length === 0 ? { backgroundColor: '#ffaeae' } : {}}
        heading={vocabularies[lang]['new']['main'][11]}
        tooltipText={vocabularies[lang]['tooltip'] && vocabularies[lang]['tooltip']['datesOfBirth']}
      />
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className={`col w-31 ${lang === 'AR' ? 'ml' : 'mr'}mr-15`}>
              <CustomCheckbox
                label={vocabularies[lang]['new']['dates of birth'][0]}
                onChange={handleChange('specific')}
                required={true}
                value={state.specific}
              />
            </div>
            <div className="col specific-date">
              <CustomDatePicker
                value={state.date}
                required={true}
                label={vocabularies[lang]['new']['dates of birth'][1]}
                onChange={handleChange('date')}
                locale={lang}
                validation={validation && state.specific}
                disabled={!state.specific}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className={`w-31 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomCheckbox
                label={vocabularies[lang]['new']['dates of birth'][2]}
                onChange={handleChange('range')}
                required={true}
                value={state.range}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.subset}
                id="subset"
                label={vocabularies[lang]['new']['dates of birth'][3]}
                required={true}
                onChange={handleChange("subset")}
                validation={validation && state.range}
                disabled={!state.range}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomDatePicker
                value={state.from}
                required={true}
                label={vocabularies[lang]['new']['dates of birth'][4]}
                onChange={handleChange('from')}
                locale={lang}
                validation={validation && state.range}
                disabled={!state.range}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomDatePicker
                value={state.to}
                required={true}
                label={vocabularies[lang]['new']['dates of birth'][5]}
                onChange={handleChange('to')}
                locale={lang}
                validation={validation && state.range}
                disabled={!state.range}
              />
            </div>
            <div className="col" />
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
                placeholder="Notes"
              />
            </div>
            <div className="w-34 flex-end">
              <Button
                variant="contained"
                className={`add-button ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
                onClick={handleAdd}
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
            vocabularies[lang]['new']['dates of birth'][0],
            vocabularies[lang]['new']['dates of birth'][2],
            vocabularies[lang]['new']['common'][3]
          ]}
          data={dates.map((item) =>
            ({
              a: item.date,
              b: item.subset,
              c: item.notes
            })
          )}
          originalData={dates}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              onPreview={() => {
                setPreview(dates[index]);
              }}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
            />
          })}
          updateOrigin={(data) => {
            handleSetValue(data);
            setDates(data);
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
              date: preview.date,
              subset: preview.subset,
              from: preview.from,
              to: preview.to,
              notes: preview.notes
            }}
            header={[
              vocabularies[lang]['new']['dates of birth'][0],
              vocabularies[lang]['new']['dates of birth'][3],
              vocabularies[lang]['new']['dates of birth'][4],
              vocabularies[lang]['new']['dates of birth'][5],
              vocabularies[lang]['new']['common'][3]
            ]}
          />
        )}
      </CustomModal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(DatesOfBirth);

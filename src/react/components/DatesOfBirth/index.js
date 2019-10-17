import React from "react";
import smalltalk from "smalltalk";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomDatePicker } from "../common/CustomDatePicker";
import "./styles.css";

function DatesOfBirth({ settings, handleSetValue, data, vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const [state, setState] = React.useState({
    specific: false,
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

  const handleChange = name => e => {
    const value = {
      ...state,
      [name]: e.target.value
    };
    setState(value);
  };

  const handleAdd = () => {
    if (!doValidation()) return;

    if (editIndex === -1) {
      handleSetValue([...dates, state]);
      setDates([...dates, state]);
    } else {
      let tArr = [...dates];
      tArr[editIndex] = {...state};
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
    if (state.date === ''
      || state.subset === ''
      || state.from === ''
      || state.to === ''
    ) {
      setValidation(true);
      smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  return (
    <div className="start-page" id="DATES-OF-BIRTH">
      <div className="header">
        <h5>{vocabularies[lang]['new']['main'][11]}</h5>
      </div>
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
                validation={validation}
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
                validation={validation}
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
                validation={validation}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomDatePicker
                value={state.to}
                required={true}
                label={vocabularies[lang]['new']['dates of birth'][5]}
                onChange={handleChange('to')}
                locale={lang}
                validation={validation}
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
                validation={validation}
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
  )
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default connect(mapStateToProps, null)(DatesOfBirth);

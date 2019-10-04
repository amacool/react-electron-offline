import React from 'react';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import {CustomTable, TableBtnEditItem} from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomDatePicker } from "../common/CustomDatePicker";
import "./styles.css";

function DatesOfBirth({ settings, handleSetValue, data }) {
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

  const handleChange = name => e => {
    const value = {
      ...state,
      [name]: e.target.value
    };
    setState(value);
  };

  const handleAdd = () => {
    if (state.date === ''
      || state.subset === ''
      || state.from === ''
      || state.to === ''
    ) {
      alert('Please input values!');
      return;
    }
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
    }
  };

  return (
    <div className="start-page" id="DATES-OF-BIRTH">
      <div className="header">
        <h5>dates of birth</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="col w-31 mr-15">
              <CustomCheckbox
                label="Specific"
                onChange={handleChange('specific')}
                required={true}
                value={state.specific}
              />
            </div>
            <div className="col specific-date">
              <CustomDatePicker
                value={state.date}
                required={true}
                label="Date"
                onChange={handleChange('date')}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className="w-31 mr-15">
              <CustomCheckbox
                label="Range"
                onChange={handleChange('range')}
                required={true}
                value={state.range}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                value={state.subset}
                id="subset"
                label="Subset"
                required={true}
                onChange={handleChange("subset")}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className="col mr-15">
              <CustomDatePicker
                value={state.from}
                required={true}
                label="From"
                onChange={handleChange('from')}
              />
            </div>
            <div className="col mr-15">
              <CustomDatePicker
                value={state.to}
                required={true}
                label="To"
                onChange={handleChange('to')}
              />
            </div>
            <div className="col" />
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
            <div className="w-34 flex-end">
              <Button
                variant="contained"
                className="add-button"
                onClick={handleAdd}
              >
                {editIndex >= 0 ? 'SAVE' : 'ADD'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Specific', 'Range', 'Notes']}
          data={dates.map((item) =>
            ({
              a: item.date,
              b: item.subset,
              c: item.notes
            })
          )}
          getExtraCell={(index) => ({ title: '', content: <TableBtnEditItem onEdit={(mode) => handleEdit(mode, index)} /> })}
        />
      </div>
    </div>
  )
}

export default DatesOfBirth;
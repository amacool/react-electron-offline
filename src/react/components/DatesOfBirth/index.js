import React from 'react';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomDatePicker } from "../common/CustomDatePicker";
import { ThreeDots } from "../common/Icons/ThreeDots";
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
    handleSetValue([...dates, state]);
    setDates([...dates, state]);
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
                required={true}
                label="From"
                onChange={handleChange('from')}
              />
            </div>
            <div className="col mr-15">
              <CustomDatePicker
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
                ADD
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
          extraCell={{ title: '', content: <ThreeDots color='#4eb6ee' /> }}
        />
      </div>
    </div>
  )
}

export default DatesOfBirth;
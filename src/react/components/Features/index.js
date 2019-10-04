import React from 'react';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

function Features({ settings, handleSetValue, data }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    type: false,
    value: '',
    notes: ''
  });
  const [features, setFeatures] = React.useState(data);
  const [editIndex, setEditIndex] = React.useState(-1);

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
    if (state.type === '' || state.value === '') {
      alert('Please input values!');
      return;
    }
    if (editIndex === -1) {
      handleSetValue([...features, state]);
      setFeatures([...features, state]);
    } else {
      let tArr = [...features];
      tArr[editIndex] = {...state};
      handleSetValue(tArr);
      setFeatures(tArr);
    }
    setState({
      type: false,
      value: '',
      notes: ''
    });
    setEditIndex(-1);
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      setState(features[index]);
      setEditIndex(index);
    } else {
      let tArr = [...features];
      tArr.splice(index, 1);
      setFeatures(tArr);
      setState({
        type: false,
        value: '',
        notes: ''
      });
      setEditIndex(-1);
    }
  };

  return (
    <div className="start-page" id="FEATURES">
      <div className="header">
        <h5>features</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="w-31 mr-15 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                  Type<b>*</b>
                </InputLabel>
                <Select
                  value={state.type}
                  onChange={handleChange('type')}
                  labelWidth={categoryLabelWidth}
                  inputProps={{
                    name: 'type',
                    id: 'type',
                  }}
                  className="custom-select"
                  placeholder="Primary"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Ten">Ten</MenuItem>
                  <MenuItem value="Twenty">Twenty</MenuItem>
                  <MenuItem value="Thirty">Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <CustomInput
                value={state.value}
                id="value"
                label="Value"
                required={true}
                onChange={handleChange("value")}
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
          header={['Type', 'Value', 'Notes']}
          data={features.map((item) =>
            ({
              a: item.type,
              b: item.value,
              c: item.notes
            })
          )}
          getExtraCell={(index) => ({ title: '', content: <TableBtnEditItem onEdit={(mode) => handleEdit(mode, index)} /> })}
        />
      </div>
    </div>
  )
}

export default Features;
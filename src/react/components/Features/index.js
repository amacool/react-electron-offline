import React from "react";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import smalltalk from "smalltalk";
import connect from "react-redux/es/connect/connect";

function Features({ settings, handleSetValue, data, vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    type: false,
    value: '',
    notes: ''
  });
  const [features, setFeatures] = React.useState(data);
  const [editIndex, setEditIndex] = React.useState(-1);
  const types = settings.type[0];

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
      smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
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
      handleSetValue(tArr);
    }
  };

  return (
    <div className="start-page" id="FEATURES">
      <div className="header">
        <h5>{vocabularies[lang]['new']['main'][12]}</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="w-31 mr-15 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                  {vocabularies[lang]['new']['common'][4]}<b>*</b>
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
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {types && Object.keys(types[lang]).map((itemKey, index) => (
                    <MenuItem
                      value={itemKey}
                      key={index}
                    >
                      {types[lang][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <CustomInput
                value={state.value}
                id="value"
                label={vocabularies[lang]['new']['features'][0]}
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
                label={vocabularies[lang]['new']['common'][3]}
                multiline
                rows="5"
                onChange={handleChange('notes')}
                className="text-field custom-textarea-control"
                variant="outlined"
                placeholder={vocabularies[lang]['new']['common'][3]}
              />
            </div>
            <div className="w-34 flex-end">
              <Button
                variant="contained"
                className="add-button"
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
            vocabularies[lang]['new']['common'][4],
            vocabularies[lang]['new']['features'][0],
            vocabularies[lang]['new']['common'][3]
          ]}
          data={features.map((item) =>
            ({
              a: item.type,
              b: item.value,
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

export default connect(mapStateToProps, null)(Features);

import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../common/CustomTable";
import './styles.css';
import TextField from "@material-ui/core/TextField/TextField";

function Names({ names, handleSetValue }) {
  const [state, setState] = React.useState({
    name: '',
    type: '',
    script: ''
  });
  const items = names;

  const categoryLabel = React.useRef(null);

  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setCategoryLabelWidth(categoryLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleAdd = () => {
    if (state.name === '' || state.type === '' || state.script === '') {
      alert('Please input values!');
      return;
    }
    handleSetValue([...items, state]);
  };

  return (
    <div className="Names">
      <div className="header">
        <h5>Names</h5>
      </div>
      <div className="content content-header">
        <div>
          <div className="row">
            <TextField
              id="identity-types"
              label="Identity Types*"
              multiline
              onChange={handleChange("type")}
              className="text-field custom-textarea-control custom-input-control"
              variant="outlined"
            />
          </div>
        </div>
        <div>
          <div className="row">
            <FormControl variant="outlined" className="form-control custom-outlined-form-control">
              <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                Category<b>*</b>
              </InputLabel>
              <Select
                value={state.category}
                onChange={handleChange('category')}
                labelWidth={categoryLabelWidth}
                inputProps={{
                  name: 'category',
                  id: 'category',
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
        </div>
        <Button variant="contained" className="cancel-button" onClick={handleAdd}>ADD</Button>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Identity Type', 'Category']}
          data={items}
        />
      </div>
    </div>
  );
}

export default Identities;

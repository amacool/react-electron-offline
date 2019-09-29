import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import './styles.css';

function Identities({ settings, handleSetValue }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    identityType: '',
    category: ''
  });
  const [identities, setIdentities] = React.useState([]);

  React.useEffect(() => {
    setCategoryLabelWidth(categoryLabel.current.offsetWidth);
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
    handleSetValue([...identities, state]);
    setIdentities([...identities, state]);
  };

  return (
    <div className="Identities">
      <div className="header">
        <h5>IDENTITIES</h5>
      </div>
      <div className="content content-header">
        <div>
          <div className="row">
            <CustomInput
              label="Identity Types"
              required={true}
              onChange={handleChange("identityType")}
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
          data={identities}
        />
      </div>
    </div>
  );
}

export default Identities;

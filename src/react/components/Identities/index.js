import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import './styles.css';

function Identities({ settings, handleSetValue, setIdentityType, setCurrentStep }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    identityType: '',
    category: ''
  });
  const [identities, setIdentities] = React.useState([]);

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
    if (state.identityType === '' || state.category === '') {
      alert('Please input values!');
      return;
    }
    handleSetValue([...identities, state]);
    setIdentities([...identities, state]);
  };

  const handleSetIdentityType = type => {
    setIdentityType(type);
    setCurrentStep(2);
  };

  return (
    <div className="start-page Identities" id="IDENTITIES">
      <div className="header">
        <h5>IDENTITIES</h5>
      </div>
      <div className="content content-header">
        <div className="custom-add-group row">
          <div className="col-4">
            <CustomInput
              id="identity-type"
              label="Identity Types"
              required={true}
              onChange={handleChange("identityType")}
            />
          </div>
          <div className="col-4">
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
          <Button
            variant="contained"
            className="add-button col-1 mt-39"
            onClick={handleAdd}
          >
            ADD
          </Button>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Identity Type', 'Category']}
          data={identities}
          handleClick={handleSetIdentityType}
        />
      </div>
    </div>
  );
}

export default Identities;

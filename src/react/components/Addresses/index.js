import React from 'react';
import Button from "@material-ui/core/Button/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import './styles.css';

function Addresses({ settings, handleSetValue }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    address: false,
    street: '',
    city: '',
    province: '',
    zipCode: '',
    country: '',
    location: false,
    region: '',
    latitude: '',
    longitude: '',
    notes: ''
  });
  const [addresses, setAddresses] = React.useState([]);
  const language = 'EN';

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
    if (state.address === ''
      || state.street === ''
      || state.city === ''
      || state.province === ''
      || state.zipCode === ''
      || state.country === ''
      || state.location === ''
      || state.region === ''
      || state.latitude === ''
      || state.longitude === ''
    ) {
      alert('Please input values!');
      return;
    }
    handleSetValue([...addresses, state]);
    setAddresses([...addresses, state]);
  };

  return (
    <div className="start-page Documents">
      <div className="header">
        <h5>addresses</h5>
      </div>
      <div className="content content-header">
        <div className="row inline">
          <div className="col">
            <CustomCheckbox
              label="address"
              onChange={handleChange('address')}
              required={true}
              value={state.address}
            />
          </div>
          <div className="col">
            <CustomInput
              id="street"
              label="Street"
              required={true}
              onChange={handleChange("street")}
            />
          </div>
        </div>

        <div className="row inline">
          <div className="col">
            <CustomInput
              id="city"
              label="City"
              required={true}
              onChange={handleChange("city")}
            />
          </div>
          <div className="col">
            <CustomInput
              id="province"
              label="Province"
              required={true}
              onChange={handleChange("province")}
            />
          </div>
          <div className="col">
            <CustomInput
              id="zip-code"
              label="Zip Code"
              required={true}
              onChange={handleChange("zipCode")}
            />
          </div>
          <div className="col">
            <FormControl variant="outlined" className="form-control custom-outlined-form-control">
              <InputLabel ref={categoryLabel} htmlFor="country" className="custom-select-label">
                Country<b>*</b>
              </InputLabel>
              <Select
                value={state.country}
                onChange={handleChange('country')}
                labelWidth={categoryLabelWidth}
                inputProps={{
                  name: 'country',
                  id: 'country',
                }}
                className="custom-select"
                placeholder="Primary"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="EN">
                  <em>England</em>
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="row inline">
          <div className="col">
            <CustomCheckbox
              label="Location"
              onChange={handleChange('location')}
              required={true}
              value={state.location}
            />
          </div>
          <div className="col">
            <CustomInput
              id="region"
              label="Region"
              required={true}
              onChange={handleChange("region")}
            />
          </div>
          <div className="col">
            <CustomInput
              id="doc-number"
              label="Document Number"
              required={true}
              onChange={handleChange("docNumber")}
            />
          </div>
          <div className="col">
            <CustomInput
              id="latitude"
              label="Latitude"
              required={true}
              onChange={handleChange("latitude")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addresses;
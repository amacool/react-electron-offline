import React from 'react';
import Button from "@material-ui/core/Button/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { ThreeDots } from "../common/Icons/ThreeDots";

function PlacesOfBirth({ settings, handleSetValue }) {
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
    if (state.street === ''
      || state.city === ''
      || state.province === ''
      || state.zipCode === ''
      || state.country === ''
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
    <div className="start-page">
      <div className="header">
        <h5>places of birth</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="col w-31 mr-15">
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

          <div className="inline mb-20">
            <div className="col mr-15">
              <CustomInput
                id="city"
                label="City"
                required={true}
                onChange={handleChange("city")}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                id="province"
                label="Province"
                required={true}
                onChange={handleChange("province")}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                id="zip-code"
                label="Zip Code"
                required={true}
                onChange={handleChange("zipCode")}
              />
            </div>
            <div className="col mt-26">
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

          <div className="inline mb-20">
            <div className="col mr-15">
              <CustomCheckbox
                label="Location"
                onChange={handleChange('location')}
                required={true}
                value={state.location}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                id="region"
                label="Region"
                required={true}
                onChange={handleChange("region")}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                id="latitude"
                label="Latitude"
                required={true}
                onChange={handleChange("latitude")}
              />
            </div>
            <div className="col">
              <CustomInput
                id="longitude"
                label="Longitude"
                required={true}
                onChange={handleChange("longitude")}
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
                ADD
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Address', 'Location', 'Notes']}
          data={addresses.map((item) =>
            ({
              a: `${item.street} ${item.city} ${item.province} ${item.zipCode} ${item.country}`,
              b: item.region,
              c: item.notes
            })
          )}
          extraCell={{ title: '', content: <ThreeDots color='#4eb6ee' /> }}
        />
      </div>
    </div>
  )
}

export default PlacesOfBirth;
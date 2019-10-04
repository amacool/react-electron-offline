import React from 'react';
import Button from "@material-ui/core/Button/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";

function PlacesOfBirth({ settings, handleSetValue, data }) {
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
  const [addresses, setAddresses] = React.useState(data);
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
    if (editIndex === -1) {
      handleSetValue([...addresses, state]);
      setAddresses([...addresses, state]);
    } else {
      let tArr = [...addresses];
      tArr[editIndex] = {...state};
      handleSetValue(tArr);
      setAddresses(tArr);
    }
    setState({
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
    setEditIndex(-1);
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      setState(addresses[index]);
      setEditIndex(index);
    } else {
      let tArr = [...addresses];
      tArr.splice(index, 1);
      setAddresses(tArr);
      setState({
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
      setEditIndex(-1);
    }
  };

  return (
    <div className="start-page" id="PLACES-OF-BIRTH">
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
                value={state.street}
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
                value={state.city}
                id="city"
                label="City"
                required={true}
                onChange={handleChange("city")}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                value={state.province}
                id="province"
                label="Province"
                required={true}
                onChange={handleChange("province")}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                value={state.zipCode}
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
                value={state.region}
                id="region"
                label="Region"
                required={true}
                onChange={handleChange("region")}
              />
            </div>
            <div className="col mr-15">
              <CustomInput
                value={state.latitude}
                id="latitude"
                label="Latitude"
                required={true}
                onChange={handleChange("latitude")}
              />
            </div>
            <div className="col">
              <CustomInput
                value={state.longitude}
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
                {editIndex >= 0 ? 'SAVE' : 'ADD'}
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
          getExtraCell={(index) => ({ title: '', content: <TableBtnEditItem onEdit={(mode) => handleEdit(mode, index)} /> })}
        />
      </div>
    </div>
  )
}

export default PlacesOfBirth;
import React from "react";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomCheckbox } from "../common/CustomCheckbox";
import { CustomHeader } from "../common/CustomHeader";
import { Preview } from "../common/Preview";
import { CustomModal } from "../common/CustomModal";

function PlacesOfBirth({ settings, handleSetValue, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
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
  const [validation, setValidation] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const countries = settings.countries[0];

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
    if (!doValidation()) return;

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
    setValidation(false);
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
      handleSetValue(tArr);
    }
  };

  const doValidation = () => {
    if (state.street === ''
      || state.city === ''
      || state.province === ''
      || state.zipCode === ''
      || state.country === ''
      || state.region === ''
      || state.latitude === ''
      || state.longitude === ''
    ) {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  return (
    <div className="start-page" id="PLACES-OF-BIRTH">
      <CustomHeader
        style={validating && addresses.length === 0 ? { backgroundColor: '#ffaeae' } : {}}
        heading={vocabularies[lang]['new']['main'][10]}
        tooltipText={settings.tooltip && settings.tooltip[0] && settings.tooltip[0][lang]['placesOfBirth']}
      />
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className={`col w-31 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomCheckbox
                label={vocabularies[lang]['new']['addresses'][0]}
                onChange={handleChange('address')}
                required={true}
                value={state.address}
              />
            </div>
            <div className="col">
              <CustomInput
                value={state.street}
                id="street"
                label={vocabularies[lang]['new']['addresses'][1]}
                required={true}
                onChange={handleChange("street")}
                validation={validation}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.city}
                id="city"
                label={vocabularies[lang]['new']['addresses'][2]}
                required={true}
                onChange={handleChange("city")}
                validation={validation}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.province}
                id="province"
                label={vocabularies[lang]['new']['addresses'][3]}
                required={true}
                onChange={handleChange("province")}
                validation={validation}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.zipCode}
                id="zip-code"
                label={vocabularies[lang]['new']['addresses'][4]}
                required={true}
                onChange={handleChange("zipCode")}
                validation={validation}
              />
            </div>
            <div className="col mt-26">
              <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.country ? 'select-empty' : ''}`}>
                <InputLabel ref={categoryLabel} htmlFor="country" className="custom-select-label">
                  {vocabularies[lang]['new']['addresses'][5]}<b>*</b>
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
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {countries && countries[lang] && Object.keys(countries[lang]).map((itemKey, index) => (
                    <MenuItem
                      value={countries[lang][itemKey]}
                      key={index}
                    >
                      {countries[lang][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="inline mb-20">
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomCheckbox
                label={vocabularies[lang]['new']['addresses'][6]}
                onChange={handleChange('location')}
                required={true}
                value={state.location}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.region}
                id="region"
                label={vocabularies[lang]['new']['addresses'][7]}
                required={true}
                onChange={handleChange("region")}
                validation={validation}
              />
            </div>
            <div className={`col ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <CustomInput
                value={state.latitude}
                id="latitude"
                label={vocabularies[lang]['new']['addresses'][8]}
                required={true}
                onChange={handleChange("latitude")}
                validation={validation}
              />
            </div>
            <div className="col">
              <CustomInput
                value={state.longitude}
                id="longitude"
                label={vocabularies[lang]['new']['addresses'][9]}
                required={true}
                onChange={handleChange("longitude")}
                validation={validation}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className={`w-69 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
              <TextField
                value={state.notes}
                id="notes"
                label={vocabularies[lang]['new']['common'][3]}
                multiline
                rows="5"
                onChange={handleChange('notes')}
                className={`text-field custom-textarea-control ${lang === 'AR' ? 'textarea-rtl' : ''}`}
                variant="outlined"
                placeholder={vocabularies[lang]['new']['common'][3]}
              />
            </div>
            <div className="w-34 flex-end">
              <Button
                variant="contained"
                className={`add-button ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
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
            vocabularies[lang]['new']['addresses'][0],
            vocabularies[lang]['new']['addresses'][6],
            vocabularies[lang]['new']['common'][3]
          ]}
          data={addresses.map((item) =>
            ({
              a: `${item.street} ${item.city} ${item.province} ${item.zipCode} ${item.country}`,
              b: item.region,
              c: item.notes
            })
          )}
          originalData={addresses}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              onPreview={() => {
                setState(addresses[index]);
                setEditIndex(index);
                setPreview(true);
              }}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
            />
          })}
          updateOrigin={(data) => {
            handleSetValue(data);
            setAddresses(data);
          }}
        />
      </div>
      <CustomModal
        isOpen={preview}
        title={vocabularies[lang]['new']['common'][9]}
        singleButton={true}
        onClose={() => setPreview(false)}
        labelClose={vocabularies[lang]['main'][12]}
        size="sm"
      >
        {preview && (
          <Preview
            data={{
              street: state.street,
              city: state.city,
              province: state.province,
              zipCode: state.zipCode,
              country: state.country,
              region: state.region,
              latitude: state.latitude,
              longitude: state.longitude,
              notes: state.notes
            }}
            header={[
              vocabularies[lang]['new']['addresses'][1],
              vocabularies[lang]['new']['addresses'][2],
              vocabularies[lang]['new']['addresses'][3],
              vocabularies[lang]['new']['addresses'][4],
              vocabularies[lang]['new']['addresses'][5],
              vocabularies[lang]['new']['addresses'][7],
              vocabularies[lang]['new']['addresses'][8],
              vocabularies[lang]['new']['addresses'][9],
              vocabularies[lang]['new']['common'][3]
            ]}
          />
        )}
      </CustomModal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(PlacesOfBirth);

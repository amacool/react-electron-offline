import React from "react";
import connect from "react-redux/es/connect/connect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomHeader } from "../common/CustomHeader";
import "./styles.css";

function Identities({ settings, handleSetValue, setIdentityType, setCurrentStep, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [validation, setValidation] = React.useState(false);
  const [state, setState] = React.useState({
    identityType: '',
    category: ''
  });
  const [identities, setIdentities] = React.useState(data);
  const categories = React.useMemo(() => {
    if (
      !settings.category[0] ||
      !settings.category[0][lang]
    ) {
      return {};
    }
    return settings.category[0][lang];
  }, [lang, settings]);

  React.useEffect(() => {
    setIdentities(data);
  }, [data]);

  React.useEffect(() => {
    setValidation(validating);
  }, [validating]);

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

    handleSetValue([...identities, state]);
    setIdentities([...identities, state]);
    setState({
      identityType: '',
      category: ''
    });
    setValidation(false);
  };

  const doValidation = () => {
    if (state.identityType === '' || state.category === '') {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  const handleSetIdentityType = type => {
    setIdentityType(type);
    setCurrentStep(2);
  };

  return (
    <div className="start-page Identities" id="IDENTITIES">
      <CustomHeader
        heading={vocabularies[lang]['new']['main'][5]}
        tooltipText={settings.tooltip && settings.tooltip[0] && settings.tooltip[0][lang]['identities']}
      />
      <div className="content content-header">
        <div className="custom-add-group row">
          <div className="col-4">
            <CustomInput
              value={state.identityType}
              id="identity-type"
              label={vocabularies[lang]['new']['identities'][0]}
              required={true}
              onChange={handleChange("identityType")}
              validation={validation}
            />
          </div>
          <div className="col-4">
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.category ? 'select-empty' : ''}`}>
              <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                {vocabularies[lang]['new']['identities'][1]}<b>*</b>
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
              >
                <MenuItem value="">
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {categories && Object.keys(categories).map((itemKey, index) => (
                  <MenuItem
                    value={categories[itemKey]}
                    key={index}
                    disabled={!!(categories[itemKey] === 'Primary' && identities.find(item => item.category === 'Primary'))}
                  >
                    {categories[itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            className={`add-button col-1 mt-39 ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
            onClick={handleAdd}
          >
            {vocabularies[lang]['new']['common'][0]}
          </Button>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={[vocabularies[lang]['new']['identities'][0], vocabularies[lang]['new']['identities'][1]]}
          data={identities.map((item) => ({ a: item.identityType, b: item.category }))}
          handleClick={handleSetIdentityType}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(Identities);

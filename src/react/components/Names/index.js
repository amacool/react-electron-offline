import React from "react";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomHeader } from "../common/CustomHeader";
import { CustomModal } from "../common/CustomModal";
import { Preview } from "../common/Preview";
import "./styles.css";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";

function Names({ settings, handleSetValue, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const typeLabel = React.useRef(null);
  const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
  const [state, setState] = React.useState({
    name: '',
    type: '',
    script: ''
  });
  const [state1, setState1] = React.useState({
    name: '',
    type: '',
    script: ''
  });
  const [names, setNames] = React.useState(data.names);
  const [names1, setNames1] = React.useState(data.names1);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [editIndex1, setEditIndex1] = React.useState(-1);
  const [validation, setValidation] = React.useState(false);
  const [preview, setPreview] = React.useState(false);

  React.useEffect(() => {
    setTypeLabelWidth(typeLabel.current.offsetWidth);
  }, []);

  const entryTypes = React.useMemo(() => {
    if (
      !settings.type[0] ||
      !settings.type[0][lang]
    ) {
      return {};
    }
    return settings.type[0][lang];
  }, [lang, settings]);

  const scripts = React.useMemo(() => {
    if (
      !settings.language
    ) {
      return {};
    }
    return settings.language;
  }, [lang, settings]);

  const handleChange = name => e => {
    const value = {
      ...state,
      [name]: e.target.value
    };
    setState(value);
  };

  const handleChange1 = name => e => {
    const value = {
      ...state1,
      [name]: e.target.value
    };
    setState1(value);
  };

  const handleAdd = () => {
    if (!doValidation()) return;

    if (editIndex === -1) {
      handleSetValue({
        names: [...names, {...state, order: names.length + 1}],
        names1
      });
      setNames([...names, {...state, order: names.length + 1}]);
    } else {
      let tArr = [...names];
      tArr[editIndex] = {...state};
      handleSetValue({
        names: tArr,
        names1
      });
      setNames(tArr);
    }
    setState({
      name: '',
      type: '',
      script: ''
    });
    setEditIndex(-1);
    setValidation(false);
  };

  const handleAdd1 = () => {
    if (!doValidation1()) return;

    if (editIndex1 === -1) {
      handleSetValue({
        names1: [...names1, {...state1, order: names1.length + 1}],
        names
      });
      setNames1([...names1, {...state1, order: names1.length + 1}]);
    } else {
      let tArr = [...names1];
      tArr[editIndex1] = {...state1};
      handleSetValue({
        names1: tArr,
        names
      });
      setNames1(tArr);
    }
    setState1({
      name: '',
      type: '',
      script: ''
    });
    setEditIndex1(-1);
    setValidation(false);
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      setState(names[index]);
      setEditIndex(index);
    } else {
      let tArr = [...names];
      tArr.splice(index, 1);
      tArr = tArr.map((item, index) => ({ ...item, order: index + 1 }));
      setNames(tArr);
      setState({
        name: '',
        type: '',
        script: ''
      });
      handleSetValue({
        names: tArr,
        names1
      });
      setEditIndex(-1);
    }
  };

  const handleEdit1 = (mode, index) => {
    if (mode === 'edit') {
      setState1(names1[index]);
      setEditIndex1(index);
    } else {
      let tArr = [...names1];
      tArr.splice(index, 1);
      tArr = tArr.map((item, index) => ({ ...item, order: index + 1 }));
      setNames1(tArr);
      setState1({
        name: '',
        type: '',
        script: ''
      });
      handleSetValue({
        names1: tArr,
        names
      });
      setEditIndex1(-1);
    }
  };

  const doValidation = () => {
    if (state.name === '' || state.type === '' || state.script === '') {
      setValidation(true);
      // smalltalk.alert('Error', 'Please input values!');
      return false;
    }
    return true;
  };

  const doValidation1 = () => {
    if (state1.name === '' || state1.type === '' || state1.script === '') {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  return (
    <div className="start-page Names" id="NAMES">
      <CustomHeader
        style={validating && (names.length === 0 || names1.length === 0) ? { backgroundColor: '#ffaeae' } : {}}
        heading={vocabularies[lang]['new']['main'][6]}
        tooltipText={vocabularies[lang]['tooltip'] && vocabularies[lang]['tooltip']['names']}
      />
      <div className="content content-header">
        <div className="custom-add-group">
          <div className="col-3">
            <CustomInput
              value={state.name}
              id="names-name"
              label={vocabularies[lang]['new']['names'][0]}
              required={true}
              onChange={handleChange("name")}
              validation={validation}
            />
          </div>
          <div className="col-3 mr-15 ml-15 mt-26">
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.type ? 'select-empty' : ''}`}>
              <InputLabel ref={typeLabel} htmlFor="entry-type" className="custom-select-label">
                {vocabularies[lang]['new']['common'][4]}<b>*</b>
              </InputLabel>
              <Select
                value={state.type}
                onChange={handleChange('type')}
                labelWidth={typeLabelWidth}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {entryTypes && Object.keys(entryTypes).map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {entryTypes[itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={`col-3 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state.script ? 'select-empty' : ''}`}>
              <InputLabel ref={typeLabel} htmlFor="entry-type" className="custom-select-label">
                {vocabularies[lang]['new']['names'][1]}<b>*</b>
              </InputLabel>
              <Select
                value={state.script}
                onChange={handleChange('script')}
                labelWidth={typeLabelWidth}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {scripts && scripts.map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {itemKey}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            className={`add-button col-1 ${lang === 'AR' ? 'mr' : 'ml'}-15 mt-39 ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
            onClick={handleAdd}
          >
            {editIndex >= 0 ? vocabularies[lang]['main'][7] : vocabularies[lang]['new']['common'][0]}
          </Button>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={[
            vocabularies[lang]['new']['names'][2],
            vocabularies[lang]['new']['common'][4],
            vocabularies[lang]['new']['names'][1],
            vocabularies[lang]['new']['names'][0]
          ]}
          data={names.map((item) => ({ order: item.order, type: item.type, script: item.script, name: item.name }))}
          originalData={names}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              onPreview={() => {
                setPreview(names[index]);
              }}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
              label3={vocabularies[lang]['new']['common'][8]}
            />
          })}
          updateOrigin={(data) => {
            handleSetValue({names: data, names1});
            setNames(data);
          }}
        />
      </div>

      <div className="content content-header">
        <div className="custom-add-group">
          <div className="col-3">
            <CustomInput
              value={state1.name}
              id="names-name1"
              label={vocabularies[lang]['new']['names'][3]}
              required={true}
              onChange={handleChange1("name")}
              validation={validation}
            />
          </div>
          <div className="col-3 mr-15 ml-15 mt-26">
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state1.type ? 'select-empty' : ''}`}>
              <InputLabel ref={typeLabel} htmlFor="entry-type" className="custom-select-label">
                {vocabularies[lang]['new']['common'][4]}<b>*</b>
              </InputLabel>
              <Select
                value={state1.type}
                onChange={handleChange1('type')}
                labelWidth={typeLabelWidth}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {entryTypes && Object.keys(entryTypes).map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {entryTypes[itemKey]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={`col-3 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
            <FormControl variant="outlined" className={`form-control custom-outlined-form-control ${validation && !state1.script ? 'select-empty' : ''}`}>
              <InputLabel ref={typeLabel} htmlFor="entry-type" className="custom-select-label">
                {vocabularies[lang]['new']['names'][1]}<b>*</b>
              </InputLabel>
              <Select
                value={state1.script}
                onChange={handleChange1('script')}
                labelWidth={typeLabelWidth}
                inputProps={{
                  name: 'language',
                  id: 'language',
                }}
                className="custom-select"
              >
                <MenuItem value="">
                  <em>{vocabularies[lang]['new']['common'][5]}</em>
                </MenuItem>
                {scripts && scripts.map((itemKey, index) => (
                  <MenuItem value={itemKey} key={index}>
                    {itemKey}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            variant="contained"
            className={`add-button col-1 mt-39 ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
            onClick={handleAdd1}
          >
            {editIndex1 >= 0 ? vocabularies[lang]['main'][7] : vocabularies[lang]['new']['common'][0]}
          </Button>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={[
            vocabularies[lang]['new']['names'][2],
            vocabularies[lang]['new']['common'][4],
            vocabularies[lang]['new']['names'][1],
            vocabularies[lang]['new']['names'][0]
          ]}
          data={names1.map((item) => ({ order: item.order, type: item.type, script: item.script, name: item.name }))}
          originalData={names1}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit1(mode, index)}
              onPreview={() => {
                setPreview(names1[index]);
              }}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
              label3={vocabularies[lang]['new']['common'][8]}
            />
          })}
          updateOrigin={(data) => {
            handleSetValue({names1: data, names});
            setNames1(data);
          }}
        />
      </div>
      <CustomModal
        isOpen={preview}
        title={vocabularies[lang]['new']['common'][9]}
        singleButton={true}
        onClose={() => setPreview(null)}
        labelClose={vocabularies[lang]['main'][12]}
        size="sm"
      >
        {preview && (
          <Preview
            data={{
              order: preview.order,
              type: preview.type,
              script: preview.script,
              name: preview.name
            }}
            header={[
              vocabularies[lang]['new']['names'][2],
              vocabularies[lang]['new']['common'][4],
              vocabularies[lang]['new']['names'][1],
              vocabularies[lang]['new']['names'][0]
            ]}
          />
        )}
      </CustomModal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(Names);

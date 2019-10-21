import React from "react";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import smalltalk from "smalltalk";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomHeader } from "../common/CustomHeader";
import "./styles.css";

function Names({ settings, handleSetValue, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
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
        tooltipText={settings.tooltip && settings.tooltip[0] && settings.tooltip[0][lang]['names']}
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
          <div className="col-3 mr-15 ml-15">
            <CustomInput
              value={state.type}
              id="names-type"
              label={vocabularies[lang]['new']['common'][4]}
              required={true}
              onChange={handleChange("type")}
              validation={validation}
            />
          </div>
          <div className={`col-3 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
            <CustomInput
              value={state.script}
              id="names-script"
              label={vocabularies[lang]['new']['names'][1]}
              required={true}
              onChange={handleChange("script")}
              validation={validation}
            />
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
            vocabularies[lang]['new']['names'][0],
            vocabularies[lang]['new']['common'][4],
            vocabularies[lang]['new']['names'][1],
            vocabularies[lang]['new']['names'][2]
          ]}
          data={names.map((item) => ({ a: item.name, b: item.type, c: item.script, d: item.order }))}
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
          <div className="col-3 mr-15 ml-15">
            <CustomInput
              value={state1.type}
              id="names-type1"
              label={vocabularies[lang]['new']['common'][4]}
              required={true}
              onChange={handleChange1("type")}
              validation={validation}
            />
          </div>
          <div className={`col-3 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
            <CustomInput
              value={state1.script}
              id="names-script1"
              label={vocabularies[lang]['new']['names'][1]}
              required={true}
              onChange={handleChange1("script")}
              validation={validation}
            />
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
            vocabularies[lang]['new']['names'][0],
            vocabularies[lang]['new']['common'][4],
            vocabularies[lang]['new']['names'][1],
            vocabularies[lang]['new']['names'][2]
          ]}
          data={names1.map((item) => ({ a: item.name, b: item.type, c: item.script, d: item.order }))}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit1(mode, index)}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
            />
          })}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(Names);

import React from 'react';
import Button from "@material-ui/core/Button/Button";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import './styles.css';

function Names({ settings, handleSetValue, data }) {
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
    if (state.name === '' || state.type === '' || state.script === '') {
      alert('Please input values!');
      return;
    }
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
  };

  const handleAdd1 = () => {
    if (state1.name === '' || state1.type === '' || state1.script === '') {
      alert('Please input values!');
      return;
    }
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
      setEditIndex1(-1);
    }
  };

  return (
    <div className="start-page Names" id="NAMES">
      <div className="header">
        <h5>Names</h5>
      </div>
      <div className="content content-header">
        <div className="custom-add-group">
          <div className="col-3">
            <CustomInput
              value={state.name}
              id="names-name"
              label="Name"
              required={true}
              onChange={handleChange("name")}
            />
          </div>
          <div className="col-3 mr-15 ml-15">
            <CustomInput
              value={state.type}
              id="names-type"
              label="Type"
              required={true}
              onChange={handleChange("type")}
            />
          </div>
          <div className="col-3 mr-15">
            <CustomInput
              value={state.script}
              id="names-script"
              label="Script"
              required={true}
              onChange={handleChange("script")}
            />
          </div>
          <Button
            variant="contained"
            className="add-button col-1 ml-15 mt-39"
            onClick={handleAdd}
          >
            {editIndex >= 0 ? 'SAVE' : 'ADD'}
          </Button>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Name', 'Type', 'Script', 'Order']}
          data={names}
          getExtraCell={(index) => ({ title: '', content: <TableBtnEditItem onEdit={(mode) => handleEdit(mode, index)} /> })}
        />
      </div>

      <div className="content content-header">
        <div className="custom-add-group">
          <div className="col-3">
            <CustomInput
              value={state1.name}
              id="names-name1"
              label="Name In Original Script"
              required={true}
              onChange={handleChange1("name")}
            />
          </div>
          <div className="col-3 mr-15 ml-15">
            <CustomInput
              value={state1.type}
              id="names-type1"
              label="Type"
              required={true}
              onChange={handleChange1("type")}
            />
          </div>
          <div className="col-3 mr-15">
            <CustomInput
              value={state1.script}
              id="names-script1"
              label="Script"
              required={true}
              onChange={handleChange1("script")}
            />
          </div>
          <Button
            variant="contained"
            className="add-button col-1 mt-39"
            onClick={handleAdd1}
          >
            {editIndex1 >= 0 ? 'SAVE' : 'ADD'}
          </Button>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={['Name', 'Type', 'Script', 'Order']}
          data={names1}
          getExtraCell={(index) => ({ title: '', content: <TableBtnEditItem onEdit={(mode) => handleEdit1(mode, index)} /> })}
        />
      </div>
    </div>
  );
}

export default Names;

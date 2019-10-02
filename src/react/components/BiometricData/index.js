import React from 'react';
import Button from "@material-ui/core/Button/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import { CustomTable } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomDropzone } from "../common/CustomDropzone";
import { DocTypeIcon, DocInfo } from "../common/DocElement";
import "./styles.css";

function Features({ settings, handleSetValue, data }) {
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [attachment, setAttachment] = React.useState('');
  const [state, setState] = React.useState({
    type: false,
    value: '',
    notes: ''
  });
  const [features, setFeatures] = React.useState(data);

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
    if (state.type === '' || state.value === '') {
      alert('Please input values!');
      return;
    }
    handleSetValue([...features, { ...state, attachment }]);
    setFeatures([...features, { ...state, attachment }]);
  };

  return (
    <div className="start-page BiometricData" id="BIOMETRIC-DATA">
      <div className="header">
        <h5>biometric data</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className="w-31 mr-15 mt-26">
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                  Type<b>*</b>
                </InputLabel>
                <Select
                  value={state.type}
                  onChange={handleChange('type')}
                  labelWidth={categoryLabelWidth}
                  inputProps={{
                    name: 'type',
                    id: 'type',
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
            <div className="col">
              <CustomInput
                id="value"
                label="Value"
                required={true}
                onChange={handleChange("value")}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className="col-5 mr-15">
              <div className="attachment">
                <label>Attachment</label>
                <div className="dropzone-container">
                  <CustomDropzone
                    heading='Attachment'
                    description='Choose a file or drag it here'
                    onHandleLoad={(v) => {
                      setAttachment(v);
                    }}
                    accept='image/jpeg, image/png, video/mp4, video/webm, audio/webm'
                  />
                </div>
                <div className="input-container">
                  <input type="text" placeholder="Upload from file" />
                  <Button
                    variant="contained"
                    className="add-button"
                    onClick={handleAdd}
                  >
                    UPLOAD
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-5 mt-26 flex-end flex-column space-between">
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
          header={['Type', 'Attachment', 'Notes']}
          data={features.map((item) =>
            ({
              a: <DocTypeIcon type={item.attachment.type} status="Sent" />,
              b: <DocInfo info={item.attachment} />,
              c: item.notes
            })
          )}
        />
      </div>
    </div>
  )
}

export default Features;

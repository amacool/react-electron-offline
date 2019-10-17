import React from "react";
import connect from "react-redux/es/connect/connect";
import isElectron from "is-electron";
import Button from "@material-ui/core/Button/Button";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import smalltalk from "smalltalk";
import FileViewer from "react-file-viewer";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomDropzone } from "../common/CustomDropzone";
import { DocTypeIcon, DocInfo } from "../common/DocElement";
import { CustomModal } from "../common/CustomModal";
import { FileTypes } from "../../constant/file-types";
import { channels } from "../../../shared/constants";
import "./styles.css";

function BiometricData({ settings, handleSetValue, data, vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const categoryLabel = React.useRef(null);
  const [categoryLabelWidth, setCategoryLabelWidth] = React.useState(0);
  const [attachment, setAttachment] = React.useState('');
  const [state, setState] = React.useState({
    type: '',
    value: '',
    notes: ''
  });
  const [features, setFeatures] = React.useState(data);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [curAttachment, setCurAttachment] = React.useState(-1);
  const types = settings.type[0];

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
      smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return;
    }
    handleSetValue([...features, { ...state, attachment }]);
    setFeatures([...features, { ...state, attachment }]);
    setState({
      type: '',
      value: '',
      notes: ''
    });
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      if (isElectron()) {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send(channels.GET_FILE_TYPE, features[index].attachment.path);
        ipcRenderer.on(channels.GET_FILE_TYPE, (event, arg) => {
          ipcRenderer.removeAllListeners(channels.GET_FILE_TYPE);
          const { data, success } = arg;
          if (success) {
            const existingType = FileTypes.find((item) => item === data);
            setCurAttachment({ ...features[index].attachment, type: existingType });
            setIsModalOpen(true);
          } else {
            smalltalk.alert(vocabularies[lang]['messages'][0], '');
          }
        });
      }
    } else {
      let tArr = [...features];
      tArr.splice(index, 1);
      setFeatures(tArr);
      setState({
        type: false,
        value: '',
        notes: ''
      });
      handleSetValue(tArr);
    }
  };

  const handleReadError = (e) => {
    console.log(e);
  };

  return (
    <div className="start-page BiometricData" id="BIOMETRIC-DATA">
      <div className="header">
        <h5>{vocabularies[lang]['new']['main'][13]}</h5>
      </div>
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className={`w-31 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
              <FormControl variant="outlined" className="form-control custom-outlined-form-control">
                <InputLabel ref={categoryLabel} htmlFor="entry-type" className="custom-select-label">
                  {vocabularies[lang]['new']['common'][4]}<b>*</b>
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
                >
                  <MenuItem value="">
                    <em>{vocabularies[lang]['new']['common'][5]}</em>
                  </MenuItem>
                  {types && types[lang] && Object.keys(types[lang]).map((itemKey, index) => (
                    <MenuItem
                      value={itemKey}
                      key={index}
                    >
                      {types[lang][itemKey]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col">
              <CustomInput
                value={state.value}
                id="value"
                label={vocabularies[lang]['new']['features'][0]}
                required={true}
                onChange={handleChange("value")}
              />
            </div>
          </div>

          <div className="inline mb-20">
            <div className={`col-5 ${lang === 'AR' ? 'ml' : 'mr'}-15`}>
              <div className="attachment">
                <label>{vocabularies[lang]['new']['biometric data'][0]}</label>
                <div className="dropzone-container">
                  <CustomDropzone
                    heading='Attachment'
                    description={vocabularies[lang]['new']['biometric data'][1]}
                    onHandleLoad={(v) => {
                      setAttachment(v);
                    }}
                    accept=''
                    showSelectedFiles={false}
                  />
                </div>
                <div className="input-container">
                  <input type="text" placeholder={vocabularies[lang]['new']['biometric data'][2]} value={attachment.path} />
                  <Button
                    variant="contained"
                    className={`add-button ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
                    onClick={handleAdd}
                  >
                    {vocabularies[lang]['new']['biometric data'][3]}
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-5 mt-26 flex-end flex-column space-between">
              <TextField
                value={state.notes}
                id="notes"
                label={vocabularies[lang]['new']['common'][3]}
                multiline
                rows="5"
                onChange={handleChange('notes')}
                className={`text-field custom-textarea-control ${lang === 'AR' ? 'textarea-rtl' : ''}`}
                variant="outlined"
                placeholder="Notes"
              />
              <Button
                variant="contained"
                className={`add-button ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}
                onClick={handleAdd}
              >
                {vocabularies[lang]['new']['common'][0]}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="content content-body">
        <CustomTable
          header={[
            vocabularies[lang]['new']['common'][4],
            vocabularies[lang]['new']['features'][0],
            vocabularies[lang]['new']['biometric data'][0],
            vocabularies[lang]['new']['common'][3]
          ]}
          data={features.map((item) =>
            ({
              a: item.attachment && <DocTypeIcon type={item.attachment.type} status="Sent" />,
              b: item.value,
              c: item.attachment && <DocInfo info={item.attachment} />,
              d: item.notes
            })
          )}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              label1={vocabularies[lang]['new']['common'][6]}
              label2={vocabularies[lang]['new']['common'][2]}
            />
          })}
        />
        {curAttachment && (
          <CustomModal
            isOpen={isModalOpen}
            title={vocabularies[lang]['new']['biometric data'][4]}
            singleButton={true}
            onClose={() => setIsModalOpen(false)}
            labelClose={vocabularies[lang]['main'][12]}
          >
            {curAttachment.type ? (
              <FileViewer
                fileType={curAttachment.type}
                filePath={curAttachment.path}
                errorComponent={null}
                onError={handleReadError}
              />
            ) : (
              <iframe
                src={curAttachment.path}
                width={'100%'}
                height={'100%'}
                title={vocabularies[lang]['new']['biometric data'][4]}
              />
            )}
          </CustomModal>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default connect(mapStateToProps, null)(BiometricData);

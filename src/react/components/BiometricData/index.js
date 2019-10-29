import React from "react";
import connect from "react-redux/es/connect/connect";
import isElectron from "is-electron";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import smalltalk from "smalltalk";
import FileViewer from "react-file-viewer";
import { CustomTable, TableBtnEditItem } from "../common/CustomTable";
import { CustomInput } from "../common/CustomInput";
import { CustomDropzone } from "../common/CustomDropzone";
import { DocInfo } from "../common/DocElement";
import { CustomModal } from "../common/CustomModal";
import { CustomHeader } from "../common/CustomHeader";
import { FileTypes } from "../../constant/file-types";
import { channels } from "../../../shared/constants";
import "./styles.css";
import {Preview} from "../common/Preview";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

function BiometricData({ settings, handleSetValue, data, vocabularies, validating }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const typeLabel = React.useRef(null);
  const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
  const [attachment, setAttachment] = React.useState({
    name: '',
    path: '',
    result: '',
    type: ''
  });
  const [state, setState] = React.useState({
    type: '',
    value: '',
    notes: ''
  });
  const [features, setFeatures] = React.useState(data);
  const [editIndex, setEditIndex] = React.useState(-1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  // for preview only
  const [curPreviewData, setCurPreviewData] = React.useState({
    type: '',
    value: '',
    notes: '',
    attachment: {}
  });
  const [validation, setValidation] = React.useState(false);

  React.useEffect(() => {
    setTypeLabelWidth(typeLabel.current.offsetWidth);
  }, []);

  const entryTypes = React.useMemo(() => {
    if (
      !settings.entryType[0] ||
      !settings.entryType[0][lang]
    ) {
      return {};
    }
    return settings.entryType[0][lang];
  }, [lang, settings]);

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
      handleSetValue([...features, { ...state, attachment }]);
      setFeatures([...features, { ...state, attachment }]);
    } else {
      let tArr = [...features];
      tArr[editIndex] = {...state, attachment};
      handleSetValue(tArr);
      setFeatures(tArr);
    }
    setState({
      type: '',
      value: '',
      notes: ''
    });
    setAttachment({
      name: '',
      path: '',
      result: '',
      type: ''
    });
    setCurPreviewData({
      type: '',
      value: '',
      notes: '',
      attachment: {}
    });
    setValidation(false);
    setEditIndex(-1);
  };

  const handleEdit = (mode, index) => {
    if (mode === 'edit') {
      setState(features[index]);
      setAttachment(features[index].attachment);
      setEditIndex(index);
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

  const handlePreview = (index) => {
    if (!features[index].attachment.path) {
      setCurPreviewData({ ...features[index], attachment: { ...features[index].attachment } });
      setIsModalOpen(true);
      return;
    }
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.GET_FILE_TYPE, features[index].attachment.path);
      ipcRenderer.on(channels.GET_FILE_TYPE, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.GET_FILE_TYPE);
        const { data, success } = arg;
        if (success) {
          const existingType = FileTypes.find((item) => item === data);
          if (!existingType) {
            smalltalk.alert(vocabularies[lang]['messages'][0], 'Unsupported file type!');
            return;
          }
          setCurPreviewData({ ...features[index], attachment: { ...features[index].attachment, type: existingType } });
          setIsModalOpen(true);
        } else {
          smalltalk.alert(vocabularies[lang]['messages'][0], '');
        }
      });
    }
  };

  const handleReadError = (e) => {
    console.log(e);
  };

  const doValidation = () => {
    if (state.type === '' || state.value === '') {
      setValidation(true);
      // smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][5]);
      return false;
    }
    return true;
  };

  return (
    <div className="start-page BiometricData" id="BIOMETRIC-DATA">
      <CustomHeader
        style={validating && features.length === 0 ? { backgroundColor: '#ffaeae' } : {}}
        heading={vocabularies[lang]['new']['main'][13]}
        tooltipText={settings.tooltip && settings.tooltip[0] && settings.tooltip[0][lang]['biometricData']}
      />
      <div className="content content-header">
        <div className="row">
          <div className="inline mb-20">
            <div className={`w-31 ${lang === 'AR' ? 'ml' : 'mr'}-15 mt-26`}>
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
            <div className="col">
              <CustomInput
                value={state.value}
                id="value"
                label={vocabularies[lang]['new']['features'][0]}
                required={true}
                onChange={handleChange("value")}
                validation={validation}
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
                      if (isElectron()) {
                        const { ipcRenderer } = window.require('electron');
                        ipcRenderer.send(channels.GET_FILE_TYPE, v.path);
                        ipcRenderer.on(channels.GET_FILE_TYPE, (event, arg) => {
                          ipcRenderer.removeAllListeners(channels.GET_FILE_TYPE);
                          const { data, success } = arg;
                          if (success) {
                            const existingType = FileTypes.find((item) => item === data);
                            if (existingType) {
                              setAttachment(v);
                            } else {
                              smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['new']['biometric data'][5]);
                            }
                          } else {
                            smalltalk.alert(vocabularies[lang]['messages'][0], '');
                          }
                        });
                      }
                    }}
                    accept=''
                    showSelectedFiles={false}
                  />
                </div>
                <div className="input-container">
                  <input type="text" placeholder={vocabularies[lang]['new']['biometric data'][2]} value={attachment.path || ''} onChange={() => {}} />
                  {/*<Button*/}
                    {/*variant="contained"*/}
                    {/*className={`add-button ${lang !== 'EN' && lang !== 'CN' ? 'btn-bg' : ''}`}*/}
                    {/*onClick={handleAdd}*/}
                  {/*>*/}
                    {/*{vocabularies[lang]['new']['biometric data'][3]}*/}
                  {/*</Button>*/}
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
                {editIndex >= 0 ? vocabularies[lang]['main'][7] : vocabularies[lang]['new']['common'][0]}
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
              a: item.type,
              b: item.value,
              c: item.attachment && <DocInfo info={item.attachment} />,
              d: item.notes
            })
          )}
          originalData={features}
          getExtraCell={(index) => ({
            title: '',
            content: <TableBtnEditItem
              onEdit={(mode) => handleEdit(mode, index)}
              onPreview={() => {
                handlePreview(index);
              }}
              label1={vocabularies[lang]['new']['common'][1]}
              label2={vocabularies[lang]['new']['common'][2]}
              label3={vocabularies[lang]['new']['common'][8]}
            />
          })}
          updateOrigin={(data) => {
            handleSetValue(data);
            setFeatures(data);
          }}
        />
      </div>
      {curPreviewData && (
        <CustomModal
          isOpen={isModalOpen}
          title={vocabularies[lang]['new']['biometric data'][4]}
          singleButton={true}
          onClose={() => setIsModalOpen(false)}
          labelClose={vocabularies[lang]['main'][12]}
        >
          <div>
            <Preview
              data={{
                type: curPreviewData.type,
                value: curPreviewData.value,
                attachment: curPreviewData.attachment && curPreviewData.attachment.path,
                notes: curPreviewData.notes
              }}
              header={[
                vocabularies[lang]['new']['common'][4],
                vocabularies[lang]['new']['features'][0],
                vocabularies[lang]['new']['biometric data'][0],
                vocabularies[lang]['new']['common'][3]
              ]}
            />
            {curPreviewData.attachment.type ? (
              <FileViewer
                fileType={curPreviewData.attachment.type}
                filePath={curPreviewData.attachment.path}
                errorComponent={null}
                onError={handleReadError}
              />
            ) : (
              <iframe
                src={curPreviewData.attachment.path}
                width={'100%'}
                height={'100%'}
                title={vocabularies[lang]['new']['biometric data'][4]}
              />
            )}
          </div>
        </CustomModal>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  validating: state.validating
});

export default connect(mapStateToProps, null)(BiometricData);

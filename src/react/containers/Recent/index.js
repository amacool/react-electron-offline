import React from "react";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import isElectron from "is-electron";
import smalltalk from "smalltalk";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocTypeIcon, DocInfo } from "../../components/common/DocElement";
import { channels } from "../../../shared/constants";
import { changeInformation } from "../../redux/actions";
import { CustomTable } from "../../components/common/CustomTable";
import "./styles.css";

function Recent({ history, changeInformation, vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const [files, setFiles] = React.useState([]);

  const handleLoadData = (index) => {
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.OPEN_FILE, { path: files[index].path });
      ipcRenderer.on(channels.OPEN_FILE, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.OPEN_FILE);
        const { data, success } = arg;
        if (success) {
          changeInformation(data.data);
          history.push('/start');
        } else {
          smalltalk.alert(vocabularies[lang]['messages'][0], '');
        }
      });
    }
  };

  const onRemoveHistory = (history) => {
    if (isElectron()) {
      const removeFiles = files.filter((item, index) => history.indexOf(index) >= 0).map((item) => item.path);
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.REMOVE_HISTORY, { removeFiles });
      ipcRenderer.on(channels.REMOVE_HISTORY, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.REMOVE_HISTORY);
        const { success } = arg;
        if (success) {
          setFiles(files.filter((item, index) => history.indexOf(index) === -1));
        } else {
          smalltalk.alert(vocabularies[lang]['messages'][0], '');
        }
      });
    }
  };

  React.useEffect(() => {
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.GET_HISTORY);
      ipcRenderer.on(channels.GET_HISTORY, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.GET_HISTORY);
        const { data, success } = arg;
        if (success) {
          const rows = data.split("\n");
          rows.splice(rows.length - 1, 1);
          const fileInfoArr = rows.map((item) => {
            const fileInfo = item.split(",");
            const fileName = fileInfo[0].substr(fileInfo[0].lastIndexOf("\\") + 1);
            return {
              selected: false,
              type: 'normal',
              name: fileName,
              path: fileInfo[0],
              lastOpened: fileInfo[1],
              status: fileInfo[2] === '0' ? vocabularies[lang]['recent'][4] : vocabularies[lang]['recent'][5]
            };
          });
          setFiles(fileInfoArr);
        } else {
          smalltalk.alert(vocabularies[lang]['messages'][0], '');
        }
      });
    }
  }, []);

  return (
    <div className="Recent">
      <div className="container">
        <div className="header">
          <h5>{vocabularies[lang]['recent'][0]}</h5>
        </div>
        <div className="content-body">
          <CustomTable
            header={[
              <FontAwesomeIcon icon={faFile} size="2x" />,
              vocabularies[lang]['new']['names'][0],
              vocabularies[lang]['recent'][1],
              vocabularies[lang]['recent'][2]
            ]}
            data={files.map((item) =>
              ({
                type: <DocTypeIcon type={item.type} status={item.status} />,
                name: <DocInfo info={{ name: item.name, path: item.path }} />,
                lastOpened: item.lastOpened,
                status: item.status
              })
            )}
            originalData={files}
            updateOrigin={(data) => {
              setFiles(data);
            }}
            handleClick={handleLoadData}
            handleRemove={onRemoveHistory}
            selectable={true}
          />
        </div>
        <div className="content-footer" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeInformation: data => changeInformation({ data })
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recent));
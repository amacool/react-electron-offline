import React from 'react';
import isElectron from "is-electron";
import Button from "@material-ui/core/Button/Button";
import { CustomTable } from "../../components/common/CustomTable";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DocTypeIcon, DocInfo } from "../../components/common/DocElement";
import { channels } from "../../../shared/constants";
import './styles.css';

function Recent() {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.GET_HISTORY);
      ipcRenderer.on(channels.GET_HISTORY, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.GET_HISTORY);
        const { data, message, success } = arg;
        if (success) {
          const rows = data.split("\n");
          rows.splice(rows.length - 1, 1);
          const fileInfoArr = rows.map((item) => {
            const fileInfo = item.split(",");
            const fileName = fileInfo[0].substr(fileInfo[0].lastIndexOf("\\") + 1);
            return {
              type: 'normal',
              name: fileName,
              path: fileInfo[0],
              lastOpened: fileInfo[1],
              status: fileInfo[2] === '0' ? 'Completed' : 'Draft'
            };
          });
          setFiles(fileInfoArr);
        } else {
          console.log(message);
          alert(message);
        }
      });
    }
  }, []);

  return (
    <div className="Recent">
      <div className="container">
        <div className="header">
          <h5>recent forms</h5>
        </div>
        <div className="content-body">
          <CustomTable
            header={[<FontAwesomeIcon icon={faFile} size="2x" />, 'Name', 'Last time opened', 'Status']}
            data={files.map((item) =>
              ({
                a: <DocTypeIcon type={item.type} status={item.status} />,
                b: <DocInfo info={{ name: item.name, path: item.path }} />,
                c: item.lastOpened,
                d: item.status
              })
            )}
          />
          <Button
            variant="contained"
            className="add-button col-1 mt-39"
          >
            Sent
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Recent;

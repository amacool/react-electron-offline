import React from 'react';
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import isElectron from "is-electron";
import { FolderOpen, Help, InsertDriveFile, WatchLater } from "@material-ui/icons";
import { channels } from "../../../../shared/constants";
import { bindActionCreators } from "redux";
import { changeInformation } from "../../../redux/actions";

const LeftMenu = ({ history, pathname, changeInformation }) => {
  const openFile = React.useCallback(() => {
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.OPEN_FILE);
      ipcRenderer.on(channels.OPEN_FILE, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.OPEN_FILE);
        const { data, message, success } = arg;
        if (success) {
          try {
            const fileInfo = JSON.parse(data);
            if (fileInfo.sign !== 'council-document') {
              alert('Invalid document!');
              return;
            }
            console.log(fileInfo.data);
            changeInformation(fileInfo.data);
            history.replace('/start');
          } catch (err) {
            alert('Invalid document!');
          }
        } else {
          console.log(message);
          alert(message);
        }
      });
    }
  }, [history]);

  return (
    <div className="left-menu">
      <div className="menu-item">
        <Link to={'/new'} className={(pathname === '/new') ? 'active' : ''}>
          <InsertDriveFile />
          <p>New</p>
        </Link>
      </div>
      <div className="menu-item">
        <Link to={'/recent'} className={(pathname === '/recent') ? 'active' : ''}>
          <WatchLater />
          <p>RECENT</p>
        </Link>
      </div>
      <div className="menu-item">
        <Link to={'/open'} className={(pathname === '/open') ? 'active' : ''} onClick={openFile}>
          <FolderOpen />
          <p>OPEN</p>
        </Link>
      </div>
      <div className="menu-item">
        <Link to={'/help'} className={(pathname === '/help') ? 'active' : ''}>
          <Help />
          <p>HELP</p>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeInformation: data => changeInformation({ data })
    },
    dispatch
  );

export default withRouter(connect(null, mapDispatchToProps)(LeftMenu));
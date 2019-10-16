import React from 'react';
import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import isElectron from "is-electron";
import smalltalk from "smalltalk";
import { FolderOpen, Help, InsertDriveFile, WatchLater } from "@material-ui/icons";
import { channels } from "../../../../shared/constants";
import { bindActionCreators } from "redux";
import { changeInformation } from "../../../redux/actions";

const LeftMenu = ({ history, pathname, changeInformation, vocabularies }) => {
  const lang = localStorage.getItem('lang') || 'EN';
  const openFile = React.useCallback(() => {
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.OPEN_FILE);
      ipcRenderer.on(channels.OPEN_FILE, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.OPEN_FILE);
        const { data, message, success } = arg;
        if (success) {
          try {
            changeInformation(data.data);
            history.replace('/start');
          } catch (err) {
            smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][3]);
          }
        } else {
          if (message === 'not selected') {
            history.goBack();
          } else {
            smalltalk.alert(vocabularies[lang]['messages'][0], vocabularies[lang]['messages'][6]);
          }
        }
      });
    }
  }, [history, changeInformation]);

  return (
    <div className="left-menu">
      <div className="menu-item">
        <Link to={'/new'} className={(pathname === '/new') ? 'active' : ''}>
          <InsertDriveFile />
          <p>{vocabularies[lang]['main'][0]}</p>
        </Link>
      </div>
      <div className="menu-item">
        <Link to={'/recent'} className={(pathname === '/recent') ? 'active' : ''}>
          <WatchLater />
          <p>{vocabularies[lang]['main'][1]}</p>
        </Link>
      </div>
      <div className="menu-item">
        <Link to={'/open'} className={(pathname === '/open') ? 'active' : ''} onClick={openFile}>
          <FolderOpen />
          <p>{vocabularies[lang]['main'][2]}</p>
        </Link>
      </div>
      <div className="menu-item">
        <Link to={'/help'} className={(pathname === '/help') ? 'active' : ''}>
          <Help />
          <p>{vocabularies[lang]['main'][3]}</p>
        </Link>
      </div>
    </div>
  );
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftMenu));
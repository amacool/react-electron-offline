import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FolderOpen, Help, InsertDriveFile, WatchLater } from "@material-ui/icons";

class LeftMenu extends Component {
  render() {
    const {pathname} = this.props;
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
          <Link to={'/open'} className={(pathname === '/open') ? 'active' : ''} >
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
  }
}

export default LeftMenu;
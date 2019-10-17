import React from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { InsertDriveFile } from "@material-ui/icons";
import "./styles.css";

function New({ vocabularies }) {
  const lang = localStorage.getItem("lang") || 'EN';

  return (
    <div className="New">
      <div className="header">
        <InsertDriveFile/>
        <h2>{vocabularies[lang]['new']['main'][0]}</h2>
      </div>

      <p style={{ direction: lang === 'AR' ? 'rtl' : '' }}>{vocabularies[lang]['new']['main'][1]}</p>

      <p style={{ direction: lang === 'AR' ? 'rtl' : '' }}>{vocabularies[lang]['new']['main'][2]}</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default withRouter(connect(mapStateToProps, null)(New));

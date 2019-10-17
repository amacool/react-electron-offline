import React from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import { InsertDriveFile } from "@material-ui/icons";
import "./styles.css";

function New({ vocabularies }) {
  const lang = localStorage.getItem("lang") || 'EN';
  console.log(localStorage.getItem("lang"));

  return (
    <div className="New">
      <div className="header">
        <InsertDriveFile/>
        <h2>{vocabularies[lang]['new']['main'][0]}</h2>
      </div>

      <p>{vocabularies[lang]['new']['main'][1]}</p>

      <p>{vocabularies[lang]['new']['main'][2]}</p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default withRouter(connect(mapStateToProps, null)(New));

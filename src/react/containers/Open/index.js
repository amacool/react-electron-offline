import React from 'react';
import { withRouter } from "react-router-dom";
import { CustomDropzone } from "../../components/common/CustomDropzone";
import { bindActionCreators } from "redux";
import { changeInformation } from "../../redux/actions";
import connect from "react-redux/es/connect/connect";
import './styles.css';

const Open = ({ changeInformation, history }) => {
  return (
    <div className="Open">
      <CustomDropzone
        heading='Attachment'
        description='Choose a file or drag it here'
        onHandleLoad={(val) => {
          const data = JSON.parse(val.result);
          if (data.sign === 'council-document') {
            changeInformation(data.data);
            history.push('/start');
          } else {
            alert('Invalid Document!');
          }
        }}
        accept='application/json'
        autoOpen={true}
        hidden={true}
      />
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

export default withRouter(connect(null, mapDispatchToProps)(Open));

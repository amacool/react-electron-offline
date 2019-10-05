import React from 'react';
import { withRouter } from "react-router-dom";
import { CustomDropzone } from "../../components/common/CustomDropzone";
import { bindActionCreators } from "redux";
import { changeInformation } from "../../redux/actions";
import connect from "react-redux/es/connect/connect";
import './styles.css';

const Open = ({ changeInformation, history }) => {
  const fileInput = React.useRef(null);
  React.useEffect(() => {
    // fileInput.current.click();
    // fileInput.current.onchange = (e) => {
    //   const file = readTextFile(`file:///${e.target.value}`);
    //   console.log(file);
    // }
  }, []);

  return (
    <div className="Open">
      <input ref={fileInput} type="file" id="file-input" />
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

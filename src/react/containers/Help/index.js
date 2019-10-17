import React from "react";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function Help({ vocabularies }) {
  const lang = localStorage.getItem('lang') || 'EN';
  const [content, setContent] = React.useState({});

  React.useEffect(() => {
    axios.get('/data/help.json')
      .then(function (result) {
        setContent(result.data.content[0]);
      });
  }, []);

  return (
    <div className="Help">
      <div className="container">
        <div className="header">
          <span>{vocabularies[lang]['help'][0]}</span>
        </div>
        <div className="content-body">
          <ul>
            {content[lang] && content[lang].map((item, index1) => (
              <li key={index1}>
                <div>{item['bulleted-list']}</div>
                {item['h-link'].map((subItem, index2) => (
                  <div key={index2}><a href={subItem.link.indexOf('https') >= 0 ? subItem.link : `https://${subItem.link}`}>{subItem.text}</a></div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies
});

export default withRouter(connect(mapStateToProps, null)(Help));

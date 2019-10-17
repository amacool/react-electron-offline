import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { setVocabularies, setLanguage } from "../redux/actions";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import axios from "axios";

const AppContainer = ({ setLanguage, setVocabularies, vocabularies, children }) => {
  useEffect(() => {
    axios.get('/data/languages.json')
      .then(function (result) {
        setLanguage(result.data.languages);
      });
    axios.get('/data/vocabularies.json')
      .then(function (result) {
        setVocabularies(result.data);
      });
  }, []);

  if (vocabularies) {
    // localStorage.removeItem('lang');
    return children;
  }
  return null;
};

const mapStateToProps = (state) => ({
  vocabularies: state.vocabularies,
  err: state.err
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setVocabularies: data => setVocabularies(data),
      setLanguage: data => setLanguage(data)
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));

import React from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { setCurLang } from "../../redux/actions";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import { setArabicMarkup } from "../../common/helper";
import "./styles.css";

function Home({ setCurLang, history, languages, curLang, vocabularies }) {
  const lang = curLang || localStorage.getItem('lang');
  const goToMain = (lang) => {
    localStorage.setItem("lang", lang);
    setCurLang(lang);
    history.push('/new');
    setArabicMarkup(lang);
  };

  return (
    <div className="Home">
      <div className="container">
        <img src={logo} className="Home-logo" alt="logo"/>
        <h3>
          {vocabularies[lang]['main'][10]}
        </h3>
        <div className="underline"/>
        <div className="Home-buttons">
          {languages && languages.map((item, i) => (
            <Button
              variant="contained"
              key={`home-button-${i}`}
              className="Home-button"
              onClick={() => goToMain(item.type)}
            >
              {item.name}
            </Button>
          ))}
        </div>
        <Footer/>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  languages: state.languages,
  vocabularies: state.vocabularies,
  curLang: state.curLang
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurLang: data => setCurLang(data)
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));

import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import "./styles.css";

class Home extends Component {

  goToMain(lang) {
    console.log(lang);
    localStorage.setItem("lang", lang);
    this.props.history.push('/new');
  }

  render() {
    const { languages } = this.props;
    return (
      <div className="Home">
        <div className="container">
          <img src={logo} className="Home-logo" alt="logo"/>
          <h3>
            Security Council Consolidated List
          </h3>
          <div className="underline"/>
          <div className="Home-buttons">
            {
              languages && languages.map((item, i) => {
                return (
                  <Button
                    variant="contained"
                    key={`home-button-${i}`}
                    className="Home-button"
                    onClick={() => this.goToMain(item.type)}
                  >
                    {item.name}
                  </Button>
                )
              })
            }
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  languages: state.languages,
  err: state.err
});

export default withRouter(connect(mapStateToProps, null)(Home));
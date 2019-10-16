import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import { setLanguage } from "../../redux/actions";
import "./styles.css";

class Home extends Component {
  state = {
    languages: null
  };

  componentDidMount() {
    let th = this;
    axios.get('/data/languages.json')
      .then(function (result) {
        th.setState({
          languages: result.data.languages
        });
      });
  }

  goToMain(lang) {
    console.log(lang);
    this.props.setLanguage(lang);
    this.props.history.push('/new');
  }

  render() {
    const { languages } = this.state;
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
  err: state.err
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLanguage: data => setLanguage({ data })
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
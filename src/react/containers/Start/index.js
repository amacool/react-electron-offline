import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {changeInformation, save, saveDraft} from "../../redux/actions";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import axios from 'axios';

import Information from '../../components/Information';
import Identities from '../../components/Identities';

import './styles.css';

class Start extends Component {

  constructor(props) {
    super(props);
    this.state = {
      languages: [],
      entryType: [],
      language: [],
      applicableMeasure: [],
      regime: [],
      type: [],
      gender: [],
      livingStatus: [],
      documentType: [],
      biometricType: []
    };
    this.results = {
      information: {
        language: 'EN',
      },
      identities: [],
      names: {
      }
    };
  }

  componentDidMount() {
    let th = this;
    axios.get('/data/languages.json')
      .then(function (result) {
        th.setState({
          languages: result.data.languages
        });
      });

    axios.get('/data/lookupsData.json')
      .then(function (result) {
        console.log(result);
        Object.keys(result.data).forEach((itemKey) => {
          th.setState({
            [itemKey]: result.data[itemKey]
          }, () => {
            console.log(th.state);
          });
        });
      });
  }

  // handleChange = name => event => {
  //   const state = this.state;
  //   this.setState({
  //     ...state,
  //     [name]: name === 'member_conditional' ? event.target.checked : event.target.value,
  //   }, () => {
  //     this.props.changeInformation({information: this.state});
  //   });
  // };

  handleSetValue = name => (val) => {
    this.results[name] = val;
    console.log(this.results);
    // this.props.changeInformation({information: this.state});
  };

  render() {
    const settings = this.state;

    return (
      <div className="Start">
        <Information
          settings={settings}
          handleSetValue={this.handleSetValue('information')}
        />
        <Identities
          settings={settings}
          handleSetValue={this.handleSetValue('identities')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  information: state.information,
  identities: state.identities,
  err: state.err
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeInformation: data => changeInformation({data}),
      save: () => save(),
      saveDraft: () => saveDraft()
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Start));

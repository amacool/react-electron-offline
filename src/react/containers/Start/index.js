import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { changeInformation, save, saveDraft } from "../../redux/actions";
import { withRouter } from "react-router";
import connect from "react-redux/es/connect/connect";
import axios from 'axios';
import Information from '../../components/Information';
import Identities from '../../components/Identities';
import Names from "../../components/Names";
import OtherData from "../../components/OtherData";
import Documents from "../../components/Documents";
import Addresses from "../../components/Addresses";
import PlacesOfBirth from "../../components/PlacesOfBirth";
import DatesOfBirth from "../../components/DatesOfBirth";
import Features from "../../components/Features";
import BiometricData from "../../components/BiometricData";
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
      biometricType: [],
      isIdentityMode: false
    };
    this.results = {
      information: {
        language: 'EN',
      },
      identityType: '',
      identities: [],
      names: {},
      otherData: {},
      documents: {},
      addresses: {}
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
          });
        });
      });
  }

  handleSetValue = name => val => {
    this.results[name] = val;
    console.log(this.results);
    // this.props.changeInformation({information: this.state});
  };

  setViewMode = identityType => {
    this.setState({ isIdentityMode: true });
    this.results.identityType = identityType;
  };

  render() {
    const settings = this.state;

    return (
      <div className="Start">
        {!settings.isIdentityMode ? (
          <>
            <Information
              settings={settings}
              handleSetValue={this.handleSetValue('information')}
            />
            <Identities
              settings={settings}
              setViewMode={this.setViewMode}
              handleSetValue={this.handleSetValue('identities')}
            />
          </>
        ) : (
          <>
            <Names
              settings={settings}
              handleSetValue={this.handleSetValue('names')}
            />
            <OtherData
              settings={settings}
              handleSetValue={this.handleSetValue('otherData')}
            />
            <Documents
              settings={settings}
              handleSetValue={this.handleSetValue('documents')}
            />
            <Addresses
              settings={settings}
              handleSetValue={this.handleSetValue('addresses')}
            />
            <PlacesOfBirth
              settings={settings}
              handleSetValue={this.handleSetValue('placesOfBirth')}
            />
            <DatesOfBirth
              settings={settings}
              handleSetValue={this.handleSetValue('datesOfBirth')}
            />
            <Features
              settings={settings}
              handleSetValue={this.handleSetValue('features')}
            />
            <BiometricData
              settings={settings}
              handleSetValue={this.handleSetValue('biometricData')}
            />
          </>
        )}
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

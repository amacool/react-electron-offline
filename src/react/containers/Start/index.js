import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { changeInformation, save, saveDraft, setCreateStep } from "../../redux/actions";
import { withRouter } from "react-router-dom";
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
      biometricType: []
    };
    this.results = {
      information: {
        language: 'EN',
        entryType: '',
        regime: '',
        memberStateConfidential: false,
        applicableMeasure: [],
        submittedBy: [],
        entryRemarks: '',
        reasonForListing: ''
      },
      identityType: -1,
      identities: [],
      names: [],
      names1: [],
      otherData: {
        gender: '',
        livingStatus: [],
        nationality: '',
        title: '',
        designations: ''
      },
      documents: [],
      addresses: [],
      placesOfBirth: [],
      datesOfBirth: [],
      features: [],
      biometricData: []
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

  setIdentityType = type => {
    this.results.identityType = type;
  };

  setCurrentStep = step => {
    this.setState({ step });
    this.props.setCreateStep(step);
  };

  render() {
    const settings = this.state;
    const { createStep } = this.props;
    const {
      information,
      identities,
      names,
      names1,
      otherData,
      documents,
      addresses,
      placesOfBirth,
      datesOfBirth,
      features,
      biometricData
    } = this.results;

    return (
      <div className="Start">
        {createStep < 2 ? (
          <>
            <Information
              data={information}
              settings={settings}
              handleSetValue={this.handleSetValue('information')}
            />
            <Identities
              data={identities}
              settings={settings}
              setIdentityType={this.setIdentityType}
              setCurrentStep={this.setCurrentStep}
              handleSetValue={this.handleSetValue('identities')}
            />
          </>
        ) : (
          <>
            <Names
              data={names}
              data1={names1}
              settings={settings}
              handleSetValue={this.handleSetValue('names')}
            />
            <OtherData
              data={otherData}
              settings={settings}
              handleSetValue={this.handleSetValue('otherData')}
            />
            <Documents
              data={documents}
              settings={settings}
              handleSetValue={this.handleSetValue('documents')}
            />
            <Addresses
              data={addresses}
              settings={settings}
              handleSetValue={this.handleSetValue('addresses')}
            />
            <PlacesOfBirth
              data={placesOfBirth}
              settings={settings}
              handleSetValue={this.handleSetValue('placesOfBirth')}
            />
            <DatesOfBirth
              data={datesOfBirth}
              settings={settings}
              handleSetValue={this.handleSetValue('datesOfBirth')}
            />
            <Features
              data={features}
              settings={settings}
              handleSetValue={this.handleSetValue('features')}
            />
            <BiometricData
              data={biometricData}
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
  createStep: state.createStep,
  err: state.err
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeInformation: data => changeInformation({data}),
      setCreateStep: step => setCreateStep({step}),
      save: () => save(),
      saveDraft: () => saveDraft()
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Start));

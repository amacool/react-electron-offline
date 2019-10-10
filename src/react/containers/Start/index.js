import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { changeInformation, setCreateStep } from "../../redux/actions";
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
      identityType: 0,
      identities: [],
      identitiesArr: [this.getIdentityModel()]
    };
  }

  componentDidMount() {
    if (this.props.data.information) {
      this.results = this.props.data;
    }

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

  getIdentityModel = () => {
    return {
      names: {
        names: [],
        names1: []
      },
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
    }
  };

  handleSetValue = name => val => {
    if (this.props.createStep < 2) {
      this.results[name] = val;
    } else {
      this.results.identitiesArr[this.results.identityType][name] = val;
    }
    this.props.changeInformation(this.results);
  };

  setIdentityType = type => {
    this.results.identityType = type;
    const emptyCount = this.results.identities.length - this.results.identitiesArr.length;
    for (let i = 0; i < emptyCount; i++ ) {
      this.results.identitiesArr.push(this.getIdentityModel());
    }
    this.props.setCreateStep(2);
    this.props.changeInformation(this.results);
  };

  setCurrentStep = step => {
    this.props.setCreateStep(step);
  };

  render() {
    const settings = this.state;
    const { createStep } = this.props;
    const {
      information,
      identities,
      identitiesArr
    } = this.results;
    const {
      names,
      otherData,
      documents,
      addresses,
      placesOfBirth,
      datesOfBirth,
      features,
      biometricData
    } = identitiesArr[this.results.identityType];

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
  data: state.data,
  createStep: state.createStep,
  err: state.err
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeInformation: data => changeInformation({ data }),
      setCreateStep: data => setCreateStep({ data })
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Start));

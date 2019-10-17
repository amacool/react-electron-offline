import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button";
import smalltalk from "smalltalk";
import isElectron from "is-electron";
import LeftStepper from "../../components/common/LeftStepper";
import LeftMenu from "../../components/common/LeftMenu";
import {
  saveDraft,
  changeInformation,
  clearInformation,
  setCreateStep
} from "../../redux/actions";
import logo from "../../assets/logo.png";
import LeftArrowIcon from "../../assets/icons/arrow/left-arrow.svg";
import { channels } from "../../../shared/constants";
import { CustomModal } from "../../components/common/CustomModal";
import "./styles.css";

class Main extends Component {
  steps = ['INFORMATION', 'IDENTITIES', 'NAMES', 'OTHER-DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES-OF-BIRTH', 'DATES-OF-BIRTH', 'FEATURES', 'BIOMETRIC-DATA'];
  lockScroll = false;
  state = {
    errorMsg: "",
    isModalOpen: false
  };
  lang = localStorage.getItem("lang") || 'EN';

  componentDidMount() {
    document.getElementById('create-new-container').addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.createStep !== this.props.createStep) {
      const sectionId = this.steps[this.props.createStep];
      const section = document.getElementById(sectionId);
      section && section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  componentWillUnmount() {
    document.getElementById('create-new-container').removeEventListener('scroll', this.onScroll);
  }

  onScroll = (e) => {
    if (this.lockScroll) {
      return;
    }

    const scrollTop = e.target.scrollTop;
    const wrapperHeight = document.getElementById('create-new-container').clientHeight;
    for (let i = 0; i < this.steps.length; i++) {
      const element = document.getElementById(this.steps[i]);
      if (element) {
        const offsetTop = element.offsetTop;
        const dist = offsetTop - scrollTop;
        if (dist >= 0 && dist <= wrapperHeight) {
          i !== this.props.createStep && this.props.setCreateStep(i);
          break;
        }
      }
    }
  };

  goToStart() {
    this.props.history.push('/start');
  }

  onCancel() {
    this.props.clearInformation();
    this.props.history.push('/new');
  }

  onSave() {
    if (this.performValidation()) {
      this.handleSaveFile(false);
    }
  }

  onSaveDraft() {
    this.handleSaveFile(true);
  }

  handleSaveFile = async (draft) => {
    const isDraft = draft ? 1 : 0;
    const data = {
      data: this.props.docData,
      sign: 'council-document',
      isDraft
    };
    if (isElectron()) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send(channels.SAVE_FILE, { content: JSON.stringify(data), isDraft });
      ipcRenderer.on(channels.SAVE_FILE, (event, arg) => {
        ipcRenderer.removeAllListeners(channels.SAVE_FILE);
        const { success } = arg;
        if (success) {
          smalltalk.alert(this.props.vocabularies[this.lang]['messages'][1], this.props.vocabularies[this.lang]['messages'][2]);
        } else {
          smalltalk.alert(this.props.vocabularies[this.lang]['messages'][0], this.props.vocabularies[this.lang]['messages'][4]);
        }
      });
    }
  };

  onNext = () => {
    this.lockScroll = true;
    const { createStep, setCreateStep } = this.props;
    setCreateStep(createStep + 1);
  };

  onPrev = () => {
    this.lockScroll = true;
    const { createStep, setCreateStep } = this.props;
    setCreateStep(createStep - 1);
  };

  onGoBack = () => {
    const { createStep, setCreateStep } = this.props;
    if (createStep < 2) {
      this.props.history.push('/new');
    } else {
      setCreateStep(0);
    }
  };

  performValidation = () => {
    const { identities, identitiesArr, information } = this.props.docData;
    const {
      language,
      entryType,
      regime,
      applicableMeasure,
      submittedBy
    } = information;
    let msg = "";
    if (!language || !entryType || !regime || applicableMeasure.length < 1 || submittedBy.length < 1 ) {
      msg += "Please fill out information form!\n";
    }
    if (identities.length < 0) {
      msg += "Please add identities!\n";
    }

    identitiesArr.forEach((item, index) => {
      const {
        names,
        otherData,
        documents,
        addresses,
        placesOfBirth,
        datesOfBirth,
        features,
        biometricData
      } = item;
      const curIdentityType = identities[index].identityType;

      if (names.names.length < 1 || names.names1.length < 1) {
        msg += `Please add names for ${curIdentityType}!\n`;
      }

      const {
        gender,
        livingStatus,
        nationality,
        title
      } = otherData;
      if (!gender || !livingStatus || !nationality || !title || !title) {
        msg += `Please fill out other data for ${curIdentityType}!\n`;
      }

      if (documents.length < 1) {
        msg += `Please add documents for ${curIdentityType}!\n`;
      }

      if (addresses.length < 1) {
        msg += `Please add addresses for ${curIdentityType}!\n`;
      }

      if (placesOfBirth.length < 1) {
        msg += `Please add places of birth for ${curIdentityType}!\n`;
      }

      if (datesOfBirth.length < 1) {
        msg += `Please add dates of birth for ${curIdentityType}!\n`;
      }

      if (features.length < 1) {
        msg += `Please add features for ${curIdentityType}!\n`;
      }

      if (biometricData.length < 1) {
        msg += `Please add biometric data for ${curIdentityType}!\n`;
      }
    });
    this.setState({ errorMsg: msg, isModalOpen: msg !== "" });
    return msg === "";
  };

  render() {
    const { pathname } = this.props.location;
    const { createStep, vocabularies, children, curLang } = this.props;
    const { isModalOpen, errorMsg } = this.state;
    const lang = curLang || this.lang;

    return (
      <div className="main">
        <div className="left-container">
          <div className="top">
            <div className="left-logo">
              <Link to={'/'}><img src={logo} alt="Left Logo" /></Link>
              <h3>{vocabularies[lang]['main'][13]}<br /> {vocabularies[lang]['main'][14]}</h3>
            </div>
            {
              pathname === '/start' ? (
                <div className="stepper-container">
                  <div className="to-prev" onClick={this.onGoBack}>
                    <img src={LeftArrowIcon} alt='' />
                  </div>
                  <LeftStepper lockScroll={(val) => this.lockScroll = val} />
                </div>
              ) : <LeftMenu pathname={pathname} />
            }
          </div>
          <div className="bottom">
            Version 0.1.0 <br />
            <div className="bottom-logo">
              <img src={logo} alt="bottom logo" />
              UNITED NATIONS
            </div>
            <span className="bottom-copyright">
              v.0.1.0 Copyright © United Nations 2019
            </span>
          </div>
        </div>
        <div className="main-container">
          <div className="top" id="create-new-container">
            {children}
          </div>
          <div className="bottom">
            {
              pathname === '/start' ? (
                <div className="start-bottom">
                  <div className="start-bottom-left">
                    <Button
                      variant="contained"
                      className="cancel-button"
                      onClick={() => this.onCancel()}
                    >
                      {vocabularies[lang]['main'][5]}
                    </Button>
                    <Button
                      variant="contained"
                      className="save-button"
                      onClick={() => this.onSaveDraft()}
                    >
                      {vocabularies[lang]['main'][6]}
                    </Button>
                  </div>
                  <div className="start-bottom-right" style={{ justifyContent: createStep < 2 ? 'flex-end' : 'space-between' }}>
                    {createStep > 0 && (
                      <Button
                        variant="contained"
                        className="prev-button"
                        onClick={this.onPrev}
                      >
                        {vocabularies[lang]['main'][8]}
                      </Button>
                    )}
                    {createStep !== 1 && createStep !== 9 && (
                      <Button
                        variant="contained"
                        className="next-button"
                        onClick={this.onNext}
                      >
                        {vocabularies[lang]['main'][9]}
                      </Button>
                    )}
                    {createStep === 9 && (
                      <Button
                        variant="contained"
                        className="cancel-button"
                        onClick={() => this.onSave()}
                      >
                        {vocabularies[lang]['main'][7]}
                      </Button>
                    )}

                    <CustomModal
                      isOpen={isModalOpen}
                      singleButton={true}
                      title="Validation Error"
                      onClose={() => this.setState({ isModalOpen: false })}
                      size="sm"
                    >
                      {errorMsg}
                    </CustomModal>
                  </div>
                </div>
              ) : (
                <Button
                  variant="contained"
                  className="new-form-button"
                  onClick={() => this.goToStart()}
                >
                  {vocabularies[lang]['main'][4]}
                </Button>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  information: state.data.information,
  identities: state.data.identities,
  identityType: state.data.identityType,
  createStep: state.createStep,
  docData: state.data,
  vocabularies: state.vocabularies,
  curLang: state.curLang,
  err: state.err
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeInformation: data => changeInformation({ data }),
      clearInformation: () => clearInformation(),
      setCreateStep: data => setCreateStep({ data }),
      saveDraft: () => saveDraft()
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

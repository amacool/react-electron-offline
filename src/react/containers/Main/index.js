import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button';
import LeftStepper from '../../components/common/LeftStepper';
import LeftMenu from '../../components/common/LeftMenu';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { save, saveDraft, changeInformation, setCreateStep } from '../../redux/actions';
import logo from '../../assets/logo.png';
import './styles.css';

class Main extends Component {
  steps = ['INFORMATION', 'IDENTITIES', 'NAMES', 'OTHER-DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES-OF-BIRTH', 'DATES-OF-BIRTH', 'FEATURES', 'BIOMETRIC-DATA'];

  goToStart() {
    this.props.history.push('/start');
  }

  onCancel() {

  }

  onSave() {
    this.props.save();
  }

  onSaveDraft() {

  }

  onNext = () => {
    const { createStep, setCreateStep } = this.props;
    setCreateStep(createStep + 1);
    const sectionId = this.steps[createStep + 1];
    const section = document.getElementById(sectionId);
    section && section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  onPrev = () => {
    const { createStep, setCreateStep } = this.props;
    setCreateStep(createStep - 1);
    const sectionId = this.steps[createStep - 1];
    const section = document.getElementById(sectionId);
    section && section.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  render() {
    const { pathname } = this.props.location;
    const { createStep } = this.props;

    return (
      <div className="main">
        <div className="left-container">
          <div className="top">
            <div className="left-logo">
              <Link to={'/'}><img src={logo} alt="Left Logo" /></Link>
              <h3>Security Council<br /> Consolidated List</h3>
            </div>
            {
              pathname === '/start'
                ? (
                  <div className="stepper-container">
                    <div className="to-prev">
                      <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                    </div>
                    <LeftStepper mode={createStep > 1 ? 1: 0} step={createStep} />
                  </div>)
                : <LeftMenu pathname={pathname} />
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
          <div className="top">
            {this.props.children}
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
                      CANCEL
                    </Button>
                    <Button
                      variant="contained"
                      className="save-button"
                      onClick={() => this.onSaveDraft()}
                    >
                      SAVE AS DRAFT
                    </Button>
                  </div>
                  <div className="start-bottom-right">
                    {createStep > 0 && <Button variant="contained" className="prev-button" onClick={this.onPrev}>Prev</Button>}
                    {createStep !== 1 && createStep !== 9 && <Button variant="contained" className="next-button" onClick={this.onNext}>Next</Button>}
                    {createStep === 9 && <Button variant="contained" className="cancel-button" onClick={() => this.onSave()}>Save</Button>}
                  </div>
                </div>
              ) : (
                <Button
                  variant="contained"
                  className="new-form-button"
                  onClick={() => this.goToStart()}
                >
                  New Form
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
  information: state.information,
  identities: state.identities,
  identityType: state.identityType,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

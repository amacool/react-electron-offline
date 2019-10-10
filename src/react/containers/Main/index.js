import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button';
import LeftStepper from '../../components/common/LeftStepper';
import LeftMenu from '../../components/common/LeftMenu';
import { saveDraft, changeInformation, clearInformation, setCreateStep } from '../../redux/actions';
import logo from '../../assets/logo.png';
import LeftArrowIcon from '../../assets/icons/arrow/left-arrow.svg';
import isElectron from 'is-electron';
import { channels } from '../../../shared/constants';
import './styles.css';

class Main extends Component {
  steps = ['INFORMATION', 'IDENTITIES', 'NAMES', 'OTHER-DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES-OF-BIRTH', 'DATES-OF-BIRTH', 'FEATURES', 'BIOMETRIC-DATA'];
  lockScroll = false;

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
    this.handleSaveFile(false);
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
        const { message, success } = arg;
        if (success) {
          alert('Saved successfully');
        } else {
          console.log(message);
          alert(message);
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
                  <div className="start-bottom-right" style={{ justifyContent: createStep < 2 ? 'flex-end' : 'space-between' }}>
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
  information: state.data.information,
  identities: state.data.identities,
  identityType: state.data.identityType,
  createStep: state.createStep,
  docData: state.data,
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

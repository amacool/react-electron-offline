import React from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators } from "redux";
import { setCreateStep } from "../../../redux/actions";
import './styles.css';

const LeftStepper = ({
  createStep,
  setCreateStep
}) => {
  const steps = [
    ['INFORMATION', 'IDENTITIES'],
    ['NAMES', 'OTHER DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES OF BIRTH', 'DATES OF BIRTH', 'FEATURES', 'BIOMETRIC DATA']
  ];
  const pacing = 37;
  const initialPos = -6;
  const mode = createStep < 2 ? 0 : 1;
  const activeSpotPos = initialPos + pacing * (mode === 0 ? createStep : createStep - 2);

  const handleClick = React.useCallback((index) => {
    setCreateStep(mode === 0 ? index : index + 2);
  }, [setCreateStep, mode]);

  return (
    <div className="left-stepper">
      <Stepper orientation="vertical">
        {steps[mode].map((label, index) => (
          <Step key={label} className={index === steps[mode].length - 1 ? 'last-item' : ''}>
            <StepLabel
              className={
                (mode === 0 ? createStep : createStep - 2) === index
                  ? 'active-label'
                  : ''
              }
              onClick={() => handleClick(index)}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
        <div className="active-spot" style={{ marginTop: `${activeSpotPos}px` }}>
          <div className="spot-inner" />
        </div>
      </Stepper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  createStep: state.createStep
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCreateStep: step => setCreateStep({step}),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeftStepper);

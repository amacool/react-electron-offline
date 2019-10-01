import React from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import './styles.css';

const LeftStepper = ({ mode, step }) => {
  const steps = [
    ['INFORMATION', 'IDENTITIES'],
    ['NAMES', 'OTHER DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES OF BIRTH', 'DATES OF BIRTH', 'FEATURES', 'BIOMETRIC DATA']
  ];
  const pacing = 37;
  const initialPos = -6;

  return (
    <div className="left-stepper">
      <Stepper orientation="vertical">
        {steps[mode].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
        <div className="active-spot" style={{ marginTop: `${initialPos + pacing * step}px` }}>
          <div className="spot-inner" />
        </div>
      </Stepper>
    </div>
  );
};

export default LeftStepper;
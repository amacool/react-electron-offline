import React from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import './styles.css';

const LeftStepper = ({ mode }) => {
  const steps = [
    ['INFORMATION', 'IDENTITIES'],
    ['NAMES', 'OTHER DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES OF BIRTH', 'DATES OF BIRTH', 'FEATURES', 'BIOMETRIC DATA']
  ];
  return (
    <div className="left-stepper">
      <Stepper orientation="vertical">
        {steps[mode].map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default LeftStepper;
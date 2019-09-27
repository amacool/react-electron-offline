import React, { Component } from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import './styles.css';

class LeftStepper extends Component {
    getSteps() {
        return ['INFORMATION', 'IDENTITIES', 'NAMES', 'OTHER DATA', 'DOCUMENTS', 'ADDRESSES', 'PLACES OF BIRTH', 'DATES OF BIRTH', 'FEATURES', 'BIOMETRIC DATA'];
    }

    render() {
        const steps = this.getSteps();
        return (
            <div className="left-stepper">
                <Stepper orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }
}

export default LeftStepper;
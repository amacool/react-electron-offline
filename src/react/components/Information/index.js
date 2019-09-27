import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import './styles.css';

function Information(props) {
    const handleChange = props.handleChange;
    const state = props.state;

    const typeLabel = React.useRef(null);
    const applicableMeasuresLabel = React.useRef(null);
    const languageLabel = React.useRef(null);
    const submittedByLabel = React.useRef(null);
    const regimeLabel = React.useRef(null);

    const [typeLabelWidth, setTypeLabelWidth] = React.useState(0);
    const [applicableMeasuresLabelWidth, setApplicableMeasuresLabelWidth] = React.useState(0);
    const [languageLabelWidth, setLanguageLabelWidth] = React.useState(0);
    const [submittedByLabelWidth, setSubmittedByLabelWidth] = React.useState(0);
    const [regimeLabelWidth, setRegimeLabelWidth] = React.useState(0);

    React.useEffect(() => {
        setTypeLabelWidth(typeLabel.current.offsetWidth);
        setApplicableMeasuresLabelWidth(applicableMeasuresLabel.current.offsetWidth);
        setLanguageLabelWidth(languageLabel.current.offsetWidth);
        setSubmittedByLabelWidth(submittedByLabel.current.offsetWidth);
        setRegimeLabelWidth(regimeLabel.current.offsetWidth);
    }, []);

        return (
            <div className="Information">
                <div className="header">
                    <h5>INFORMATION</h5>
                </div>
                <div className="content">
                    <div className="col-3">
                        <div className="row">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel ref={typeLabel} htmlFor="entry-type">
                                    Entry Type*
                                </InputLabel>
                                <Select
                                    value={state.type}
                                    onChange={handleChange('type')}
                                    labelWidth={typeLabelWidth}
                                    inputProps={{
                                        name: 'type',
                                        id: 'entry-type',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="row">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel ref={languageLabel} htmlFor="language">
                                    Language*
                                </InputLabel>
                                <Select
                                    value={state.language}
                                    onChange={handleChange('language')}
                                    labelWidth={languageLabelWidth}
                                    inputProps={{
                                        name: 'language',
                                        id: 'language',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        state.languages && state.languages.map((item, i) => {
                                            return (
                                                <MenuItem value={item.type}>{item.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="row">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel ref={regimeLabel} htmlFor="regime">
                                    Regime*
                                </InputLabel>
                                <Select
                                    value={state.regime}
                                    onChange={handleChange('regime')}
                                    labelWidth={regimeLabelWidth}
                                    inputProps={{
                                        name: 'regime',
                                        id: 'regime',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel ref={applicableMeasuresLabel} htmlFor="applicable-measures">
                                    Applicable Measures*
                                </InputLabel>
                                <Select
                                    value={state.applicable_measures}
                                    onChange={handleChange('applicable_measures')}
                                    labelWidth={applicableMeasuresLabelWidth}
                                    inputProps={{
                                        name: 'applicable_measures',
                                        id: 'applicable-measures',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="row">
                            <FormControl variant="outlined" className="form-control">
                                <InputLabel ref={submittedByLabel} htmlFor="submittedby">
                                    Submitted By*
                                </InputLabel>
                                <Select
                                    value={state.submitted_by}
                                    onChange={handleChange('submitted_by')}
                                    labelWidth={submittedByLabelWidth}
                                    inputProps={{
                                        name: 'submitted_by',
                                        id: 'submittedby',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="row">
                            <FormControlLabel
                                control={<Checkbox checked={state.member_conditional} color="primary" onChange={handleChange('member_conditional')} value={!state.member_conditional} />}
                                label="Member state(s) confidential"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <TextField
                                id="entry-remarks"
                                label="Entry Remarks"
                                multiline
                                rows="5"
                                value={state.entry_remarks}
                                onChange={handleChange('entry_remarks')}
                                className="text-field"
                                variant="outlined"
                                placeholder="Max length 500 chars"
                            />
                        </div>
                        <div className="row">
                            <TextField
                                id="reason-listing"
                                label="Reason For Listing"
                                multiline
                                rows="5"
                                value={state.reason_listing}
                                onChange={handleChange('reason_listing')}
                                className="text-field"
                                variant="outlined"
                                placeholder="Max length 500 chars"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Information;

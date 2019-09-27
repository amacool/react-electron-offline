import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {changeInformation, save, saveDraft} from "../../redux/actions";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import axios from 'axios';

import Information from '../../components/Information';
import Identities from '../../components/Identities';

import './styles.css';

class Start extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            language: '',
            regime: '',
            applicable_measures: '',
            submitted_by: '',
            member_conditional: false,
            entry_remarks: '',
            reason_listing: '',
            languages: []
        };
    }

    componentDidMount() {
        let th = this;
        axios.get('/data/languages.json')
            .then(function(result) {
                th.setState({
                    languages: result.data.languages
                });
            });
    }

    handleChange = name => event => {
        const state = this.state;
        this.setState({
            ...state,
            [name]: name === 'member_conditional' ? event.target.checked : event.target.value,
        }, () => {
            this.props.changeInformation({information: this.state});
        });
    };

    render() {
        const state = this.state;

        return (
            <div className="Start">
                <Information
                    state={state}
                    handleChange={this.handleChange}
                />
                <Identities/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    information: state.information,
    identities: state.identities,
    err: state.err
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            changeInformation: data => changeInformation({data}),
            save: () => save(),
            saveDraft: () => saveDraft()
        },
        dispatch
    );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Start));

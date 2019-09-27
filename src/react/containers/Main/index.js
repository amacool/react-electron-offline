import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import Button from '@material-ui/core/Button';
import LeftStepper from '../../components/common/LeftStepper';
import LeftMenu from '../../components/common/LeftMenu';
import { save, saveDraft, changeInformation } from '../../redux/actions';
import logo from '../../assets/logo.png';
import './styles.css';

class Main extends Component {
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

    onNext() {

    }

    render() {
        const { pathname } = this.props.location;
        return (
            <div className="main">
                <div className="left-container">
                    <div className="top">
                        <div className="left-logo">
                            <Link to={'/'}><img src={logo} alt="Left Logo" /></Link>
                            <h3>Security Council<br/> Consolidated List</h3>
                        </div>
                        {
                            pathname === '/start' ?
                                <LeftStepper />
                                :
                                <LeftMenu pathname={pathname}/>
                        }
                    </div>
                    <div className="bottom">
                        <div className="bottom-logo">
                            <img src={logo} alt="bottom logo" />
                            UNITED NATIONS
                        </div>
                        <span className="bottom-copyright">
                            Copyright © United Nations 2019
                        </span>
                    </div>
                </div>
                <div className="main-container">
                    <div className="top">
                        {this.props.children}
                    </div>
                    <div className="bottom">
                        {
                            pathname === '/start' ?
                                <div className="start-bottom">
                                    <div className="start-bottom-left">
                                        <Button variant="contained" className="cancel-button" onClick={() => this.onCancel()}>CANCEL</Button>
                                        <Button variant="contained" className="save-button" onClick={() => this.onSaveDraft()}>SAVE AS DRAFT</Button>
                                    </div>
                                    <div className="start-bottom-right">
                                        <Button variant="contained" className="next-button" onClick={() => this.onNext()}>Next</Button>
                                        <Button variant="contained" className="cancel-button" onClick={() => this.onSave()}>Save</Button>
                                    </div>
                                </div>
                                :
                                <Button variant="contained" className="new-form-button" onClick={() => this.goToStart()}>New Form</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

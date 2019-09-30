import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import './styles.css';

class Footer extends Component {
    render() {
        return (
            <footer className="offline-footer">
                <div className="footer-logo">
                    <img src={logo} alt="footer logo" />
                    United Nations
                </div>
                <span className="footer-copyright">
                    Version 0.1.0. Copyright © United Nations 2019
                </span>
            </footer>
        )
    }
}

export default Footer;
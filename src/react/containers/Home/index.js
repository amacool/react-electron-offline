import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Footer from '../../components/Footer';
import logo from '../../assets/logo.png';
import './styles.css';

class Home extends Component {
  state = {
    languages: null
  };

  componentDidMount() {
    let th = this;
    axios.get('/data/languages.json')
      .then(function (result) {
        th.setState({
          languages: result.data.languages
        });
      });
  }

  goToMain() {
    this.props.history.push('/new');
  }

  render() {
    const { languages } = this.state;
    return (
      <div className="Home">
        <div className="container">
          <img src={logo} className="Home-logo" alt="logo"/>
          <h3>
            Security Council Consolidated List
          </h3>
          <div className="underline"/>
          <div className="Home-buttons">
            {
              languages && languages.map((item, i) => {
                return (
                  <Button
                    variant="contained"
                    key={`home-button-${i}`}
                    className="Home-button"
                    onClick={() => this.goToMain()}
                  >
                    {item.name}
                  </Button>
                )
              })
            }
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Home;

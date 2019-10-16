import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppContainer from './react/containers/AppContainer';
import Main from './react/containers/Main';
import Home from './react/containers/Home';
import New from './react/containers/New';
import Open from './react/containers/Open';
import Recent from './react/containers/Recent';
import Help from './react/containers/Help';
import Start from './react/containers/Start';
import store from './react/redux/store';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <AppContainer>
          <Route exact path="/" component={Home}/>
          <Main>
            <Route path="/new" component={New}/>
            <Route path="/open" component={Open}/>
            <Route path="/recent" component={Recent}/>
            <Route path="/help" component={Help}/>
            <Route path="/start" component={Start}/>
          </Main>
        </AppContainer>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

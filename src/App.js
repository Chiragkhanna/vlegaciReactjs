import React from 'react';
import { Route, HashRouter, Switch } from "react-router-dom";
import './App.css';
import './styles/scss/_variables.scss';


import './styles/css/font-awesome.min.css';
import './styles/css/bootstrap.min.css';
import './styles/css/style.css';
import './styles/css/responsive.css';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Page from "./components/Page";
import Home from "./containers/Home";
import Control from "./containers/Control";
import Run from "./containers/Run";


function App() {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route exact path="/" render={props => (
          <Page {...props} component={Home} title="Home" />
        )} />
        <Route path="/control" render={props => (
          <Page {...props} component={Control} title="Control" />
        )} />
        <Route path="/run" render={props => (
          <Page {...props} component={Run} title="Run" />
        )} />

      </Switch>
      <Footer />
    </HashRouter>
  );
}

export default App;

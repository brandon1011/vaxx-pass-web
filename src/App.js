import logo from './logo.svg';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Scanner from './components/Scanner';
import Login from './components/Login';
import Header from './components/Header';
import User from './components/User';
import Security from './components/Security';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function renderRouter() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/security">
            <Security />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <div id="app">
      { loggedIn ? renderRouter() : <Login /> }
    </div>
  );
}

export default App;

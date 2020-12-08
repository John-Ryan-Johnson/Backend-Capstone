import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';

import fbConnection from '../helpers/data/connection';

import Login from '../components/pages/Login/Login';
import Register from '../components/pages/Register/Register';
import MyNavbar from '../components/shared/MyNavbar/MyNavbar';
import Employees from '../components/pages/Employees/Employees';
import Machines from '../components/pages/Machines/Machines';
import EmployeeSchedule from '../components/pages/EmployeeSchedule/EmployeeSchedule';
import EmployeeHistory from '../components/pages/EmployeeHistory/EmployeeHistory';

fbConnection();


class App extends React.Component {
  state = { authed: false};

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container d-flex justify-content-center">
              <Switch>
                <Route path='/login' component={Login} authed={authed} />
                <Route
                  path='/register'
                  exact
                  component={Register}
                  authed={authed}
                />
                <Route path='/employees' component={Employees} authed={authed} />
                <Route path='/machines' component={Machines} authed={authed} />
                <Route path='/schedule/:employeeId' component={EmployeeSchedule} authed={authed} />
                <Route path='/history/:employeeId' component={EmployeeHistory} authed={authed} />
                <Redirect from='*' to='/home' />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

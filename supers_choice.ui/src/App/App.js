import firebase from 'firebase/app';
import 'firebase/auth';
import React from 'react';
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


    return (
      <div className="App">
        <h1>App</h1>
      </div>
    );
  }
}

export default App;

import React from 'react';
import './MyNavbar.scss';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import employeesData from '../../../helpers/data/employeesData';


class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    id: 0,
    isSupervisor: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
  }

  getUser =() => {
     firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      console.error(uid);
      employeesData.getEmployeeByUid()
      .then((employeeResponse) =>{
        this.setState({
        id: employeeResponse.id,
        isSupervisor: employeeResponse.isSupervisor,
      });
      console.error(employeeResponse);
    })
    .catch((error) => console.error(error));
  });
}

  componentDidMount() {
    this.getUser();
  }

  componentWillUnmount() {
    this.getUser();
  }

  render() {
    const { isOpen } = this.state;
    const { authed, isSupervisor } = this.props;

    const authedNavBar = () => {
      if (authed && !isSupervisor) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/schedule'>
                Schedule
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to={`/history/${this.state.id}`}>
                History
              </NavLink>
            </NavItem>
            <NavItem>
              <Button className="btn btn-light my-2 my-sm-0" onClick={this.logOut}>
                Logout
             </Button>
            </NavItem>
          </Nav>
        );
      } else if (authed && isSupervisor) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/employees'>
                Employees
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/machines'>
                Machines
              </NavLink>
            </NavItem>
            <NavItem>
              <Button className="btn btn-light my-2 my-sm-0" onClick={this.logOut}>
                Logout
              </Button>
            </NavItem>
          </Nav>
        );
      } else {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/login'>
                Login
              </NavLink>
            </NavItem>
          </Nav>
        );
      }
  };

  return (
    <div className='MyNavbar'>
      <Navbar color="dark" expand='md' fixed='top'>
        <NavbarBrand className="brand" href='/home'>Super's Choice</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {authedNavBar()}
        </Collapse>
      </Navbar>
    </div>
  );
}
}



export default MyNavbar;
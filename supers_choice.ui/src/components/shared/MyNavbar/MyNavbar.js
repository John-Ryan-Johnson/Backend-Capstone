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


class MyNavbar extends React.Component {
  state = {
    isOpen: false,
    id: '',
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
  }

  render() {
    const { isOpen } = this.state;
    const { authed, isSupervisor } = this.props;

    const authedNavBar = () => {
      if (authed && !isSupervisor) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to={`/employeeSchedule/${this.state.id}`}>
                Schedule
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to={`/employeeHistory/${this.state.id}`}>
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
                Schedule
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/machines'>
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
      <Navbar dark expand='md' fixed='top'>
        <NavbarBrand href='/home'>Super's Choice</NavbarBrand>
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
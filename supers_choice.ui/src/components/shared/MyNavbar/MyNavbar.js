import React from 'react';
import './MyNavbar.scss';
import { NavLink as RRNavLink, withRouter } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import employeesData from '../../../helpers/data/employeesData';
import authData from '../../../helpers/data/authData';



class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
    employeeId: 0,
    isSupervisor: false,
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logOut = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authData.logoutUser(user)
    .then(() => {
      this.props.history.push('/home');
    })
    .catch((error) => {
      console.error('there was an error logging out', error)
    });
  }

  getUser =() => {
     firebase.auth().onAuthStateChanged((user) => {
      user.getIdToken()
        // save the token to the session storage
          .then((token) => sessionStorage.setItem('token', token))
          .then(employeesData.getEmployeeByUid)
          .then((employeeResponse) =>{
            this.setState({
              employeeId: employeeResponse.data.id,
              isSupervisor: employeeResponse.data.isSupervisor,
            });
            console.error(employeeResponse.data);
          })
          .catch((error) => console.error(error));
  });
}

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { isOpen, isSupervisor, employeeId } = this.state;

    const authedNavBar = () => {
      const { authed } = this.props;
      if (authed && !isSupervisor) {
        return (
          <Nav className='ml-auto' navbar>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link mr-3' to={`/schedule/${employeeId}`}>
                <i class="fas fa-calendar-alt fa-lg"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link mr-3' to={`/history/${employeeId}`}>
                <i className="fas fa-history fa-lg"></i>
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
                <i className="fas fa-users fa-lg mr-3"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className='nav-link' to='/machines'>
                <i className="fas fa-industry fa-lg mr-3"></i>
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
        <NavbarBrand className="brand text-white" href='/home'>Super's Choice</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          {authedNavBar()}
        </Collapse>
      </Navbar>
    </div>
  );
}
}



export default withRouter(MyNavbar);
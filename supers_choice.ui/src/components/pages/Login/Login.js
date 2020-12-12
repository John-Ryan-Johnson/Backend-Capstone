import React from 'react';
import { Link } from 'react-router-dom';
import authRequests from '../../../helpers/data/authData';


class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      isSupervisor: false,
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authRequests
      .loginUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch(() => {
        window.alert('You are not logged in');
        this.props.history.push('/register');
      });
  };


  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;

    return (
      <div className='Login w-100'>
        <h1 className='heading text-center'>Login</h1>
        <form className='form-horizontal col-sm-6 mx-auto'>
          <div className='form-group justify-content-center'>
            <label
              htmlFor='inputEmail'
              className='col-sm-4 control-label'
            >
              Email:
            </label>
            <input
              type='email'
              className='form-control'
              id='inputEmail'
              placeholder='Email'
              value={user.email}
              onChange={this.emailChange}
            />
          </div>
          <div className='form-group'>
            <label
              htmlFor='inputPassword'
              className='col-sm-4 control-label'
            >
              Password:
            </label>
            <input
              type='password'
              className='form-control'
              id='inputPassword'
              placeholder='Password'
              value={user.password}
              onChange={this.passwordChange}
            />
          </div>
          <div className='form-group'>
            <div className='col-sm-12 text-center'>
              <Link to='/register'>Need to Register?</Link>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-12'>
              <button
                type='submit'
                className='btn btn-default view col-xs-12'
                onClick={this.loginClickEvent}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';

class Auth extends Component {
  logInHandler = () => {};
  createAccountHandler = () => {};
  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            <Input label="Email" />
            <Input label="Password" errorMessage="Incorrect password" />

            <Button type="success" onClick={this.logInHandler}>
              Log in
            </Button>
            <Button type="primary" onClick={this.createAccountHandler}>
              Create account
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;

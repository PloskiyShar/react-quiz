import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import is from 'is_js';

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Type correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Type correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  logInHandler = () => {};

  createAccountHandler = () => {};

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!value) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid; // if isValid was false, it won't be true
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control; // update local state's copy

    this.setState({
      formControls,
    });
  };

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation} // if this property exists, this line is equal true
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Auth</h1>
          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}
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

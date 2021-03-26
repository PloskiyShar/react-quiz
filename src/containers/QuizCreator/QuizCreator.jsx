import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './QuizCreator.module.css';
import { createControl } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';

const createOptionControl = (number) => {
  return createControl(
    {
      label: `${number}th option`,
      errorMessage: "The field can't be empty",
    },
    { required: true }
  );
};

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Type a question',
        errorMessage: "The field can't be empty",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
};

class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls(),
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = () => {};

  createTestHandler = () => {};

  onChangeHandler = (value, controlName) => {};

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) =>
              this.onChangeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create your own test</h1>
          <form onSubmit={this.onSubmitHandler}>
            {this.renderControls()}

            <select></select>

            <Button type="primary" onClick={this.addQuestionHandler}>
              Add Question
            </Button>

            <Button type="success" onClick={this.createTestHandler}>
              Create Test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;

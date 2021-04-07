import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './QuizCreator.module.css';
import {
  createControl,
  validate,
  validateForm,
} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quizes';

const createOptionControl = (number) => {
  return createControl(
    {
      id: number,
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
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = [...this.state.quiz];
    const id = quiz.length + 1;
    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };

    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = async (event) => {
    event.preventDefault();

    const { quiz } = this.state;

    try {
      await axios.post(`.json`, quiz);

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  onChangeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control; // update local state's copy

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

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

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: Number(event.target.value),
    });
  };

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create your own test</h1>
          <form onSubmit={this.onSubmitHandler}>
            {this.renderControls()}

            <Select
              label="Choose the correct answer"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            />

            <Button
              type="primary"
              disabled={!this.state.isFormValid}
              onClick={this.addQuestionHandler}
            >
              Add Question
            </Button>

            <Button
              type="success"
              disabled={this.state.quiz.length === 0}
              onClick={this.createQuizHandler}
            >
              Create Test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;

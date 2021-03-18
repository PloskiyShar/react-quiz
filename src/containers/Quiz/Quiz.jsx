import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import classes from './Quiz.module.css';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        question: 'Which color does the sky have?',
        rightAnswerId: 3,
        answers: [
          { id: 1, text: 'Red' },
          { id: 2, text: 'Green' },
          { id: 3, text: 'Blue' },
          { id: 4, text: 'Yellow' },
        ],
      },
      {
        id: 2,
        question: 'When Saint-Petersburg was founded?',
        rightAnswerId: 3,
        answers: [
          { id: 1, text: '1701' },
          { id: 2, text: '1702' },
          { id: 3, text: '1703' },
          { id: 4, text: '1707' },
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    this.setState({
      activeQuestion: this.state.activeQuestion + 1,
    });
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all the questions</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;

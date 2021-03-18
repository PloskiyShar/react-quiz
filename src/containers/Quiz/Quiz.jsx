import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import classes from './Quiz.module.css';

class Quiz extends Component {
  state = {
    results: {}, // { [id]: 'success' || 'error' }
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' || 'error' }
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
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    console.log(results, answerId);

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });

      const delay = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(delay);
      }, 1000);
    } else {
      results[question.id] = 'error';

      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  };

  isQuizFinished = () => {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all the questions</h1>
          {this.state.isFinished ? (
            <FinishedQuiz results={this.state.results} quiz={this.state.quiz} />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;

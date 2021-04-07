import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import classes from './Quiz.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {
  fetchQuizById,
  quisAnswerClick,
  retryQuiz,
} from '../../store/actions/quiz';

class Quiz extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.fetchQuizById(id);
  }

  componentWillUnmount() {
    // to return the source state, if user left the quiz earlier than he (or she) finished the current
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all the questions</h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quisAnswerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.quiz.results, // { [id]: 'success' || 'error' }
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, // { [id]: 'success' || 'error' }
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quisAnswerClick: (answerId) => dispatch(quisAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);

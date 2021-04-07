import axios from '../../axios/axios-quizes';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE,
} from './actionTypes';

export const fetchQuizes = () => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`.json`);
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test №${index + 1}`,
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
};

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START,
  };
};

export const fetchQuizesSuccess = (quizes) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
};

export const fetchQuizesError = (error) => {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
};

export const fetchQuizById = (id) => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`${id}.json`);

      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError(error));
    }
  };
};

export const fetchQuizSuccess = (quiz) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
};

export const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
};

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ,
  };
};

export const quizNextQuestion = (numberOfQuestion) => {
  return {
    type: QUIZ_NEXT_QUESTION,
    numberOfQuestion,
  };
};

export const quisAnswerClick = (answerId) => {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({ [answerId]: 'success' }, results));

      const delay = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(delay);
      }, 1000);
    } else {
      results[question.id] = 'error';

      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }
  };
};

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY,
  };
};

const isQuizFinished = (state) => {
  return state.activeQuestion + 1 === state.quiz.length;
};

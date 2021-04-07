import axios from '../../axios/axios-quizes';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
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

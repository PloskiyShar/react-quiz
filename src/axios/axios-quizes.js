import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-fbe78-default-rtdb.firebaseio.com/quizes/',
});

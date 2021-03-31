// import axios from 'axios';
import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import classes from './QuizList.module.css';

class QuizList extends Component {
  state = {
    urlFirebase: 'https://react-quiz-fbe78-default-rtdb.firebaseio.com/quizes',
    quizes: [],
    loading: true,
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    const { urlFirebase } = this.state;

    try {
      const response = await axios.get(`${urlFirebase}.json`);
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test №${index + 1}`,
        });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>List of Quizes</h1>
          {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

export default QuizList;

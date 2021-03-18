import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((acc, item) => {
    if (props.results[item] === 'success') {
      acc += 1;
    }

    return acc;
  }, 0);
  console.log(props.results);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error'
              ? `fa-times ${classes.error}`
              : `fa-check ${classes.success}`,
          ];

          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          );
        })}

        <p>
          You answered correctly {successCount} of {props.quiz.length}
        </p>
        <div>
          <button>Retry</button>
        </div>
      </ul>
    </div>
  );
};

export default FinishedQuiz;

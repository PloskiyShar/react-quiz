import React from 'react';
import classes from './AnswerItem.module.css';

const AnswerItem = (props) => {
  console.log('AnswerI', props.answer.text);
  return <li className={classes.AnswerItem}>{props.answer.text}</li>;
};

export default AnswerItem;

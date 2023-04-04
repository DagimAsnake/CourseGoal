import React from 'react';

import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';

const CourseGoalList = props => {
  return (
    <ul className="goal-list">
      {props.items.map(goal => (
        <CourseGoalItem
          key={goal._id}
          id={goal._id}
          onDelete={props.onDeleteItem}
        >
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
};

export default CourseGoalList;

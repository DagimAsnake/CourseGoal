import React, { useState, useEffect } from 'react';

import CourseGoalList from './components/CourseGoals/CourseGoalList/CourseGoalList';
import CourseInput from './components/CourseGoals/CourseInput/CourseInput';
import './App.css';

const App = () => {
  const [courseGoals, setCourseGoals] = useState([]);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch("http://localhost:8080/course/get", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("something is wrong");
      }
      const data = await response.json();
      setCourseGoals(data.msg)
      console.log(data);
    };
    datafetch();
  }, []);

  const addGoalHandler = enteredText => {
    
    const signUpEmployee = async () => {
      const response = await fetch("http://localhost:8080/course/post", {
        method: "POST",
        body: JSON.stringify({
          text: enteredText 
        }),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        console.log("something is wrong");
      }

      const data = await response.json();

      console.log(data);
      setMessage(data.msg)
      
    }
    signUpEmployee()
    
  };

  const deleteItemHandler = goalId => {

    const AssignedTask = async () => {
      const response = await fetch(`http://localhost:8080/course/delete/${goalId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log("Something went wrong");
      }
      const data = await response.json();

      console.log(data);
      setMessage(data.msg)
    };

    AssignedTask();
  };

  let content = (
    <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <CourseGoalList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div>
      <section id="goal-form">
        <CourseInput onAddGoal={addGoalHandler} />
      </section>
      <section id="goals">
        {message}
        {content}
        {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </div>
  );
}

export default App

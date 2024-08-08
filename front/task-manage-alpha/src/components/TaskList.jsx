// eslint-disable-next-line no-unused-vars
import React from 'react'

function TaskList({ tasks, onComplete }) {
    return (
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>{task.name}</span>
            <span>{task.points} points</span>
            <button onClick={() => onComplete(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default TaskList;
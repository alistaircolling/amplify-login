import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchTodos, updateTodo } from '../dataStore/index';
import { find, random } from 'node-emoji';

const appendEmoji = (input) => {
  const words = input?.split(' ');
  if (!words?.length) return
  const appendedWords = words.map((word) => {
    const relevantEmoji = find(word.toLowerCase());
    return relevantEmoji ? `${word} ${relevantEmoji.emoji}` : `${word} ${random().emoji}`;
  });

  return appendedWords.join(' ');
};

const TodoList = ({ todos, userEmail }) => {
  const [todoList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleUpdateTodo = (todo) => {
    updateTodo(todo, userEmail).then(() => {
      fetchTodos(userEmail).then((updatedTodos) => {
        console.log(updatedTodos);
        setTodoList(updatedTodos);
      });
    });
  };


  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Name</th>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Description</th>
          <th style={{ border: '1px solid grey', padding: '8px' }}>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todoList?.map((todo) => (
          <tr key={todo.id}>
            <td style={{ border: '1px solid grey', padding: '8px' }}>{appendEmoji(todo.name)}</td>
            <td style={{ border: '1px solid grey', padding: '8px' }}>{appendEmoji(todo.description)}</td>
            <td style={{ border: '1px solid grey', padding: '8px' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleUpdateTodo({ ...todo, completed: !todo.completed })}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Add PropTypes here
TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    })
  ),
  userEmail: PropTypes.string.isRequired,
};

export default TodoList;

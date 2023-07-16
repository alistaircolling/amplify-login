import { DataStore } from '@aws-amplify/datastore';
import { Grid } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import React from "react";
import { Todo } from '../models';
import { useTodoContext } from '../context/TodoContext';

export default function TodoList({ userEmail }) {
  const { todoRecords, updateTodoList } = useTodoContext();

  const updateTodo = async (todo) => {
    try {
      const original = await DataStore.query(Todo, todo.id);

      await DataStore.save(
        Todo.copyOf(original, updated => {
          updated.completed = todo.completed;
        })
      );
      fetchAndSetTodos(userEmail);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const fetchTodos = async (userEmail) => {
    // Request all todos from AWS Amplify DataStore where the userId matches the user's email
    const todos = await DataStore.query(Todo, c => c.userId.eq(userEmail));
    return todos;
  };

  const fetchAndSetTodos = async (userEmail) => {
    try {
      const todos = await fetchTodos(userEmail);
      console.log('todos', todos);
      updateTodoList(todos); // Update the todo list using the context
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <Grid
      as="ul"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
    >
      {todoRecords?.length && todoRecords.map((todo) => (
        <Grid
          as="li"
          key={todo.id}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              alignItems: 'center',
              gap: '30px',
              width: '100%',
            }}
          >
            <div>{todo.name}</div>
            <div>{todo.description}</div>
            <input type="checkbox" checked={todo.completed} onChange={() => updateTodo({ ...todo, completed: !todo.completed })} />
          </div>
        </Grid>
      ))}
    </Grid>

  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  })),
  userEmail: PropTypes.string,
};

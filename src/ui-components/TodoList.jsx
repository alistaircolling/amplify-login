//a component to list all Todos from aws amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Grid } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import React from "react";
import { Todo } from '../models';
import { useTodoContext } from '../context/TodoContext';

// after your imports

const fetchTodos = async (userEmail) => {
  //request all todos from aws amplify DataStore where the userId matches the user's email
  const todos = await DataStore.query(Todo, c => c.userId.eq(userEmail));
  return todos;
}

export default function TodoList({ user }) {
  // const [todoRecords, setTodoRecords] = React.useState(null);
  const { todoRecords, updateTodoList } = useTodoContext();
  const [userEmail, setUserEmail] = React.useState(null);

  // store the user's email in local state when the user prop changes
  React.useEffect(() => {
    if (user) {
      setUserEmail(user.attributes.email);
    }
  }, [user]);

  const fetchAndSetTodos = async () => {
    try {
      const todos = await fetchTodos(userEmail);
      console.log('todos', todos);
      updateTodoList(todos); // Update the todo list using the context
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  React.useEffect(() => {
    if (!userEmail) return;
    fetchAndSetTodos();
  }, [userEmail]);

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
        // onClick={() => onTodoClick(todo)}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly', // 'space-between
              gap: '30px',
              alignItems: 'left',
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
  user: PropTypes.shape({
    attributes: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
};

//a component to list all Todos from aws amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Grid } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import React from "react";
import { Todo } from '../models';
import { useTodoContext } from '../context/TodoContext';

// after your imports


export default function TodoList({ todos }) {
  // const [todoRecords, setTodoRecords] = React.useState(null);
  const { todoRecords, updateTodoList } = useTodoContext();

  const updateTodo = async (todo) => {
    try {
      const original = await DataStore.query(Todo, todo.id);

      await DataStore.save(
        Todo.copyOf(original, updated => {
          updated.completed = todo.completed;
        })
      );
      updateTodoList(todos);
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  })),
};

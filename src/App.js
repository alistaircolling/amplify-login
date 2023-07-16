import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './App.css';
import {
  AddTodo
} from './ui-components';
import TodoList from './ui-components/TodoList';
import { useTodoContext } from './context/TodoContext';
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from './models';

export const fetchTodos = async (userEmail) => {
  //request all todos from aws amplify DataStore where the userId matches the user's email
  const todos = await DataStore.query(Todo, c => c.userId.eq(userEmail));
  return todos;
}

function App({ signOut, user }) {
  console.log(user);
  // store the user in state
  const [currentUser] = useState(user);
  const { updateTodoList } = useTodoContext();
  // get the todo list from the context
  const { todoRecords } = useTodoContext();

  const [userEmail, setUserEmail] = React.useState(null);

  const deleteAllTodos = async () => {
    try {
      await DataStore.delete(Todo, c => c.userId.eq(userEmail));
      fetchAndSetTodos();
    } catch (error) {
      console.error('Error deleting todos:', error);
    }
  };
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


  console.log("todoRecords", todoRecords?.length);

  return (
    <div className="App">
      <Heading level={1}>Hello {currentUser.attributes.email}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <div>
        <h2>Todo List</h2>
        <TodoList todos={todoRecords} userEmail={currentUser.attributes.email} />
      </div>
      <Button onClick={deleteAllTodos}>Delete All Todos</Button>
      {/* <div>
        <h2>Update Todo</h2>
        <TodoUpdate />
      </div> */}
      <div>
        <h2>Add Todo</h2>
        <AddTodo
          onSuccess={() => {
            console.log("success");
            updateTodoList(todoRecords);
            console.log("todoRecords", todoRecords);
            // updateTodoList();
          }}
          onSubmit={(fields) => {
            // Example function to trim all string inputs
            const updatedFields = {}
            Object.keys(fields).forEach(key => {
              if (typeof fields[key] === 'string') {
                updatedFields[key] = fields[key].trim()
              } else {
                updatedFields[key] = fields[key]
              }
            })
            updatedFields['userId'] = currentUser.attributes.email
            return updatedFields
          }}
        />
      </div>
    </div>
  );
}
App.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
export default withAuthenticator(App);

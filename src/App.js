import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './App.css';
import {
  AddTodo
} from './ui-components';
import TodoList from './ui-components/TodoList';
import { useTodoContext } from './context/TodoContext';
import { fetchAndSetTodos, deleteAllTodos } from './dataStore';

function App({ signOut, user }) {
  console.log(user);
  // store the user in state
  const [currentUser, setCurrentUser] = useState(user);
  const { updateTodoList } = useTodoContext();
  // get the todo list from the context
  const { todoRecords } = useTodoContext();

  const [userEmail, setUserEmail] = React.useState(null);

  // store the user's email in local state when the user prop changes
  React.useEffect(() => {
    if (user) {
      setUserEmail(user.attributes.email);
    }
  }, [user]);


  React.useEffect(() => {
    if (!userEmail) return;
    fetchAndSetTodos(userEmail).then((result) => {
      console.log("fetched todos");
      updateTodoList(result);
      //force todolist to re-render
      setCurrentUser(user);
    });
  }, [userEmail]);

  // check to see if the todo list is being updated
  React.useEffect(() => {
    console.log("updated??")
    console.log("todoRecords", todoRecords);
  }, [todoRecords]);

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
            fetchAndSetTodos()
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

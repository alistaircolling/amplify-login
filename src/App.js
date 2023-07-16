import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './App.css';
import {
  AddTodo
} from './ui-components';
import TodoList from './ui-components/TodoList';

function App({ signOut, user }) {
  console.log(user);
  // store the user in state
  const [currentUser] = useState(user);

  console.log("currentUser", currentUser);

  return (
    <div className="App">
      <Heading level={1}>Hello {currentUser.attributes.email}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <div>
        <h2>Todo List</h2>
        <TodoList user={currentUser} />
      </div>
      {/* <div>
        <h2>Update Todo</h2>
        <TodoUpdate />
      </div> */}
      <div>
        <h2>Add Todo</h2>
        <AddTodo
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

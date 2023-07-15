import logo from './logo.svg';
import './App.css';
import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
import {
 AddTodo 
} from './ui-components';

/* src/App.js */
function App({ signOut, user }) {
  console.log(user);
  return (
    <div className="App">
      <Heading level={1}>Hello {user.attributes.email}</Heading>
      <Button onClick={signOut}>Sign out</Button>
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
            return updatedFields
          }}
        />
      </div>
    </div>
  );
}

export default withAuthenticator(App);

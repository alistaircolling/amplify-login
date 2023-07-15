import logo from './logo.svg';
import './App.css';
import { Button, Heading, withAuthenticator } from '@aws-amplify/ui-react';
// wrap the App with the withAuthenticator HOC

/* src/App.js */
function App({ signOut, user }) {
  return (
    <div className="App">
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
}

export default withAuthenticator(App);

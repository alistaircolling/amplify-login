//a component to list all Todos from aws amplify DataStore
import React from "react";
import { Todo } from "../models";
import { DataStore } from "aws-amplify";
import { Grid } from "@chakra-ui/react";
import { API } from '@aws-amplify/api'
import config from './aws-exports'
import { listTodos } from './graphql/queries'

// after your imports
API.configure(config)

async function list() {
   const response = await API.graphql({
      query: listTodos,
      variables: {
      // <your variables, optional>
      },
   })
	  console.log("response");
   console.log(response);
}

export default function TodoList(props) {
  const { todos, onTodoClick, overrides, ...rest } = props;
  const [todoRecords, setTodoRecords] = React.useState(todos);
  React.useEffect(() => {
		list();
  }, []);
  return (
    <Grid
      as="ul"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      {...overrides}
      {...rest}
    >
      {/* {todoRecords.map((todo) => (
        <Grid
          as="li"
          key={todo.id}
          onClick={() => onTodoClick(todo)}
          {...overrides?.todo}
        >
          {todo.name}
        </Grid>
      ))} */}
    </Grid>
  );
}

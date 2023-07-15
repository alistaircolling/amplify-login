//a component to list all Todos from aws amplify DataStore
import React from "react";
import { Grid } from "@chakra-ui/react";
import { API } from '@aws-amplify/api'
// import config from './aws-exports'
import config from '../aws-exports'
import { listTodos } from '../graphql/queries'
import { DataStore } from '@aws-amplify/datastore';
import { Todo } from '../models';
import { set } from "lodash";

// after your imports
API.configure(config)

async function list() {
	console.log("list............");
   const response = await API.graphql({
      query: listTodos,
      variables: {
      // <your variables, optional>
      },
   })
	  console.log("response.....");
   console.log(response);
}



export default function TodoList(props) {
  const { todos, onTodoClick, overrides, ...rest } = props;
  const [todoRecords, setTodoRecords] = React.useState(todos);
	const dataStoreQuery = async () => {
		const todos = await DataStore.query(Todo);
		console.log("datastore todos...............");
		console.log(todos);
		setTodoRecords(todos);
	}
  React.useEffect(() => {
		// list();
		const todos = dataStoreQuery()

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
      {todoRecords?.length && todoRecords.map((todo) => (
        <Grid
          as="li"
          key={todo.id}
          onClick={() => onTodoClick(todo)}
          {...overrides?.todo}
        >
          {todo.name}
        </Grid>
      ))}
    </Grid>
  );
}

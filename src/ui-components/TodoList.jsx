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

	const dataStoreQuery = async () => {
		const todos = await DataStore.query(Todo);
		return todos;
	}

export default function TodoList(props) {
  const { todos, onTodoClick, overrides, ...rest } = props;
  const [todoRecords, setTodoRecords] = React.useState(todos);
  React.useEffect(() => {
			const todos =  dataStoreQuery().then((todos) => {
			console.log('todos returned from dataStoreQuery:', todos);
			setTodoRecords(todos);
		});

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
          // onClick={() => onTodoClick(todo)}
          {...overrides?.todo}
        >
          {todo.name}
        </Grid>
      ))}
    </Grid>
  );
}

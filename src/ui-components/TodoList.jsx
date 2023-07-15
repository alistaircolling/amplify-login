//a component to list all Todos from aws amplify DataStore
import { DataStore } from "aws-amplify";
import { Grid } from "@chakra-ui/react";

export default function TodoList(props) {
  const { todos, onTodoClick, overrides, ...rest } = props;
  const [todoRecords, setTodoRecords] = React.useState(todos);
  React.useEffect(() => {
    const queryData = async () => {
      const records = await DataStore.query(Todo);
      setTodoRecords(records);
    };
    queryData();
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
      {todoRecords.map((todo) => (
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

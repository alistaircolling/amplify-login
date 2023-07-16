import { DataStore } from '@aws-amplify/datastore';
import { Todo } from '../models';
// import the context

export const fetchAndSetTodos = async (userEmail) => {
	try {
		const todos = await fetchTodos(userEmail);
		console.log('todos', todos);
		// update the todo list in the context
		return todos;
	} catch (error) {
		console.error('Error fetching todos:', error);
	}
};

export const fetchTodos = async (userEmail) => {
	//request all todos from aws amplify DataStore where the userId matches the user's email
	const todos = await DataStore.query(Todo, c => c.userId.eq(userEmail));
	return todos;
}

export const deleteAllTodos = async (userEmail) => {
	console.log("deleting all todos");
	try {
		await DataStore.delete(Todo, c => c.userId.eq(userEmail));
		// fetchAndSetTodos();
	} catch (error) {
		console.error('Error deleting todos:', error);
	}
};

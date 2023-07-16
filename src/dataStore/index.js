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
		const todos = await DataStore.query(Todo, c => c.userId.eq(userEmail));
		await Promise.all(todos.map(todo => DataStore.delete(Todo, todo.id)));
		await fetchAndSetTodos();
	} catch (error) {
		console.error('Error deleting todos:', error);
	}
};


export const updateTodo = async (todo, userEmail) => {
	try {
		const original = await DataStore.query(Todo, todo.id);

		await DataStore.save(
			Todo.copyOf(original, updated => {
				updated.completed = todo.completed;
			})
		);
		fetchAndSetTodos(userEmail);
	} catch (error) {
		console.error('Error updating todo:', error);
	}
};



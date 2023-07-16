import React from 'react';
import PropTypes from 'prop-types';

const TodoContext = React.createContext();

export const TodoProvider = ({ children }) => {
	const [todoRecords, setTodoRecords] = React.useState(null);

	const updateTodoList = (todos) => {
		setTodoRecords(todos);
	};

	return (
		<TodoContext.Provider value={{ todoRecords, updateTodoList }}>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => {
	return React.useContext(TodoContext);
};

TodoProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

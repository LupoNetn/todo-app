import React, { createContext, useReducer } from "react";

export const TodoContext = createContext();

const initialState = {
    todos: [],
    theme: 'light',
    status: 'all'
}

const todoReducer = (state,action) => {

    switch (action.type) {
        case 'addTodo':
            return {
                ...state,
                todos: [...state.todos, {
                    ...action.payload,
                    id: action.payload.id.toString()
                }]
            }
        case 'toggleTheme':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
        case 'toggleTodo':
          return {
            ...state,
            todos: state.todos.map(todo => (
              todo.id === action.payload ? {...todo,completed: !todo.completed} : todo
            ))
          }
        case 'deleteTodo':
          return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload)
            
          }
        case 'clearAll':
          return {
            ...state,
            todos: state.todos.filter(todo => todo.completed !== true)
          }
        case 'all':
           return {
            ...state,
            status: 'all',
            todos: [...state.todos]
           }
        case 'active':
          return {
            ...state,
            status: 'active',
            todos: [...state.todos].sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;  // Active todos go to top
            })
          }
        case 'completed':
          return {
            ...state,
            status: 'completed',
            todos: [...state.todos].sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? -1 : 1;  // Completed todos go to top
            })
          }
        case 'reorderTodos': {
          const { sourceIndex, destinationIndex } = action.payload;
          const newTodos = Array.from(state.todos);
          const [removed] = newTodos.splice(sourceIndex, 1);
          newTodos.splice(destinationIndex, 0, removed);
          return {
            ...state,
            todos: newTodos
          };
        }
        default:
            return state;
    }

}

const TodoContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(todoReducer,initialState)
  return (
    <>
      <TodoContext.Provider value={{
        dispatch,
        status: state.status,
        theme: state.theme,
        todos: state.todos
      }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};

export default TodoContextProvider;

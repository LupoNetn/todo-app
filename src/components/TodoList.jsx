import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TodoList = () => {
  const { todos, dispatch, theme } = useContext(TodoContext);

  const leftTodo = todos.filter(todo => todo.completed === false);
  const numLeftTodo = leftTodo.length;
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    dispatch({ 
      type: "reorderTodos", 
      payload: { sourceIndex, destinationIndex } 
    });
  };
  
  return (
    <div className={`min-h-screen px-4 py-8 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
     
      
      <div className="flex flex-col gap-4 max-w-[540px] mx-auto">
        {/* Input container will go here */}
        
        {todos.length > 0 && (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`w-full rounded-md overflow-hidden shadow-md
                    ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
                >
                  {todos.map((todo, index) => (
                    <Draggable 
                      key={todo.id} 
                      draggableId={todo.id.toString()} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`px-4 py-4 flex items-center justify-between border-b
                            ${theme === 'light'
                              ? 'border-gray-200 hover:bg-gray-50'
                              : 'border-gray-700 hover:bg-gray-700'
                            } last:border-b-0
                            ${snapshot.isDragging ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-center min-w-0 flex-1">
                            <div className="relative flex items-center min-w-[24px] h-[24px] mr-3">
                              <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => dispatch({ type: "toggleTodo", payload: todo.id })}
                                className={`appearance-none w-5 h-5 rounded-full border-2 cursor-pointer
                                  ${theme === 'light'
                                    ? 'border-gray-300 checked:border-blue-500 checked:bg-blue-500'
                                    : 'border-gray-600 checked:border-blue-400 checked:bg-blue-400'
                                  } transition-colors duration-200`}
                              />
                              <svg
                                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 pointer-events-none
                                  ${todo.completed ? 'block' : 'hidden'}
                                `}
                                viewBox="0 0 10 10"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M1 5l3 3l5-7" />
                              </svg>
                            </div>
                            <span
                              className={`text-sm ${todo.completed 
                                ? 'line-through text-gray-400' 
                                : theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}
                            >
                              {todo.text}
                            </span>
                          </div>
                          <button
                            onClick={() => dispatch({ type: "deleteTodo", payload: todo.id })}
                            className={`ml-4 text-xl font-bold transition-colors
                              ${theme === 'light'
                                ? 'text-gray-400 hover:text-red-500'
                                : 'text-gray-500 hover:text-red-400'}`}
                          >
                            ×
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {/* Todo list footer */}
        <div className={`px-4 py-4 rounded-md shadow-md
          ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <div className="flex justify-between items-center">
            <span className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              {numLeftTodo} items left
            </span>
            <button 
              onClick={() => dispatch({type: 'clearAll'})}
              className={`text-sm transition-colors
                ${theme === 'light'
                  ? 'text-gray-500 hover:text-red-500'
                  : 'text-gray-400 hover:text-red-400'}`}
            >
              Clear Completed
            </button>
          </div>
        </div>

        {/* Filter buttons in separate container */}
        <div className={`px-4 py-4 rounded-md shadow-md flex justify-center gap-4
          ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <button 
            onClick={() => dispatch({type: 'all'})} 
            className={`text-sm transition-colors ${theme === 'light' ? 'hover:text-blue-500' : 'hover:text-blue-400'}`}
          >
            All
          </button>
          <button 
            onClick={() => dispatch({type: 'active'})} 
            className={`text-sm transition-colors ${theme === 'light' ? 'hover:text-blue-500' : 'hover:text-blue-400'}`}
          >
            Active
          </button>
          <button 
            onClick={() => dispatch({type: 'completed'})} 
            className={`text-sm transition-colors ${theme === 'light' ? 'hover:text-blue-500' : 'hover:text-blue-400'}`}
          >
            Completed
          </button>
        </div>

        <p className={`text-center text-sm mt-4 
          ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
};

export default TodoList;

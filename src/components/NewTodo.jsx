import React, { useContext, useState } from 'react'
import { TodoContext } from '../TodoContext'

const NewTodo = () => {
    const [todoText, setTodoText] = useState('')
    const {dispatch, theme} = useContext(TodoContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!todoText.trim()) return;
        dispatch({
            type: 'addTodo',
            payload: {
                id: Date.now(),
                text: todoText,
                completed: false
            }
        })
        setTodoText('')
    }
    
    return (
        <div className="flex justify-center px-4 sm:px-0">
            <div className="w-full max-w-[540px] mt-[-24px]">
                <form onSubmit={handleSubmit} className="relative">
                    <input 
                        type="text" 
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                        placeholder="Create a new todo..." 
                        className={`w-full p-3 sm:p-4 rounded-md shadow-md outline-none pr-[90px] sm:pr-[100px] text-sm sm:text-base
                            ${theme === 'light'
                                ? 'bg-white text-gray-800 placeholder-gray-400'
                                : 'bg-gray-800 text-gray-100 placeholder-gray-500'}`}
                    />
                    <button 
                        type="submit"
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 
                            px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-sm sm:text-base
                            transition-colors duration-200
                            ${theme === 'light'
                                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                        Add Todo
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NewTodo

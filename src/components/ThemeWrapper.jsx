// src/components/ThemeWrapper.jsx
import React, { useContext } from 'react'
import { TodoContext } from '../TodoContext'

const ThemeWrapper = ({children}) => {
    const {theme} = useContext(TodoContext)
    return (
        <div className={`min-h-screen w-full transition-colors duration-300 ${
            theme === 'light' 
            ? 'bg-gray-100 text-gray-900' 
            : 'bg-gray-900 text-gray-100'
        }`}>
            {children}
        </div>
    )
}

export default ThemeWrapper
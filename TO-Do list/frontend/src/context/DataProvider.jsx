import React, { createContext, useEffect, useState } from 'react'
import useTodo from '../utils/api'

export const TodoContext = createContext()

const DataProvider = ({children}) => {
    const [todoData, setTodoData] = useState([])
    const {getTodo} = useTodo(setTodoData);

    useEffect(() => {
      getTodo()
    },[])
    
  return (
    <div>
      <TodoContext.Provider value={[todoData, setTodoData]}>
        {children}
      </TodoContext.Provider>
    </div>
  )
}

export default DataProvider

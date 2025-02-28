import React, { createContext, useState } from 'react'
export const TodoContext1 = createContext()

const TodoContext = ({children}) => {
    const [todoData, setTodoData] = useState("")
  return (
    <div>
      <TodoContext1.Provider value={[todoData, setTodoData]}>
        {children}
      </TodoContext1.Provider>
    </div>
  )
}

export default TodoContext

import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function Todos() {
  const [isGotTodos, setIsGotTodos] = useState(false);
  const [todos, setTodos] = useState([]);
  const currentUser = useOutletContext();
  
  useEffect(() => {
    getTodos();
  }, []); // Add dependency
  
  async function getTodos() {
      const response = await fetch(`http://localhost:3000/todos/?userId=${currentUser.id}`);
      const data = await response.json();
      setIsGotTodos(true);
      setTodos(data);
  }
  


  return (
    <>
      {isGotTodos && 
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>
            <p>Id: {todo.id}</p>
            <p>Title: {todo.title}</p>
          </li>
        })}
      </ul>
      }
    </>
  )

}

export default Todos
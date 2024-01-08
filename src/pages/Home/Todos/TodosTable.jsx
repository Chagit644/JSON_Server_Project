import { React, useState } from "react";
import UpdateWindow from './UpdateWindow.jsx'

function TodosTable({ todos, setTodos }) {
  const [currentUpdated, setCurrentUpdated] = useState(null);

  function updateTodo(todo, updatedTodo) {
    (async () => {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw response.statusText;
      }
      const data = await response.json();
      const currentTodoIndex = todos.findIndex((t) => t == todo);
      todos[currentTodoIndex] = data;
      setTodos((prev) => {
        prev = [...prev];
        prev[currentTodoIndex] = data;
        return prev;
      });
    })();
  }
 

  function deleteTodo(todo) {
    if (confirm("Are You Sure that You Want to Delete this todo?")) {
      (async () => {
        try {
          const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          });
          if (!response.ok) {
            throw response.statusText;
          }
          const currentTodoIndex = todos.findIndex((t) => t == todo);
          const tempTodos = [...todos];
          tempTodos.splice(currentTodoIndex, 1);
          setTodos(tempTodos);
        } catch {
          alert(`An error occurred. Please try again `);
        }
      })();
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>completed?</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => {
          return (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                <input type="checkbox" checked={todo.completed} onChange={() => updateTodo(todo, { ...todo, completed: !todo.completed })} />
              </td>
              <td onClick={() => setCurrentUpdated({ todoForUpdate: todo, newTitle: todo.title })}>✏️</td>
              <td onClick={() => deleteTodo(todo)}>🗑️</td>
            </tr>
          );
        })}
        {currentUpdated && 
            <UpdateWindow currentUpdated={currentUpdated} updateTodo={updateTodo} setCurrentUpdated={setCurrentUpdated}/> 
        
        }
      </tbody>
    </table>
  );
}

export default TodosTable;

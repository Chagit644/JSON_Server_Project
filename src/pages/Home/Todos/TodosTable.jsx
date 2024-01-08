import { React, useState } from "react";
import UpdateWindow from '../../../components/UpdateWindow'

function TodosTable({generalDataAndTools, todos, setTodos }) {

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
              <td onClick={() => setCurrentUpdated(todo)}>✏️</td>
              <td onClick={() => generalDataAndTools.deleteItemFunc(`todos/${todo.id}`,todo, todos, setTodos)}>🗑️</td>
            </tr>
          );
        })}
        {currentUpdated && 
            <UpdateWindow url={`todos/${currentUpdated.id}`} oldItem={currentUpdated} setOldItem={setCurrentUpdated} items={todos} setItems={setTodos} propertiesArr={['title']}/>        
        }
      </tbody>
    </table>
  );
}

export default TodosTable;

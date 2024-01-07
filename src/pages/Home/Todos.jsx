import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import UpdateTodoTitle from '../../components/UpdateTodoTitle';

function Todos() {
  const [isGotTodos, setIsGotTodos] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({ id: '', title: '', completed: "all" })
  const currentUser = useOutletContext();

  useEffect(() => {
    try {
      getTodosFromServer(`http://localhost:3000/todos/?userId=${currentUser.id}`);
    }
    catch {
      alert("An error occurred. Please try again ")
    }
  }, []);

  async function getTodosFromServer(url) {
    const response = await fetch(url);
    const data = await response.json();
    setIsGotTodos(true);
    setTodos(data);
  }
  function tempWrapper(todo, updatedTodo) {
    updateCompletedOfTodo();
    async function updateCompletedOfTodo() {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updatedTodo),
      })
      const data = await response.json();
      const currentTodoIndex = todos.findIndex((t) => t == todo)
      todos[currentTodoIndex] = data;
      setTodos(prev => {
        prev = [...prev]
        prev[currentTodoIndex] = data;
        return prev;
      })
    }
  }
  function handleCompletedChange(todo) {
    tempWrapper(todo, { ...todo, completed: !todo.completed });
  }
  function handleUpdateTitleSubmit(e) {
    e.preventDefault();
    tempWrapper(updateTodo.todoForUpdate, { ...updateTodo.todoForUpdate, title: updateTodo.newTitle });
    setUpdateTodo(null)
  }

  function handleOrderChange(e) {
    let compareFunc = null;
    switch (e.target.value) {
      case "serial":
        compareFunc = (a, b) => a.id - b.id;
        break;
      case "completed":
        compareFunc = (a, b) => Number(b.completed) - Number(a.completed);
        break;
      case "alphabetical":
        compareFunc = (a, b) => a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
        break;
      case "random":
        compareFunc = (a, b) => 0.5 - Math.random();
        break;
      default:
        break;
    }
    setTodos([...todos.sort(compareFunc)]);

  }

  function handleCompletedOfFiltersChange(e) {
    setFilters({ ...filters, completed: e.target.value })
  }

  function handleFiltersSubmit(e) {
    setIsGotTodos(false)
    e.preventDefault();
    let url = `http://localhost:3000/todos/?userId=${currentUser.id}`
    if (filters.id != '')
      url += `&id=${filters.id}`
    if (filters.title != '')
      url += `&title=${filters.title}`
    if (filters.completed != 'all')
      url += `&completed=${filters.completed == 'completed' ? true : false}`
    try {
      debugger;
      getTodosFromServer(url);
    }
    catch {
      alert("An error occurred. Please try again ")
    }
  }
  function deleteTodo(todo) {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        })
        todos.splice(todos.findIndex((t) => t == todo), 1);
        setTodos(todos)
      }
      catch{
        alert("An error occurred. Please try again ")
      }
    })();
  }

  return (
    <>
      <h4>Filters:</h4>
      <form onSubmit={handleFiltersSubmit}>
        <label>Id:</label>
        <input type='number' value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} />
        <label>Title:</label>
        <input type='text' value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
        <div>
          <input type='radio' value="completed" id="completed" name="filters" onChange={handleCompletedOfFiltersChange} />
          <label htmlFor="completed">Completed</label>
          <input type='radio' value="notCompleted" id="notCompleted" name="filters" onChange={handleCompletedOfFiltersChange} />
          <label htmlFor="notCompleted">Not Completed</label>
          <input type='radio' value="all" id="all" name="filters" defaultChecked onChange={handleCompletedOfFiltersChange} />
          <label htmlFor="all">All</label>
        </div>
        <button>Search</button>
      </form>

      <label>Order by:</label>
      <select onChange={handleOrderChange}>
        <option value="serial">Serial</option>
        <option value="completed">Completed First</option>
        <option value="alphabetical">Alphabetical</option>
        <option value="random">Random</option>
      </select>
      {isGotTodos &&
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
              return <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><input type="checkbox" checked={todo.completed} onChange={() => handleCompletedChange(todo)} /></td>
                <td onClick={() => setUpdateTodo({ todoForUpdate: todo, newTitle: todo.title })}>✏️</td>
                <td onClick={() => deleteTodo(todo)}>🗑️</td>
              </tr>
            })}
          </tbody>
        </table>
      }
      {!isGotTodos && <h3>Loading...</h3>}
      {updateTodo &&
        <form onSubmit={handleUpdateTitleSubmit}>
          <label>Title:</label>
          <input onChange={(e) => setUpdateTodo({ ...updateTodo, newTitle: e.target.value })} value={updateTodo.newTitle}></input>
          <button type='submit'>Send</button>
        </form>}
    </>
  )
}
export default Todos
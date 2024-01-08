import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import AddTodoWindow from "./AddTodoWindow";
import Filters from "./Filters";
import TodosTable from "./TodosTable";

function Todos() {

  const [isGotTodos, setIsGotTodos] = useState(false);
  const [isShowAddTodoWindow, setIsShowAddTodoWindow] = useState(false);
  const [todos, setTodos] = useState([]);
  const currentUser = useOutletContext();

  useEffect(() => {
    getTodos(`http://localhost:3000/todos/?userId=${currentUser.id}`);
  }, []);

  async function getTodos(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw response.statusText;
      }
      const data = await response.json();
      setIsGotTodos(true);
      setTodos(data);
    } catch {
      alert("An error occurred. Please try again ");
    }
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
        compareFunc = (a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0);
        break;
      case "random":
        compareFunc = (a, b) => 0.5 - Math.random();
        break;
      default:
        break;
    }
    setTodos([...todos.sort(compareFunc)]);
  }


  return (
    <>
      <Filters setIsGotTodos={setIsGotTodos} currentUserId={currentUser.id} getTodos={getTodos} />
      <div>
        <label>Order by:</label>
        <select onChange={handleOrderChange}>
          <option value="serial">Serial</option>
          <option value="completed">Completed First</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <button onClick={() => setIsShowAddTodoWindow(true)}>➕</button>
      </div>
      {!isGotTodos && <h3>Loading...</h3>}
      {isGotTodos && <TodosTable todos={todos} setTodos={setTodos}/>}
      {isShowAddTodoWindow && (
        <AddTodoWindow currentUser={currentUser} setIsShowAddTodoWindow={setIsShowAddTodoWindow} setTodos={setTodos} />
      )}
    </>
  );
}
export default Todos;

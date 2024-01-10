import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import TodosFilters from "./TodosFilters";
import TodosTable from "./TodosTable";
import AddWindow from "../../../components/AddWindow";

function Todos() {

  const [isGotTodos, setIsGotTodos] = useState(false);
  const [isShowAddTodoWindow, setIsShowAddTodoWindow] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFiltersTodos] = useState([])
  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getTodos(`users/${currentUser.id}/todos`);
  }, []);

  async function getTodos(url) {
    generalDataAndTools.getItemsFunc(url, setTodos, setIsGotTodos)
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
      <TodosFilters setIsGotTodos={setIsGotTodos} currentUserId={currentUser.id} getTodos={getTodos} />
      <div>
        <label>Order by:</label>
        <select onChange={handleOrderChange}>
          <option value="serial">Serial</option>
          <option value="completed">Completed First</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>
      <button onClick={() => setIsShowAddTodoWindow(true)}>➕</button>
      {!isGotTodos && <h3>Loading...</h3>}
      {isGotTodos && <TodosTable  generalDataAndTools={generalDataAndTools} todos={todos} setTodos={setTodos}/>}
      {isShowAddTodoWindow && 
         <AddWindow setIsAddWindowShow={setIsShowAddTodoWindow} baseItem={{
          userId: currentUser.id,
          title: '',
          completed: false
          }} propertiesArr={["title"]} url= {`todos`} setItems={setTodos}/>
      }
    </>
  );
}
export default Todos;

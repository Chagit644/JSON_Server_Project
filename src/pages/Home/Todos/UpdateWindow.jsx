import React from 'react'

function UpdateWindow({updateTodo, setCurrentUpdated, currentUpdated}) {

    function handleUpdateTitleSubmit(e) {
      e.preventDefault();
      updateTodo(currentUpdated.todoForUpdate, { ...currentUpdated.todoForUpdate, title: currentUpdated.newTitle });
      setCurrentUpdated(null);
    }
    
  return (
    <div>
    <p onClick={() => setCurrentUpdated(null)}>❌</p>
    <form onSubmit={handleUpdateTitleSubmit}>
      <label>Title:</label>
      <input onChange={(e) => setCurrentUpdated({ ...currentUpdated, newTitle: e.target.value })} value={currentUpdated.newTitle}></input>
      <button type="submit">Send</button>
    </form>
  </div>
  )
    
}

export default UpdateWindow
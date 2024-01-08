import {React, useState} from 'react'

function AddTodoWindow({currentUser, setTodos, setIsShowAddTodoWindow}) {

 const [title, setTitle] = useState("");

 function handleSubmit(e) {
    e.preventDefault();
    (async () => {
        try {
          const response = await fetch(`http://localhost:3000/users/${currentUser.id}/todos`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: currentUser.id,
                title: title,
                completed: false
            }),
          })
          if(!response.ok) {
            throw response.statusText;
          }
          const data = await response.json();
          setTodos(prev => {
              prev.push(data);
              return [...prev]
          })
          setIsShowAddTodoWindow(false);
        }
        catch(e) {
          alert(`An error ${e} occurred. Please try again`)
        }
      })()
 }

  return (
    <div>
        <p onClick={() => setIsShowAddTodoWindow(false)}>❌</p>
        <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />
        <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default AddTodoWindow
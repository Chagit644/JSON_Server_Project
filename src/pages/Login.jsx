import {React, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
function Login() {

  const navigate = useNavigate();
  const [input, setInput] = useState({username: '', password: ''});
  
  function handleSubmit(e) {
    e.preventDefault();
    // async function getUserData() {
    //   const response = await fetch(`/users/?username=${input.username}`);
    //   const data = await response.json()
    // };
    const data = {website: "1", id: 2, username: "1"}
    if(data.website == input.password) {
      localStorage.setItem("currentUser", JSON.stringify(data));
      navigate(`/users/${data.id}/home`)
      
    }
    else {
      alert("One of the data entered is incorrect. Please try again.")
      setInput({username: '', password: ''})
    }
      
  }
  return (


    <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label >Username</label>
            <input value={input.username} onChange={(e) => setInput({...input, username: e.target.value})} type="text" name='username' placeholder='Israel123' required/>
            <label>Password</label>
            <input value={input.password} onChange={(e) => setInput({...input, password: e.target.value})} type="Password" placeholder='*********' required/>
            <button type='submit'>Submit</button>
            <br/>
            <span>Don't have an account?</span>
            <Link to='/signup'> Please sign up</Link> 
        </form>
    </>
  )
}

export default Login
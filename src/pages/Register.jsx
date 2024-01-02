import React from 'react'

function Register() {
  return (
    <>
        <h1>Register</h1>
        <form>
            <label >Username</label>
            <input type="text" name='username' placeholder='Israel123'></input>
            <label>Password</label>
            <input type="Password" placeholder='*********'></input>
            <label>Verify Password</label>
            <input type="Password" placeholder='*********'></input>
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default Register
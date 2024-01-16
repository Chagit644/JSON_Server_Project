import React, { useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'
import styles from '../../css/Signup.module.css'

function UserDetailsEntry() {

  const navigate = useNavigate();
  const location = useLocation();

  const [input, setInput] = useState({
    name: "",
    username: location.state.username,
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipCode: "",
    },
    phone: "",
    website: location.state.password,
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    createNewUser();

    async function createNewUser() {
      try {
        const response = await fetch(`http://localhost:3000/users`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(input),
        })
        if (!response.ok) {
          throw response.statusText;
        }
        const data = await response.json();
        localStorage.setItem('currentUser', JSON.stringify(data))
        navigate(`/users/${data.id}/home`);
      }
      catch {
        alert("An error occurred. Please try again ")
      }
    }
  }

  return (
    <>
      <h2>Please complete your details for registration:</h2>
      <form className={styles.detailsContainer} onSubmit={handleSubmit}>
        <div>
          <label><b>Name</b></label>
          <input
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
            type="text"
            name="name"
            placeholder="Israel Israeli"
            required
          />
          <label><b>Email</b></label>
          <input
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
            type="email"
            name="email"
            placeholder="Israel@gmail.com"
            required
          />
          <h4>Company</h4>
          <label>Name</label>
          <input
            value={input.company.name}
            onChange={(e) => setInput({ ...input, company: { ...input.company, name: e.target.value } })}
            type="text"
            name="name"
            placeholder="Intel"
          />
          <label>Catch Phrase</label>
          <input
            value={input.company.catchPhrase}
            onChange={(e) => setInput({ ...input, company: { ...input.company, catchPhrase: e.target.value } })}
            type="text"
            name="catchPhrase"
            placeholder="Productivity and success under one roof"
          />
          <label>BS</label>
          <input
            value={input.bs}
            onChange={(e) => setInput({ ...input, company: { ...input.company, bs: e.target.value } })}
            type="text"
            name="bs"
            placeholder="bait sameach"
          />
        </div>
        <div>
          <h4>Address</h4>
          <label>Street</label>
          <input
            value={input.address.street}
            onChange={(e) => setInput({ ...input, address: { ...input.address, street: e.target.value } })}
            type="text"
            name="street"
            placeholder="Hzait"
            required
          />
          <label>Suite</label>
          <input
            value={input.address.suite}
            onChange={(e) => setInput({ ...input, address: { ...input.address, suite: e.target.value } })}
            type="text"
            name="suite"
            placeholder="Apt. 287"
            required
          />
          <label>City</label>
          <input
            value={input.address.city}
            onChange={(e) => setInput({ ...input, address: { ...input.address, city: e.target.value } })}
            type="text"
            name="city"
            placeholder="Jerusalem"
            required
          />
          <label>Zip Code</label>
          <input
            value={input.address.zipCode}
            onChange={(e) => setInput({ ...input, address: { ...input.address, zipCode: e.target.value } })}
            type="number"
            name="zipCode"
            placeholder="97369"
          />

          <label>Phone</label>
          <input
            value={input.phone}
            onChange={(e) => setInput({ ...input, phone: e.target.value })}
            type="phone"
            name="phone"
            placeholder="0527613248"
            required
          />
          <button type='submit'>Submit</button>
        </div>
      </form>
    </>
  )
}

export default UserDetailsEntry

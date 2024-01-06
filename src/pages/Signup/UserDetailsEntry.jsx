import React, { useState } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'

function UserDetailsEntry(props) {

  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState({
    id: 11,
    name: "",
    username: location.state.username,
    password: location.state.password,
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipCode: "",
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  function handleSubmit() {
    createNewUser();
    navigate(`/users/${input.id}/home`);

    async function createNewUser() {
      const response = await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(input),
      })
      localStorage.setItem('currentUser',response)
    }
  }

  return (
    <>
      <h2>Please complete your details for registration:</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Israel Israeli"
          required
        />
        <label>Email</label>
        <input
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          type="email"
          name="email"
          placeholder="Israel@gmail.com"
          required
        />
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
        <label>Website</label>
        <input
          value={input.website}
          onChange={(e) => setInput({ ...input, website: e.target.value })}
          type="text"
          name="website"
          placeholder="Intel.com"
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
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default UserDetailsEntry
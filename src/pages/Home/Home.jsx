import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Home() {

  const currentUser = useOutletContext();

  return (
    <h1>Hello {currentUser.name}</h1>
    )
}

export default Home
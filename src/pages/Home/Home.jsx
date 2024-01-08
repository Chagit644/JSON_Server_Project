import React from 'react'
import { useOutletContext } from 'react-router-dom'

function Home() {

  const generalDataAndTools = useOutletContext();

  return (
    <h1>Hello {generalDataAndTools.currentUser.name}</h1>
    )
}

export default Home
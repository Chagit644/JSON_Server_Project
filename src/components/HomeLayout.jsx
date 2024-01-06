import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'

function HomeLayout() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
        <Header currentUser={currentUser}/>
        <Outlet context={currentUser}/>
        <Footer/>
    </>
  )
}

export default HomeLayout
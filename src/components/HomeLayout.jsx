import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'

function HomeLayout() {

  async function getItemsFunc(url, setListOfItems, setStatusForScreen) {
    try {
        const response = await fetch(`http://localhost:3000/${url}`);
        if (!response.ok) {
            throw response.statusText;
        }
        const data = await response.json();
        setListOfItems(data);
        setStatusForScreen(true);
    } catch {
        alert("An error occurred. Please try again ");
    }
}

  async function deleteItemFunc(url, item, allItems, setAllItems) {
      if (confirm("Are You Sure that You Want to Delete this item?")) {
          try {
            //delete item form server
            const response = await fetch(`http://localhost:3000/${url}`, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
              },

            });
            if (!response.ok) {
              throw response.statusText;
            }
            //delete item from string
            const currentItemIndex = allItems.findIndex((e) => e == item);
            const tempItemsArr = [...allItems];
            tempItemsArr.splice(currentItemIndex, 1);
            setAllItems(tempItemsArr);
          } catch {
            alert(`An error occurred. Please try again `);
          }
        
      }
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
        <Header currentUser={currentUser}/>
        <Outlet context={{currentUser: currentUser, deleteItemFunc, getItemsFunc}}/>
        <Footer/>
    </>
  )
}

export default HomeLayout
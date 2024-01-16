import React, { useState, useEffect } from 'react'
import styles from '../css/UpdateWindow.module.css'

function UpdateCommentWindow({ url, oldItem, setOldItem, filteredItems, setFilteredItems, allItems, setAllItems, propertiesArr, setItemInAdditionalWindow }) {

  const [newItem, setNewItem] = useState({ ...oldItem })

  function handleSubmit(e) {
    e.preventDefault();
    try {
      (async () => {
        const response = await fetch(`http://localhost:3000/${url}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        if (!response.ok) {
          throw response.statusText;
        }
        const data = await response.json();
        let currentIndex = filteredItems.findIndex((e) => e == oldItem);
        setFilteredItems((prev) => {
          prev = [...prev];
          prev[currentIndex] = data;
          return prev;
        });
        if (allItems && setAllItems) {
          currentIndex = allItems.findIndex((e) => e == oldItem);
          setAllItems((prev) => {
            prev = [...prev];
            prev[currentIndex] = data;
            return prev;
          });
        }
        
        setNewItem(data);
        setOldItem(null);
        if (setItemInAdditionalWindow != null)
          setItemInAdditionalWindow(data);
      })();
    }
    catch {
      alert(`An error occurred. Please try again `);
    }
  }

  return (
    <div className={styles.back}>
      <div className={styles.updateWindow}>
        <p onClick={() => setOldItem(null)} className={styles.xbutton}>❌</p>
        <form onSubmit={handleSubmit}>
          {propertiesArr.map((prop) => {
            return (
              <>
                <label>{prop}</label>
                <input onChange={(e) => setNewItem(prev => {
                  let tempItem = { ...prev };
                  tempItem[prop] = e.target.value;
                  return tempItem;
                })} value={newItem[prop]}></input><br />
              </>
            )
          })}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )

}

export default UpdateCommentWindow
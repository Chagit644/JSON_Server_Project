import React, { useState, useEffect } from 'react'
import styles from '../css/UpdateWindow.module.css'

function UpdateCommentWindow({updateAllItems, url, oldItem, setOldItem, items, setItems, propertiesArr, setItemInAdditionalWindow}) {

    const [newItem, setNewItem] = useState({...oldItem})

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
            debugger;
            const data = await response.json();
            const currentIndex = items.findIndex((e) => e == oldItem);
            setNewItem(data);
            setOldItem(null);
            setItems((prev) => {
              prev = [...prev];
              prev[currentIndex] = data;
              return prev;
            });
            if(setItemInAdditionalWindow != null)
            setItemInAdditionalWindow(data);
          })();
        }
        catch {
            alert(`An error occurred. Please try again `);
        }
    }

    useEffect(() => {
      debugger;
      updateAllItems();
    }, [items]);

  return (
    <div className={styles.updateWindow}>
    <p onClick={() => setOldItem(null)} className={styles.xbutton}>❌</p>
    <form onSubmit={handleSubmit}>
    {propertiesArr.map((prop) => {
        return (
            <>
                <label>{prop}</label>
                <input onChange={(e) => setNewItem(prev => {
                    let tempItem = {...prev};
                    tempItem[prop] = e.target.value;
                    return tempItem;
                })} value={newItem[prop]}></input><br/>
            </>
        )
    })}
    <button type="submit">Update</button>
    </form>
  </div>
  )
}

export default UpdateCommentWindow
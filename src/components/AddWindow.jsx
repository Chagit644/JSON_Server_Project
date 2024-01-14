import { React, useState,useEffect } from 'react'
import styles from '../css/AddWindow.module.css'

function AddWindow({ setIsAddWindowShow, baseItem, propertiesArr, url, setFilteredItems, setAllItems }) {

    const [input, setInput] = useState({ ...baseItem });
    // useEffect(() => {
    //     // כאשר AddWindow נפתחת, חסום את הגלילה של כל העמוד
    //     document.body.style.overflow = 'hidden';
        
    //     // כאשר AddWindow נסגרת, אפשר את הגלילה של כל העמוד
    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, []);

    function handleSubmit(e) {
        e.preventDefault();
        (async () => {
            try {
                const response = await fetch(`http://localhost:3000/${url}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(input)
                })
                if (!response.ok) {
                    throw response.statusText;
                }
                const data = await response.json();
                setFilteredItems(prev => {
                    prev.push(data);
                    return [...prev]
                })
                if(setAllItems) {
                    setAllItems(prev => {
                        prev.push(data);
                        return [...prev]
                    })
                }
                setIsAddWindowShow(false);
            }
            catch (e) {
                alert(`An error ${e} occurred. Please try again`)
            }
        })()
    }

    return (
        <div className={styles.back}>
            <div className={styles.addWindow}>
                <p onClick={() => setIsAddWindowShow(false)} className={styles.xbutton} >❌</p>
                <form onSubmit={handleSubmit}>
                    {propertiesArr.map((prop) => {
                        return (
                            <>
                                <label>{prop}</label>
                                <input
                                    value={input[prop]}
                                    onChange={(e) => setInput(prev => {
                                        let tempItem = { ...prev };
                                        tempItem[prop] = e.target.value;
                                        return tempItem;
                                    })}
                                    type="text"
                                    required
                                /><br />
                            </>
                        )
                    })}
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddWindow
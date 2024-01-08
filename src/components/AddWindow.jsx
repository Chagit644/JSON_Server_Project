import { React, useState } from 'react'

function AddWindow({ setIsAddWindowShow, baseItem, propertiesArr, url, setItems }) {

    const [input, setInput] = useState({ ...baseItem });

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
                setItems(prev => {
                    prev.push(data);
                    return [...prev]
                })
                setIsAddWindowShow(false);
            }
            catch (e) {
                alert(`An error ${e} occurred. Please try again`)
            }
        })()
    }

    return (
        <div>
            <p onClick={() => setIsAddWindowShow(false)}>❌</p>
            <form onSubmit={handleSubmit}>
                {propertiesArr.map((prop) => {
                    return (
                        <>
                            <label>{prop}</label>
                            <input
                                value={input[prop]}
                                onChange={(e) => setInput(prev => {
                                    let tempItem = {...prev};
                                    tempItem[prop] = e.target.value;
                                    return tempItem;
                                })}
                                type="text"
                                required
                            />
                        </>
                    )
                })}
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddWindow
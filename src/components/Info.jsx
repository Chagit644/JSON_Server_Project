import React from 'react'
import styles from '../css/Info.module.css'

function Info({ currentUser, setIsShowInfo }) {

  return (
    <div className={styles.back}>
      <div className={styles.infoWrapper}>
        <button className={styles.xButton} onClick={() => setIsShowInfo(prev => !prev)}>❌</button>
        <ul>
          <li><h3><u> {currentUser.username}</u></h3></li>
          <li><b>Name: </b>{currentUser.name}</li>
          <li><b>Email: </b>{currentUser.email}</li>
          <h4>Address:</h4>
          <li><b>Street: </b>{currentUser.address.street}</li>
          <li><b>Suite: </b>{currentUser.address.suite}</li>
          <li><b>City: </b>{currentUser.address.city}</li>
          <li><b>Zip Code: </b>{currentUser.address.zipCode}</li>
          <li><b>Phone: </b>{currentUser.phone}</li>
          <h4>Company:</h4>
          <li><b>Name: </b>{currentUser.company.name}</li>
          <li><b>Catch Phrase: </b>{currentUser.company.name}</li>
          <li><b>Bs: </b>{currentUser.company.bs}</li>
        </ul>
      </div>
    </div>
  )
}

export default Info
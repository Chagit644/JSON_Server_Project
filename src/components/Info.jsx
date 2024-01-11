import React from 'react'
import styles from '../css/Info.module.css'

function Info({ currentUser, setIsShowInfo }) {

  return (
    <div className={styles.back}>
      <div className={styles.infoWrapper}>
        <button onClick={() => setIsShowInfo(prev => !prev)}>❌</button>
        <ul>
          <li>Username: {currentUser.username}</li>
          <li>Name: {currentUser.name}</li>
          <li>Email: {currentUser.email}</li>
          <h4>Address:</h4>
          <li>Street: {currentUser.address.street}</li>
          <li>Suite: {currentUser.address.suite}</li>
          <li>City: {currentUser.address.city}</li>
          <li>Zip Code: {currentUser.address.zipCode}</li>
          <li>Phone: {currentUser.phone}</li>
          <li>Website: {currentUser.website}</li>
          <h4>Company:</h4>
          <li>Name: {currentUser.company.name}</li>
          <li>Catch Phrase: {currentUser.company.name}</li>
          <li>Bs: {currentUser.company.bs}</li>
        </ul>
      </div>
    </div>
  )
}

export default Info
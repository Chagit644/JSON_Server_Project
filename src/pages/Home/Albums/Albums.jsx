import { useState, useEffect } from 'react';
import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import Filters from '../../../components/Filters';
import AddWindow from '../../../components/AddWindow';
import styles from '../../../css/Albums.module.css'

function Albums() {

  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [allAlbums, setAllAlbums] = useState([]);
  const [isGotAlbums, setIsGotAlbums] = useState(false)
  const [isAddAlbumWindowShow, setIsAddAlbumWindowShow] = useState(false)
  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getAlbums(`users/${currentUser.id}/albums`);
  }, []);

  function getAlbums(url) {
    generalDataAndTools.getItemsFunc(url, setFilteredAlbums, setIsGotAlbums, setAllAlbums);

  }

  return (
    <div className={styles.albumsContainer}>
      <Filters setFilteredItems={setFilteredAlbums} allItems={allAlbums} />
      <div className={styles.albumsMain}>
        <button className={styles.addButton} onClick={() => setIsAddAlbumWindowShow(true)}>Add Album ➕</button>
        {!isGotAlbums && <p className={styles.loadingMessage}> Loading... </p>}
        {isGotAlbums && (
          <div className={styles.allAlbums}>
            {filteredAlbums.map((album) => (
              <Link to={{ pathname: `${album.id}/photos` }} >
              <div className={styles.album}>
                <b>Album Id: </b>{album.id}<br/>{album.title}
              </div></Link>
            ))}
          </div>

        )}
        {isAddAlbumWindowShow && (
          <AddWindow
            setIsAddWindowShow={setIsAddAlbumWindowShow}
            baseItem={{
              userId: currentUser.id,
              title: ''
            }}
            propertiesArr={["title"]}
            url={`albums`}
            setFilteredItems={setFilteredAlbums}
            setAllItems={setAllAlbums}
          />
        )}
      </div>
    </div>
  );
}

export default Albums;
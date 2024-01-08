import { useState, useEffect } from 'react';
import React from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import AlbumsFilters from './AlbumsFilters';
import AddWindow from '../../../components/AddWindow';
function Albums() {
  const [albums, setAlbums] = useState([]);
  const [isGotAlbums, setIsGotAlbums] = useState(false)
  const [isAddAlbumWindowShow, setIsAddAlbumWindowShow] = useState(false)
  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getAlbums(`users/${currentUser.id}/albums`);
  }, []);

  function getAlbums(url) {
    generalDataAndTools.getItemsFunc(url, setAlbums, setIsGotAlbums);

  }
  return (
    <>
      <AlbumsFilters currentUserId={currentUser.id} getAlbums={getAlbums} setIsGotAlbums={setIsGotAlbums} />
      <button onClick={() => setIsAddAlbumWindowShow(true)}>➕</button>
      {!isGotAlbums && <p> Loading... </p>}
      {isGotAlbums && <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => {
            return (
              <tr key={album.id}>
                <td>{album.id}</td>
                <td><Link to={{pathname:`${album.id}/photos`}} >{album.title}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>}
      {isAddAlbumWindowShow && <AddWindow setIsAddWindowShow={setIsAddAlbumWindowShow} baseItem={{
        userId: currentUser.id,
        title: ''
      }} propertiesArr={["title"]} url={`albums`} setItems={setAlbums} />}
    </>
  );
}

export default Albums
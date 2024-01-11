import React, { useState, useEffect } from 'react';
import UpdateWindow from '../../../components/UpdateWindow'
import AddWindow from '../../../components/AddWindow';
import styles from '../../../css/Albums.module.css'

function PageOfPhotos({ isAddPhotosWindowShow, setIsAddPhotosWindowShow, generalDataAndTools, albumId, currentPage, photosToShow, isFirst }) {

    const [photos, setPhotos] = useState(photosToShow.flat());
    const [isGotPhotos, setIsGotPhotos] = useState(false);
    const [currentUpdated, setCurrentUpdated] = useState(null);
    const LIMIT = 5;

    useEffect(() => {
        (async () => {
            if (photos.length == 0)
                await generalDataAndTools.getItemsFunc(`albums/${albumId}/photos?_start=${(currentPage - 1) * 5}&_limit=${LIMIT}`, setPhotos, setIsGotPhotos)
            else
                setIsGotPhotos(true);
        })();
    }, []);

    useEffect(() => {
        localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos))
    }, [photos])

    function deletePhoto(photo) {
        generalDataAndTools.deleteItemFunc(`photos/${photo.id}`, photo, photos, setPhotos);
        localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos));
    }
    function updatePhoto(photo) {
        (async () => {
            await setCurrentUpdated(photo)
            localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos))
        })();
    }
    return (
        <>
            {isAddPhotosWindowShow &&
                <AddWindow setIsAddWindowShow={setIsAddPhotosWindowShow} baseItem={{
                    albumId: albumId,
                    title: '',
                    url: '',
                    thumbnailUrl: ''
                }} propertiesArr={["title", "url", "thumbnailUrl"]} url={`photos`} setItems={setPhotos} />}
            {currentUpdated && <UpdateWindow url={`photos/${currentUpdated.id}`}
                oldItem={currentUpdated}
                setOldItem={setCurrentUpdated}
                items={photos}
                setItems={setPhotos}
                propertiesArr={['title', 'url', 'thumbnailUrl']} />}
            {!isGotPhotos && <p>Loading...</p>}
            {isGotPhotos && <div className={styles.photos}>
                {photos.map((photo) => {
                    return <div id={photo.id} className={styles.photo}>
                        <p>{photo.id}</p>
                        <p className={styles.photoTitle}>{photo.title}</p>
                        <img src={photo.thumbnailUrl} /><br />
                        <button onClick={() => deletePhoto(photo)}>🗑️</button>
                        <button onClick={() => updatePhoto(photo)}>✏️</button>
                    </div>
                })
                }</div>}
        </>)
}

export default PageOfPhotos
import React, { useState, useEffect } from 'react';
import UpdateWindow from '../../../components/UpdateWindow'
import AddWindow from '../../../components/AddWindow';
import styles from'../../../css/Albums.module.css';

function PageOfPhotos({ PHOTOS_IN_PAGE, isAddPhotoWindowShow, setIsAddPhotoWindowShow, generalDataAndTools, albumId, currentPage, photosToShow}) {

    const [photos, setPhotos] = useState(photosToShow.flat());
    const [isGotPhotos, setIsGotPhotos] = useState(false);
    const [currentUpdated, setCurrentUpdated] = useState(null);

    useEffect(() => {
        (async () => {
            if (photos.length == 0)
                await generalDataAndTools.getItemsFunc(`albums/${albumId}/photos?_start=${(currentPage - 1) * PHOTOS_IN_PAGE}&_limit=${PHOTOS_IN_PAGE}`, setPhotos, setIsGotPhotos)
            else
                setIsGotPhotos(true);
        })();
    }, []);

    useEffect(() => {
        localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos));
    }, [photos])

    function deletePhoto(photo) {
        generalDataAndTools.deleteItemFunc(`photos/${photo.id}`, photo, photos, setPhotos);
        localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos));
    }
    function updatePhoto(photo) {
        (async () => {
            await setCurrentUpdated(photo);
            localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos))
        })();
    }
    return (
        <>
            {isAddPhotoWindowShow &&
                <AddWindow setIsAddWindowShow={setIsAddPhotoWindowShow} baseItem={{
                    albumId: albumId,
                    title: '',
                    url: '',
                    thumbnailUrl: ''
                }} propertiesArr={["title", "url", "thumbnailUrl"]} url={`photos`} setFilteredItems={setPhotos} />}
            {currentUpdated && <UpdateWindow url={`photos/${currentUpdated.id}`}
                oldItem={currentUpdated}
                setOldItem={setCurrentUpdated}
                filteredItems={photos}
                setFilteredItems={setPhotos}
                propertiesArr={['title', 'url', 'thumbnailUrl']} />}
            {!isGotPhotos && <p>Loading...</p>}
            {isGotPhotos && <div className={styles.photos}>
                {photos.map((photo) => {
                    return <div key={photo.id} id={photo.id} className={styles.photo}>
                        <p>{photo.id}</p>
                        <p className={styles.photoTitle}>{photo.title}</p>
                        <img src={photo.thumbnailUrl} /><br />
                        <div className={styles.buttonsOfPhoto}>
                        <button onClick={() => deletePhoto(photo)}>🗑️</button>
                        <button onClick={() => updatePhoto(photo)}>✏️</button></div>
                    </div>
                })
                }</div>}
        </>)
}

export default PageOfPhotos
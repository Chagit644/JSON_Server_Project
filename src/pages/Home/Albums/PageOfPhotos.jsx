import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom';

function PageOfPhotos({ albumId, currentPage, picturesToShow }) {
    debugger;
    const [photos, setPhotos] = useState(picturesToShow.flat());
    const [isGotPhotos, setIsGotPhotos] = useState(false)
    const generalDataAndTools = useOutletContext();

    useEffect(() => {
        (async () => {
            if (photos.length == 0)
                await generalDataAndTools.getItemsFunc(`albums/${albumId}/photos?_start=${(currentPage - 1) * 5}&_limit=5`, setPhotos, setIsGotPhotos)
            else
                setIsGotPhotos(true);
        })();
    }, []);

    useEffect(() => {
        localStorage.setItem(`album${albumId}page${currentPage}`, JSON.stringify(photos))
    }, [photos])
    return (
        <>
            {!isGotPhotos && <p>Loading...</p>}
            {isGotPhotos && <div>
                {photos.map((photo) => {
                    return <div>
                        <p>{photo.id}</p>
                        <p>{photo.title}</p>
                        <img src={photo.thumbnailUrl} />
                    </div>
                })
                }</div>}
        </>)
}

export default PageOfPhotos
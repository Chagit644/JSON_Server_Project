import React from 'react'
import { useState, useEffect } from 'react'
import { useOutletContext, useParams,useLocation } from 'react-router-dom';

function Photos() {
    const [photos, setPosts] = useState([])
    const [isGotPhotos, setIsGotPhotos] = useState(false)
    const generalDataAndTools = useOutletContext();
    const location=useLocation();
    const { albumId } = useParams();
    useEffect(() => {
        generalDataAndTools.getItemsFunc(`albums/${albumId}/photos`, setPosts, setIsGotPhotos)
    }, [])
    return (
        <>
            <h4>Album number:{albumId}</h4>
            {photos.map((photo) => {
                return <div>
                    <p>{photo.id}</p>
                    <p>{photo.title}</p>
                    <img src={photo.thumbnailUrl} />
                </div>
            })
            }
        </>
    )
}

export default Photos
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useOutletContext, useParams} from 'react-router-dom';
import PageOfPhotos from './PageOfPhotos';
import styles from'../../../css/Albums.module.css'

function Photos() {

    const [currentPages, setCurrentPages] = useState([1]);
    const [isAddPhotoWindowShow, setIsAddPhotoWindowShow] = useState(false);
    const { albumId } = useParams();
    const generalDataAndTools = useOutletContext();

    const PHOTOS_IN_PAGE = 5;
    const sumOfPhotosinAlbum = null;

    useEffect(() => {
        (async() => {
            const response = await fetch(`http://localhost:3000/albums/${albumId}/photos/?_start=0&_limit=0`)
            sumOfPhotosinAlbum = response.headers.get("X-Total-Count");
        })();
    }, [])

    return (
        <>
            <button onClick={() => setIsAddPhotoWindowShow(true)}>➕</button>
            {currentPages.map((name => {
                return<div > <PageOfPhotos isAddPhotoWindowShow={isAddPhotoWindowShow} setIsAddPhotoWindowShow={setIsAddPhotoWindowShow} generalDataAndTools={generalDataAndTools} albumId={albumId} currentPage={name} photosToShow={localStorage.getItem(name) == undefined ? [] : [JSON.parse(localStorage.getItem(name))] }/></div>
            }))}
            <button onClick={() => {
                setCurrentPages((prev) => {
                    const tempPageName = [...prev];
                    tempPageName.push(currentPages.at(-1) +1 )
                    return tempPageName;
                })
            }}>show more</button>
        </>
    )
}

export default Photos
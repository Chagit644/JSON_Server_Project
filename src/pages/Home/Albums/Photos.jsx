import React from 'react'
import { useState } from 'react'
import { useOutletContext, useParams} from 'react-router-dom';
import PageOfPhotos from './PageOfPhotos';
import styles from'../../../css/Albums.module.css'

function Photos() {
    const [numOfPages, setNumOfPages] = useState(1);
    const { albumId } = useParams();
    const [pageNames, setPageNames] = useState([`album${albumId}page1`]);
    const [isFirst,setIsFirst]=useState(true);
    const [isAddPhotosWindowShow, setIsAddPhotosWindowShow] = useState(false);
    const generalDataAndTools = useOutletContext();
    return (
        <>
            <button className={styles.addButton}  onClick={() =>  setIsAddPhotosWindowShow(true)}>➕</button>
            {pageNames.map((name => {
                return<div > <PageOfPhotos isAddPhotosWindowShow={isAddPhotosWindowShow} setIsAddPhotosWindowShow={setIsAddPhotosWindowShow} generalDataAndTools={generalDataAndTools} albumId={albumId} currentPage={numOfPages} photosToShow={localStorage.getItem(name) == undefined ? [] : [JSON.parse(localStorage.getItem(name))] } isFirst={isFirst}/></div>
            }))}
            <button onClick={() => {
                setIsFirst(false);
                setPageNames((prev) => {
                    setNumOfPages(prev => prev + 1)
                    const tempPageName = [...prev];
                    tempPageName.push(`album${albumId}page${numOfPages + 1}`)
                    return tempPageName;
                })
            }}>show more</button>
        </>
    )
}

export default Photos
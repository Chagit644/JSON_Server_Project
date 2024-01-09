import React from 'react'
import { useState, useEffect } from 'react'
import { useOutletContext, useParams, useLocation } from 'react-router-dom';
import PageOfPhotos from './PageOfPhotos';

function Photos() {
    const [numOfPages, setNumOfPages] = useState(1);
    const { albumId } = useParams();
    const [pageNames, setPageNames] = useState([`album${albumId}page1`]);
    return (
        <>
            {pageNames.map((url => {
                if (localStorage.getItem(url) == undefined) {
                    return <PageOfPhotos albumId={albumId} currentPage={numOfPages} picturesToShow={[]} />
                }
                else {
                    return <PageOfPhotos albumId={albumId} currentPage={numOfPages} picturesToShow={[JSON.parse(localStorage.getItem(url))]} />
                }
            }))}
            <button onClick={() => {
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
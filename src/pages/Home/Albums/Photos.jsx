import React, { useEffect } from "react";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import PageOfPhotos from "./PageOfPhotos";
import styles from "../../../css/Albums.module.css";

function Photos() {

  const [currentPages, setCurrentPages] = useState([1, 2]);
  const [isAddPhotoWindowShow, setIsAddPhotoWindowShow] = useState(false);
  const [isShowMoreOption, setIsShowMoreOption] = useState(true);
  const [sumOfPhotosInAlbum, setSumOfPhotosInAlbum] = useState(null);
  const { albumId } = useParams();
  const generalDataAndTools = useOutletContext();

  const PHOTOS_IN_PAGE = 5;

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:1234/albums/${albumId}/photos/?_start=0&_limit=0`);
      setSumOfPhotosInAlbum(parseInt(response.headers.get("X-Total-Count")));
    })();
  }, []);

  useEffect(() => {
    setIsShowMoreOption(sumOfPhotosInAlbum / PHOTOS_IN_PAGE > currentPages.at(-1));
  }, [sumOfPhotosInAlbum, currentPages]);



  return (
    <>
      <button onClick={() => setIsAddPhotoWindowShow(true)}>
        Add Photo ➕
      </button>
      {currentPages.map((name) => {
        return (
          <div key={name}>
            <PageOfPhotos
              PHOTOS_IN_PAGE={PHOTOS_IN_PAGE}
              isAddPhotoWindowShow={isAddPhotoWindowShow}
              setIsAddPhotoWindowShow={setIsAddPhotoWindowShow}
              generalDataAndTools={generalDataAndTools}
              albumId={albumId}
              currentPage={name}
              photosToShow={localStorage.getItem(name) == undefined ? [] : [JSON.parse(localStorage.getItem(name))]}
            />
          </div>
        );
      })}
      {isShowMoreOption && (
        <button
          onClick={() => {
            setCurrentPages((prev) => {
              const tempCurrentPages = [...prev];
              tempCurrentPages.push(currentPages.at(-1) + 1);
              return tempCurrentPages;
            });
          }}
        >
          show more
        </button>
      )}
    </>
  );
}

export default Photos;

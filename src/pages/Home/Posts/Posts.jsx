import React, { useState, useEffect } from 'react'
import {useOutletContext } from "react-router-dom";
import SinglePostWindow from './SinglePostWindow';
import Filters from '../../../components/Filters'
import AddWindow from '../../../components/AddWindow';
import styles from '../../../css/Posts.module.css'

function Posts() {

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isAddPostWindowShow, setIsAddPostWindowShow] = useState(false);
  const [currentSelectedPost, setCurrentSelectedPost] = useState(null);
  const [isGotPosts, setIsGotPosts] = useState(false);

  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getPosts(`users/${currentUser.id}/posts`);
  }, [])

  function getPosts(url) {
    generalDataAndTools.getItemsFunc(url, setFilteredPosts, setIsGotPosts, setAllPosts);
  }

  return (
    <>
      <Filters setFilteredItems={setFilteredPosts} allItems={allPosts}/>
      <button onClick={() => setIsAddPostWindowShow(true)}>➕</button>

      <div >
        {!isGotPosts && <p>Loading...</p>}
        {isGotPosts && <div className={styles.allPosts}>
          {filteredPosts.map((post) =>
            <div key={post.id} className={styles.singlePost}>
              <p> Id: {post.id}</p>
              <p className={styles.postTitle}>{post.title}</p>
              <button onClick={() => setCurrentSelectedPost(post)} className={styles.openButton}>Open</button>
            </div>)}
        </div>}
      </div>
      {currentSelectedPost && <SinglePostWindow generalDataAndTools={{ ...generalDataAndTools }} post={currentSelectedPost} setCurrentSelectedPost={setCurrentSelectedPost}  filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts} allPosts={allPosts} setAllPosts={setAllPosts} currentUserEmail={currentUser.email} />}
      {isAddPostWindowShow &&
        <AddWindow setIsAddWindowShow={setIsAddPostWindowShow} baseItem={{
          userId: currentUser.id,
          title: '',
          body: ''
        }} propertiesArr={["title", "body"]} url={`posts`} setFilteredItems={setFilteredPosts} setAllItems={setAllPosts} />
      }
    </>
  )
}

export default Posts
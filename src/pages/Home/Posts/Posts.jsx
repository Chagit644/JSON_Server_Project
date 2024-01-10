import React, { useState, useEffect } from 'react'
import { useActionData, useOutletContext } from "react-router-dom";
import SinglePostWindow from './SinglePostWindow';
import PostsFilters from './PostsFilters';
import AddWindow from '../../../components/AddWindow';
import styles from '../../../css/posts.module.css'

function Posts() {

  const [isAddPostWindowShow, setIsAddPostWindowShow] = useState(false);
  const [currentSelectedPost, setCurrentSelectedPost] = useState(null);
  const [isGotPosts, setIsGotPosts] = useState(false);
  const [posts, setPosts] = useState([]);

  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getPosts(`users/${currentUser.id}/posts`);
  }, [])

  function getPosts(url) {
    generalDataAndTools.getItemsFunc(url, setPosts, setIsGotPosts);
  }

  return (
    <>
      <PostsFilters setIsGotPosts={setIsGotPosts} currentUserId={currentUser.id} getPosts={getPosts} />
      <button onClick={() => setIsAddPostWindowShow(true)}>➕</button>

      <div >
        {!isGotPosts && <p>Loading...</p>}
        {isGotPosts && <div className={styles.allPosts}>
          {posts.map((post) =>
            <div key={post.id} className={styles.singlePost}>
              <p> Id: {post.id}</p>
              <p className={styles.postTitle}>{post.title}</p>
              <button onClick={() => setCurrentSelectedPost(post)} className={styles.openButton}>Open</button>
            </div>)}
        </div>}
      </div>
      {currentSelectedPost && <SinglePostWindow generalDataAndTools={{ ...generalDataAndTools }} post={currentSelectedPost} setCurrentSelectedPost={setCurrentSelectedPost} setPosts={setPosts} posts={posts} currentUserEmail={currentUser.email} />}
      {isAddPostWindowShow &&
        <AddWindow setIsAddWindowShow={setIsAddPostWindowShow} baseItem={{
          userId: currentUser.id,
          title: '',
          body: ''
        }} propertiesArr={["title", "body"]} url={`posts`} setItems={setPosts} />
      }
    </>
  )
}

export default Posts
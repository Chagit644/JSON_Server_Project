import {React, useState} from 'react'
import {useNavigate } from "react-router-dom";
import UpdateWindow from '../../../components/UpdateWindow'

function SinglePostWindow({ generalDataAndTools, post, setCurrentSelectedPost, posts, setPosts }) {

    const [currentUpdated, setCurrentUpdated] = useState(null);
    const [currentPost,setCurrentPost]=useState(post)
    const navigate = useNavigate();

    function deletePost(post) {
        (async () => {
            await generalDataAndTools.deleteItemFunc(`posts/${post.id}`, post, posts, setPosts);
            setCurrentSelectedPost(null);
        })();
    }


    function navigateToComments() {
        console.log();
        navigate(`${currentPost.id}/comments`,{
            state:{
            currentPostId: currentPost.id,
            }});
    }
    return (
        <>
            <div>
                <button onClick={() => setCurrentSelectedPost(null)}>❌</button>
                <p>Post Id: {currentPost.id}</p>
                <p>Title: {currentPost.title}</p>
                <p>Body: {currentPost.body}</p>
                <button onClick={() => deletePost(currentPost)}>🗑️</button>
                <button onClick={() => setCurrentUpdated(currentPost)}>✏️</button>
                <button onClick={() => navigateToComments()}>comments</button>
            </div>
            {currentUpdated && <UpdateWindow url={`posts/${currentUpdated.id}`} oldItem={currentUpdated} setOldItem={setCurrentUpdated} items={posts} setItems={setPosts} propertiesArr={['title', 'body']} setItemInAdditionalWindow= {setCurrentPost}/>}
        </>
    )
}

export default SinglePostWindow;
import React, { useState, useEffect } from "react";
import { useLocation, useOutletContext, useParams } from 'react-router-dom'
import UpdateWindow from "../../../components/UpdateWindow"
import AddWindow from "../../../components/AddWindow"
import styles from '../../../css/Posts.module.css'
function Comments() {

    const [comments, setComments] = useState([]);
    const [isGotComments, setIsGotComments] = useState(false);
    const [isAddCommentWindowShow, setIsAddCommentWindowShow] = useState(false);
    const [currentUpdated, setCurrentUpdated] = useState(null)
    
    const {postId} = useParams();
    const currentPostId = postId;
    const generalDataAndTools = useOutletContext();
    const currentUserEmail = generalDataAndTools.currentUser.email;
    

    useEffect(() => {
        generalDataAndTools.getItemsFunc(`posts/${currentPostId}/comments`, setComments, setIsGotComments)
    }, [])

    return (
        <>
            {!isGotComments && <p>Loading...</p>}
            {isGotComments && <>
                <button onClick={() => setIsAddCommentWindowShow(true)}>➕</button>
                <table className={styles.commentsTable}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Body</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => {
                            return (
                                <tr key={comment.id}>
                                    <td>{comment.id}</td>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.body}</td>
                                    {currentUserEmail == comment.email && <>
                                        <td onClick={() => setCurrentUpdated(comment)}>✏️</td>
                                        <td onClick={() => generalDataAndTools.deleteItemFunc(`comments/${comment.id}`, comment, comments, setComments)}>🗑️</td>
                                    </>}
                                </tr>
                            );
                        })}
                        {currentUpdated && <UpdateWindow url={`comments/${currentUpdated.id}`} oldItem={currentUpdated} setOldItem={setCurrentUpdated} items={comments} setItems={setComments} propertiesArr={['name', 'body']} />}
                    </tbody>
                </table>
            </>
            }
            {isAddCommentWindowShow && 
            <AddWindow setIsAddWindowShow={setIsAddCommentWindowShow} baseItem={{
                postId: currentPostId,
                name: '',
                email:currentUserEmail,
                body: ''}} propertiesArr={["name", "body"]} url= {`posts/${currentPostId}/comments`} setItems={setComments}/>
            }
        </>
    )
}
export default Comments;
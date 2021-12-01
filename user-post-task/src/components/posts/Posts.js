import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPostsData from './AddPostsData';
import EditPostsData from './EditPostsData';

function Posts() {
    const [postsItems, setPostsItems] = useState([]);
    const [addPost, setAddPost] = useState(false);
    const [editPost, setEditPost] = useState(false)
    const [editPostsData, setEditPostsData] = useState({})

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = async () => {
        const resp = await axios.get('http://localhost:3005/posts')
        setPostsItems(resp.data)
    }

    const startAddDataHandler = () => {
        setAddPost(true)
    }

    const stopAddDataHandler = () => {
        setAddPost(false)
    }

    const savePostsDataHandler = (enteredPostsData) => {
        const postsData = {
            ...enteredPostsData
        }
        axios.post('http://localhost:3005/posts', postsData).then(() => {
            getAllPosts();
        })
        setAddPost(false);
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:3005/posts/${id}`).then(() => {
            getAllPosts();
        })
    }

    const editHandler = (responseData) => {
        setEditPostsData(responseData);
        //
        setEditPost(true)
    }

    const stopEditDataHandler = () => {
        setEditPost(false)
    }

    const updateDataHandler = () => {
        setEditPost(false);
        getAllPosts();
    }

    return (
        <>
            <div>
                {!addPost && <button onClick={startAddDataHandler}>Add New Post</button>}
                {addPost && <AddPostsData onSavePostsData={savePostsDataHandler} onCancel={stopAddDataHandler} />}
            </div>
            <div>
                {editPost ? <EditPostsData onEditSuccess={updateDataHandler} editPosts={editPostsData} onCancel={stopEditDataHandler} /> : null}
            </div>
            <ul>
                {postsItems.map((item) => {
                    return (
                        <li key={item.id} style={{ listStyle: "none" }}>
                            <div>UserId: {item.userId} </div>
                            <div style={{ marginRight: "10px" }}>Title : {item.title}</div>
                            <div>Body : {item.body}</div>
                            <div>
                                <button onClick={() => editHandler(item)}>Edit</button>
                                <button onClick={() => deleteHandler(item.id)}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Posts;

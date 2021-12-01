import axios from 'axios'
import React, { useState, useEffect } from 'react'

function EditPostsData(props) {

    const [userId, setUserId] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        loadPostsData();
        //eslint-disable-next-line
    }, []);

    const loadPostsData = async () => {
        const resp = await axios.get(`http://localhost:3005/posts/${props.editPosts.id}`)
        setUserId(resp.data.userId);
        setTitle(resp.data.title);
        setBody(resp.data.body);
    }

    const editHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3005/posts/${props.editPosts.id}`, { userId: userId, title: title, body: body }).then(() => {
            props.onEditSuccess();
        })
    }

    return (
        <form onSubmit={editHandler}>
            <div>
                <label>User_ID</label>
                <input type="number" value={userId} onChange={(e) => {
                    setUserId(e.target.value)
                }} />
            </div>
            <div>
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => {
                    setTitle(e.target.value)
                }} />
            </div>
            <div>
                <label>Body</label>
                <input type="text" value={body} onChange={(e) => {
                    setBody(e.target.value)
                }} />
            </div>
            <div>
                <button type="submit">Update</button>
                <button onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default EditPostsData

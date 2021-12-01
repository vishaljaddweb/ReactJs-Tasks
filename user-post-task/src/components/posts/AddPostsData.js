import React, { useState } from 'react'

function AddPostsData(props) {

    const [userId, setUserId] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const submitHandler = (e) => {
        e.preventDefault();
        if (userId && title && body) {
            const postsData = {
                userId: userId,
                title: title,
                body: body
            }
            props.onSavePostsData(postsData);
        } else {
            alert("poora data daal madarchod");
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label>User_ID_ADD</label>
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
                <button type="submit">Add Data</button>
                <button onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    )
}

export default AddPostsData

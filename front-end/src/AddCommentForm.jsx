import { useState } from 'react'

export default function AddCommentForm( { onAddComment } ) {

    const [nameText, setNameText] = useState('')
    const [commentText, setCommentText] = useState('')

    return(
        <div>
            <h3>Add a Comment</h3>

            <label htmlFor='name'>Name:</label>
            <input autoComplete='on' id='name' type="text" placeholder="enter name" value={nameText} onChange={(e) => setNameText(e.target.value)}></input>

            <label htmlFor='comment-text'>Comment:</label>
            <input autoComplete='on' id='comment-text' type="text" placeholder="enter comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
            
            <button onClick={() => {
                onAddComment( {nameText, commentText} );
                setNameText('');
                setCommentText('');
            }}>Add Comment</button>
        </div>
    )
}
import { useState } from 'react'

export default function AddCommentForm( { onAddComment } ) {

    const [nameText, setNameText] = useState('')
    const [commentText, setCommentText] = useState('')

    return(
        <div>
            <h3>Add a Comment</h3>
            <label>
                Name:
            </label>
            <input type="text" value={nameText} onChange={(e) => setNameText(e.target.value)}></input>
            <label>
                Comment:
            </label>
            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)}></input>
            <button onClick={() => {
                onAddComment( {nameText, commentText} );
                setNameText('');
                setCommentText('');
            }}>Add Comment</button>
        </div>
    )
}
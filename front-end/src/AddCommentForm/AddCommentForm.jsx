import { useState } from 'react'
import "./AddCommentsForm.css"

export default function AddCommentForm( { onAddComment } ) {

    const [nameText, setNameText] = useState('')
    const [commentText, setCommentText] = useState('')
    const [flash, setFlash] = useState({ name: false, comment: false });
    const [showWarning, setShowWarning] = useState(false);

    const handleAddComment = () => {
        if (!nameText || !commentText) {
          setShowWarning(true);
    
          // Trigger flash for empty fields
          setFlash({
            name: !nameText,
            comment: !commentText,
          });
    
          // Remove flash effect after animation
          setTimeout(() => {
            setFlash({ name: false, comment: false });
          }, 1000);
        } else {
          setShowWarning(false);
          onAddComment({ nameText, commentText });
          setNameText('');
          setCommentText('');
        }
      };

    return(
        <>

            <div className='add-comment-form-container'>
                {showWarning && (
                <h5 className="display-warning">
                    Please fill out both the name and comment fields before submitting.
                </h5>
                )}
                <input autoComplete='on' className={`${flash.name ? "flash" : ""}`} id="name-area" type="text" placeholder="enter name" value={nameText} onChange={(e) => setNameText(e.target.value)}></input>
                <textarea autoComplete='on' className={`${flash.comment ? "flash" : ""}`} id='comment-area' type="text" placeholder="enter comment" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            </>

    )
}
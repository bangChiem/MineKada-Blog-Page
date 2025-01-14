import "./CommentsList.css"

export default function CommentsList( {comments} ) {
    return(
        <div>
            {comments.map( (comment,index) => 
                <div className="comment" key={index}>
                    <div className="comment-row-1">   
                        <img src="/comment-pfp-icon.jpg" width={30}></img>
                        <h4>{comment.postedBy}</h4>
                    </div>
                    <p className="comment-text">{comment.text}</p>
                </div>)}
        </div>
    );
}
import {useState} from 'react'
import axios from 'axios';

export default function WriteArticle(){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    async function onPublishArticle({title, content}){
        const response = await axios.post('api/writearticle', {
            title: title,
            content: [content]
        });
    }

    return (
        <>
            <h1>Write Articles!</h1>
            <div>
                <label htmlFor="article-title">Article Title</label>
                <textarea autoComplete='on' id='article-title' type="text" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
            </div>
            
            <div>
                <label htmlFor="article-text">Article Text</label>
                <textarea autoComplete='on' id='article-text' type="text" placeholder="enter text" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

            <button onClick={() => {
                onPublishArticle( {title, content} );
                console.log("published!")
            }}>Publish Article</button>
        </>
        
    )
}
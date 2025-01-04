import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

export default function WriteArticle(){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function onPublishArticle({title, content, }){
        const response = await axios.post('api/writearticle', {
            title: title,
            content: [content],
            imageId: 0
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

            <Link to={'/write-article/' + title.split(" ").join("+") + '/choose-image'}>
                <Button onClick={() => {
                    onPublishArticle( {title, content} );}}
                variant='primary'>Next</Button>
            </Link>
        </>
        
    )
}
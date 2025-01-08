import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./WriteArticlePage.css"

export default function WriteArticle(){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    async function onPublishArticle({title, content, }){
        try{
            const response = await axios.post('api/writearticle', {
                title: title,
                content: [content],
                imageId: 0
            });
        } catch(err){
            console.error("failed to post new article / from write article page")
            console.error(err);
        }

    }

    return (
        <div className='backdrop write-article'>
            <div className='container-fluid page-container'>
                <div>
                    <input autoComplete='on' id='article-title' type="text" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                
                <div>
                    <textarea autoComplete='on' id='article-text' type="text" placeholder="enter text" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>

                <div>
                    <Link to={'/write-article/' + title.split(" ").join("+") + '/choose-image'}>
                        <button onClick={() => {
                            onPublishArticle( {title, content} );}}
                        >Next</button>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}
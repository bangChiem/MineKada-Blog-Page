import {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./WriteArticlePage.css"
import ResponsiveNavbar from '../../ResponsiveNavbar';

export default function WriteArticle(){

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
    
        const handleTab = (event) => {
          if (event.key === "Tab") {
            event.preventDefault();
    
            // Get the cursor's current position
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
    
            // Insert a tab character
            textarea.value =
              textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);
    
            // Move the cursor after the tab
            textarea.selectionStart = textarea.selectionEnd = start + 1;
          }
        };
    
        textarea.addEventListener("keydown", handleTab);
    
        // Cleanup event listener on unmount
        return () => {
          textarea.removeEventListener("keydown", handleTab);
        };
      }, []); // Empty dependency array ensures this runs once after component mounts

    async function onPublishArticle({title, content, }){
        try{
            const response = await axios.post('api/writearticle', {
                title: title,
                content: content,
                imageId: 0
            });
        } catch(err){
            console.error("failed to post new article / from write article page")
            console.error(err);
        }

    }


    return (
        <>
            <div className='backdrop write-article'>
                <div className='container-fluid page-container'>
                    <div>
                        <input autoComplete='on' id='article-title' type="text" placeholder="enter title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                    </div>
                    
                    <div>
                        <textarea autoComplete='on' id='article-text' type="text" placeholder="enter text" value={content} ref={textareaRef} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <div>
                        <Link to={'/write-article/' + title.toLowerCase().split(" ").join("+") + '/choose-image'}>
                            <button onClick={() => {
                                onPublishArticle( {title, content} );}}
                            >Next</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>

    )
}
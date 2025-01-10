import axios from "axios"
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import "./ArticleCreatedPage.css"

export default function ArticleCreatedPage(){

    const [isArticleCreated, setIsArticleCreated] = useState(null)
    const { name } = useParams();

    async function confirmArticleCreated(){
        try{
            const response = await axios.get('/api/articles/' + name)
            if (response.data == null){
                setIsArticleCreated(false);
            }
            else {
                setIsArticleCreated(true);
            }
        } catch(err){
            console.err("failed to fetch article " + name + " to confirm article was created / from article created page")
            console.error(err);
        }
    }

    useEffect(() => {
        confirmArticleCreated()
    }, [name]);
    return(
        <div className="backdrop">
            <div className="page-container article-created-page-container">
                <h1>
                    {isArticleCreated === null 
                        ? "Loading..." 
                        : isArticleCreated 
                        ? "Article Created!" 
                        : "Article Not Created"}
                </h1>
            </div>
        </div>
    )
}
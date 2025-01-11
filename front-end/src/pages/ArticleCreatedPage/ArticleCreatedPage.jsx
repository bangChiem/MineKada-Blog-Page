import axios from "axios"
import { Link } from "react-router-dom"
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
                <img src="/clouds.png"></img>
                <h1>
                    {isArticleCreated === null 
                        ? "Loading..." 
                        : isArticleCreated 
                        ? "Article Created!" 
                        : "Article Not Created"}
                </h1>
                <Link to='/articles'>
                    <button>Read Article</button>
                </Link>
            </div>
        </div>
    )
}
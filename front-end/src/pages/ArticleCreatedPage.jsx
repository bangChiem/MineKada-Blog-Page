import axios from "axios"
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

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

    if (isArticleCreated === null) {
        return <h1>Loading...</h1>;
    }

    return(
        <div>
            {isArticleCreated ? (<h1>Article Created!</h1>) : (<h1>Article Not Created</h1>)}
        </div>
    )
}
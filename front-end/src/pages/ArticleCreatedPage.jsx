import axios from "axios"
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

export default function ArticleCreatedPage(){

    const [isArticleCreated, setIsArticleCreated] = useState(null)
    const { name } = useParams();

    async function confirmArticleCreated(){
        const response = await axios.get('/api/articles/' + name)
        console.log(response.data)
        if (response.data == null){
            setIsArticleCreated(false);
        }
        else {
            setIsArticleCreated(true);
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

import ArticlesList from "../ArticlesList.jsx";
import axios from "axios";
import './ArticlesListPage.css'
import { useLoaderData } from "react-router-dom";
export default function ArticlesListPage() {

    const articles = useLoaderData();

    return (
        <>
            <ArticlesList articles={articles} imageIdToIMG={imageIdToIMG}/>
        </>
    );
}

export async function articlesLoader() {
    const response = await axios.get('/api/getarticles/');
    const articles = response.data;
    return articles;
  }

export function imageIdToIMG( imgId ){
    if (imgId == 1){
        return "dirt.png"
    } else if(imgId == 2){
        return "stone.png"
    } else if(imgId == 3){
        return "screenshot.png"
    }
    else {
        return "wood.png"
    }
}


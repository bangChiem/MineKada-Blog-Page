
import ArticlesList from "../ArticlesList.jsx";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
export default function ArticlesListPage( {images} ) {

    const articles = useLoaderData();

    return (
        <>
            <ArticlesList articles={articles} images={images}/>
        </>
    );
}

export async function articlesLoader() {
    const response = await axios.get('/api/getarticles/');
    const articles = response.data;
    return articles;
  }


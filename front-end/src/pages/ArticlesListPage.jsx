
import ArticlesList from "../ArticlesList.jsx";
import axios from "axios";
import './ArticlesListPage.css'
import { useLoaderData } from "react-router-dom";
export default function ArticlesListPage() {

    const articles = useLoaderData();

    return (
        <>
        <p> &gt; Current Articles</p>
        <ArticlesList articles={articles}/>
        </>
    );
}

export async function articlesLoader() {
    const response = await axios.get('/api/getarticles/');
    const articles = response.data;
    return articles;
  }


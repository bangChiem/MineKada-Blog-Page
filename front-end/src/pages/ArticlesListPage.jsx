import articles from "../article-content.js"
import ArticlesList from "../ArticlesList.jsx";
import './ArticlesListPage.css'
export default function ArticlesListPage() {
    return (
        <>
        <p> &gt; Current Articles</p>
        <ArticlesList articles={articles}/>
        </>
        
    );
}


import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'


import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage, {articlesLoader} from './pages/ArticlesListPage';
import ArticlePage, {articleLoader} from './pages/ArticlePage/ArticlePage';
import Layout from './Layout';
import NotFound from './pages/NotFoundPage';
import WriteArticlePage from './pages/WriteArticlePage/WriteArticlePage';
import ChooseImgPage from './pages/ChooseImgPage/ChooseImgPage';
import ArticleCreatedPage from './pages/ArticleCreatedPage/ArticleCreatedPage';


const images = [
  "/article-images/1.jpg",
  "/article-images/2.jpg",
  "/article-images/3.jpg",
  "/article-images/4.jpg",
  "/article-images/5.jpg",
  "/article-images/6.jpg",
  "/article-images/7.jpg",
  "/article-images/8.jpg",
  "/article-images/9.jpg",
  "/article-images/10.jpg",
  "/article-images/11.jpg",
  "/article-images/12.jpg",
  "/article-images/13.jpg",
  "/article-images/14.jpg",
  "/article-images/15.jpg",
  "/article-images/16.jpg",
]

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFound />,
    children: [{
        path: '/',
        element: <HomePage />
      }, {
        path: 'about',
        element: <AboutPage />,
      }, {
        path: 'articles',
        element: <ArticlesListPage images={images}/>,
        loader: articlesLoader,
      }, {
        path: '/articles/:name', 
        element: <ArticlePage images={images}/>,
        loader: articleLoader,
    },   {
        path: 'write-article',
        element: <WriteArticlePage/>
    },   {
        path: '/write-article/:name/choose-image',
        element: <ChooseImgPage images={images}/>
    },   {
      path: '/write-article/:name/article-created',
      element: <ArticleCreatedPage />
  }]
  }]

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>

  );
}

export default App

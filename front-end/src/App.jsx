import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import HomePage from './pages/Homepage/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage, {articlesLoader, imageIdToIMG} from './pages/ArticlesListPage';
import ArticlePage, {articleLoader} from './pages/ArticlePage';
import Layout from './Layout';
import NotFound from './pages/NotFoundPage';
import WriteArticlePage from './pages/WriteArticlePage/WriteArticlePage';
import ChooseImgPage from './pages/ChooseImgPage';
import ArticleCreatedPage from './pages/ArticleCreatedPage';

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
        element: <ArticlesListPage />,
        loader: articlesLoader,
      }, {
        path: '/articles/:name', 
        element: <ArticlePage imageIdToIMG={imageIdToIMG}/>,
        loader: articleLoader,
    },   {
        path: 'write-article',
        element: <WriteArticlePage />
    },   {
        path: '/write-article/:name/choose-image',
        element: <ChooseImgPage />
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

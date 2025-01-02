import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import axios from 'axios'
import HomePage from './pages/HomePage'
import AboutPage from './pages/aboutPage';
import ArticlesListPage, {articlesLoader} from './pages/ArticlesListPage';
import ArticlePage, {articleLoader} from './pages/ArticlePage';
import Layout from './Layout';
import NotFound from './pages/NotFoundPage';
import WriteArticlePage from './pages/WriteArticlePage';

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
        path: '/articles/:name', //
        element: <ArticlePage />,
        loader: articleLoader,
    },   {
        path: 'write-article',
        element: <WriteArticlePage />
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

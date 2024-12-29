import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import axios from 'axios'
import HomePage from './pages/HomePage'
import AboutPage from './pages/aboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage, {loader as articleLoader} from './pages/ArticlePage';
import Layout from './Layout';
import NotFound from './pages/NotFoundPage';

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
      }, {
        path: '/articles/:name', //
        element: <ArticlePage />,
        loader: articleLoader,
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

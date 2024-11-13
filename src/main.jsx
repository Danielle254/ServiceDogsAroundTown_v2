import React from 'react';
import ReactDOM from 'react-dom/client';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import App from './App.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Nav from './components/Nav.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import './index.css';

const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <Nav />
      <Outlet />
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
